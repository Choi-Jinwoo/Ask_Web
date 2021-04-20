import { AuthRepository } from 'repositories/auth.repository';

class AuthStore {
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  async login(id: string, pw: string): Promise<string> {
    const data = await this.authRepository.login(id, pw);
    const token = data['x-access-token'];

    return token;
  }
}

export const authStore = new AuthStore(new AuthRepository());