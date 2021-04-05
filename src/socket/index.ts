import socketIO from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../../config/endpoint';

export class SocketSingleton {
  private static _instance: SocketSingleton | null;

  private readonly socket;

  private constructor() {
    this.socket = socketIO(SOCKET_ENDPOINT);
  }

  static get instance() {
    if (SocketSingleton._instance === null) {
      SocketSingleton._instance = new SocketSingleton();
    }

    return SocketSingleton._instance;
  }
}