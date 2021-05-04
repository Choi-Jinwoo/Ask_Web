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
}