import { baseAxios } from 'utils/axios';
import { sha512 } from 'js-sha512'

export class AuthRepository {
  async login(id: string, pw: string) {
    const encodedPw = sha512(pw);

    const res = await baseAxios.post('/auth/login', {
      id,
      pw: encodedPw,
    });

    return res.data['data'];
  }
}