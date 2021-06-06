import { ILecture } from 'types/lecture.interface';
import { baseAxios } from 'utils/axios';

export class LectureRepository {
  async joinLecture(token: string, joinCode: string) {
    const res = await baseAxios.post('/lecture/join', {
      joinCode,
    }, {
      headers: {
        'x-access-token': token,
      },
    });

    return res.data['data'];
  }

  async closeLecture(adminCode: string, lecture: ILecture) {
    await baseAxios.post('/lecture/close', {
      lectureId: lecture.id,
      adminCode,
    });
  }

  async createLecture(title: string, lecturer: string) {
    const res = await baseAxios.post('/lecture', {
      title,
      lecturer,
    });

    return res.data['data'];
  }
}