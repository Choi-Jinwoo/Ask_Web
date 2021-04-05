import { SocketSingleton } from 'socket';
import { InquiryEvents } from './inquiry.event';

export class InquiryEmitter {
  joinLecturer(adminCode: string) {
    SocketSingleton.instance.socket.emit(InquiryEvents.JOIN_LECTURER_LECTURE, {
      adminCode,
    });
  }
}