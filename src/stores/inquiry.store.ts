import { action, observable } from 'mobx';
import { InquiryRepository } from 'repositories/inquiry.repository';
import { IInquiry } from 'types/inquiry.interface';
import { ILecture } from 'types/lecture.interface';

class InquiryStore {
  constructor(
    private readonly inquiryRepository: InquiryRepository
  ) { };

  private page: number = 0;
  private isLastPage = false;

  get shouldMoveScroll() {
    if (this.isLastPage === true) {
      return false
    };

    return true;
  }

  @observable
  inquiries: IInquiry[] = [];

  @observable
  lecture: ILecture | null = null;

  @action init() {
    this.inquiries = [];
    this.isLastPage = false;
    this.page = 0;
  }

  @action
  async fetch(adminCode: string) {
    if (this.isLastPage) {
      return;
    }

    const { inquiries } = await this.inquiryRepository.findInquires(adminCode, this.page);

    if (inquiries.length <= 0) {
      this.isLastPage = true;
      return;
    }

    this.page += 1;
    this.inquiries = inquiries.concat(this.inquiries);
  }

  addInquiry(inquiry: IInquiry) {
    this.inquiries = [
      ...this.inquiries,
      inquiry,
    ];
  }
}

export const inquiryStore = new InquiryStore(new InquiryRepository());