import { baseAxios } from 'utils/axios';

const TAKE_COUNT_PER_REQUEST = 12;

export class InquiryRepository {
  async findInquires(adminCode: string, page: number) {
    const res = await baseAxios.get('/inquiry', {
      params: {
        page,
        adminCode,
        take: TAKE_COUNT_PER_REQUEST,
      },
    });

    return res.data['data'];
  }
}