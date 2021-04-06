import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from 'config/endpoint';
import { InquiryEvents } from './inquiry/inquiry.event';
import { ISocketResponse } from './base.response';

export class InquirySocketSingleton {
  private static _instance: InquirySocketSingleton;

  readonly socket;

  private onLecturerJoin: Function | null = null;
  private onLecturerJoinError: Function | null = null;

  setOnLecturerJoin(handler: Function) {
    this.onLecturerJoin = handler;
  }

  setOnLecturerJoinError(handler: Function) {
    this.onLecturerJoinError = handler;
  }

  private constructor() {
    const socket = io(`${SOCKET_ENDPOINT}/inquiry`, {
      transports: ['websocket'],
    });

    this.socket = socket;

    this.socket
      .on(InquiryEvents.JOIN_LECTURER_LECTURE, (data: ISocketResponse) => {
        const { status } = data;
        console.log(this.onLecturerJoinError);
        if (status === 200) {
          if (this.onLecturerJoin !== null) {
            this.onLecturerJoin();
          }
        } else if (this.onLecturerJoinError !== null) {
          this.onLecturerJoinError();
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