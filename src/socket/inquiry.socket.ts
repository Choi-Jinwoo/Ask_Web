import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from 'config/endpoint';
import { InquiryEvents } from './inquiry/inquiry.event';
import { ISocketResponse } from './base.response';

export class InquirySocketSingleton {
  private static _instance: InquirySocketSingleton;

  readonly socket;

  private onLecturerJoin: Function | null = null;
  private onLecturerJoinError: Function | null = null;
  private onReceiveInquiry: Function | null = null;

  setOnLecturerJoin(handler: Function) {
    this.onLecturerJoin = handler;
  }

  setOnLecturerJoinError(handler: Function) {
    this.onLecturerJoinError = handler;
  }

  setOnReceiveInquiry(handler: Function) {
    this.onReceiveInquiry = handler;
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
          if (this.onLecturerJoin !== null) {
            this.onLecturerJoin();
          }
        } else if (this.onLecturerJoinError !== null) {
          this.onLecturerJoinError();
        }
      });

    this.socket
      .on(InquiryEvents.NEW_INQUIRY, (data: ISocketResponse) => {
        if (this.onReceiveInquiry !== null) {
          this.onReceiveInquiry(data);
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