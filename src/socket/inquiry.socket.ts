import io from 'socket.io-client';
import { InquiryEvents } from './inquiry/inquiry.event';
import { ISocketResponse } from './base.response';
import { tokenStorage } from 'storage/token.storage';

const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;

export class InquirySocketSingleton {
  private static _instance: InquirySocketSingleton;

  public socket!: SocketIOClient.Socket;

  private _onLecturerJoin: Function | null = null;
  private _onLecturerJoinError: Function | null = null;
  private _onReceiveInquiry: Function | null = null;

  set onLecturerJoin(handler: Function) {
    this._onLecturerJoin = handler;
  }

  set onLecturerJoinError(handler: Function) {
    this._onLecturerJoinError = handler;
  }

  set onReceiveInquiry(handler: Function) {
    this._onReceiveInquiry = handler;
  }

  connectSocket() {
    if (this.socket !== undefined) {
      this.socket.disconnect();
    }

    const socket = io(`${SOCKET_ENDPOINT}/inquiry`, {
      transports: ['websocket'],
      query: {
        'x-access-token': tokenStorage.get(),
      },
    });

    this.socket = socket;

    this.socket
      .on(InquiryEvents.LECTURER_JOIN, (data: ISocketResponse) => {
        const { status } = data;
        if (status === 200) {
          if (this._onLecturerJoin !== null) {
            this._onLecturerJoin(data);
          }
        } else if (this._onLecturerJoinError !== null) {
          this._onLecturerJoinError();
        }
      });

    this.socket
      .on(InquiryEvents.NEW_INQUIRY, (data: ISocketResponse) => {
        if (this._onReceiveInquiry !== null) {
          this._onReceiveInquiry(data);
        }
      });
  }

  private constructor() {
    this.connectSocket();
  }

  static get instance() {
    if (InquirySocketSingleton._instance === null
      || InquirySocketSingleton._instance === undefined) {
      InquirySocketSingleton._instance = new InquirySocketSingleton();
    }

    return InquirySocketSingleton._instance;
  }
}