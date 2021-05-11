import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { InquiryEvents } from './inquiry.event';
import { ISendInquiryRequest } from './model/send-inquiry.request';

class InquiryEmitter {

  joinLecturer(adminCode: string) {
    InquirySocketSingleton.instance.socket
      .emit(InquiryEvents.LECTURER_JOIN, {
        adminCode,
      })
  }

  sendInquiry(data: ISendInquiryRequest) {
    console.log(data);

    InquirySocketSingleton.instance.socket
      .emit(InquiryEvents.SEND_INQUIRY, data);
  }

}

export const inquiryEmitter = new InquiryEmitter();