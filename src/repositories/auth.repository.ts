import { baseAxios } from 'utils/axios';
import crypto from 'crypto';

export class AuthRepository {
  async login(id: string, pw: string) {
    const encodedPw = crypto
      .createHash('sha512')
      .update(pw)
      .digest('base64');

    const res = await baseAxios.post('/auth/login', {
      id,
      pw: encodedPw,
    });

    return res.data['data'];
  }
}