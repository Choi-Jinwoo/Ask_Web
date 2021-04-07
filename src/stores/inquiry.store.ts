import { action, observable } from 'mobx';
import { InquiryRepository } from 'repositories/inquiry.repository';
import { IInquiry } from 'types/inquiry.interface';

class InquiryStore {
  constructor(
    private readonly inquiryRepository: InquiryRepository
  ) { };

  private page: number = 0;

  @observable
  inquiries: IInquiry[] = [];

  @action
  async fetch(adminCode: string) {
    const { inquiries } = await this.inquiryRepository.findInquires(adminCode, this.page);

    this.page += 1;
    this.inquiries = this.inquiries.concat(inquiries);
  }
}

export const inquiryStore = new InquiryStore(new InquiryRepository());