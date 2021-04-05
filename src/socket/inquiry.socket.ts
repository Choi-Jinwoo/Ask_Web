import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from 'config/endpoint';

export class InquirySocketSingleton {
  private static _instance: InquirySocketSingleton;

  readonly socket;

  private constructor() {
    const socket = io(`${SOCKET_ENDPOINT}/inquiry`, {
      transports: ['websocket'],
    });

    this.socket = socket;
  }

  static get instance() {
    if (InquirySocketSingleton._instance === null
      || InquirySocketSingleton._instance === undefined) {
      InquirySocketSingleton._instance = new InquirySocketSingleton();
    }

    return InquirySocketSingleton._instance;
  }
}