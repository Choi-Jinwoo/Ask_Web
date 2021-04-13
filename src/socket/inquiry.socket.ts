import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from 'config/endpoint';
import { InquiryEvents } from './inquiry/inquiry.event';
import { ISocketResponse } from './base.response';

export class InquirySocketSingleton {
  private static _instance: InquirySocketSingleton;

  readonly socket;

  private _onLecturerJoin: Function | null = null;
  private _onLecturerJoinError: Function | null = null;
  private _onReceiveInquiry: Function | null = null;
  private _onUserJoin: Function | null = null;

  set onLecturerJoin(handler: Function) {
    this._onLecturerJoin = handler;
  }

  set onLecturerJoinError(handler: Function) {
    this._onLecturerJoinError = handler;
  }

  set onReceiveInquiry(handler: Function) {
    this._onReceiveInquiry = handler;
  }

  set onUserJoin(handler: Function) {
    this._onUserJoin = handler;
  }

  private constructor() {
    const socket = io(`${SOCKET_ENDPOINT}/inquiry`, {
      transports: ['websocket'],
    });

    this.socket = socket;

    this.socket
      .on(InquiryEvents.LECTURER_JOIN, (data: ISocketResponse) => {
        const { status } = data;
        if (status === 200) {
          if (this._onLecturerJoin !== null) {
            this._onLecturerJoin();
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

    this.socket.on(InquiryEvents.USER_JOINED, (data: ISocketResponse) => {
      if (this._onUserJoin !== null) {
        this._onUserJoin(data);
      }
    });
  }

  static get instance() {
    if (InquirySocketSingleton._instance === null
      || InquirySocketSingleton._instance === undefined) {
      InquirySocketSingleton._instance = new InquirySocketSingleton();
    }

    return InquirySocketSingleton._instance;
  }
}