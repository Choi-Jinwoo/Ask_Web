import { observable } from 'mobx';
import { InquiryRepository } from 'repositories/inquiry.repository';
import { IInquiry } from 'types/inquiry.interface';

class InquiryStore {
  constructor(
    private readonly inquiryRepository: InquiryRepository
  ) { };

  @observable
  private page: number = 0;

  @observable
  inquiries: IInquiry[] = [];
}

export const inquiryStore = new InquiryStore(new InquiryRepository());