import { IStorage } from './storage.interface';

const TOKEN_KEY = 'token';

class TokenStorage implements IStorage<string> {

  get(): string | null {
    return sessionStorage.get(TOKEN_KEY);
  }

  set(item: string): void {
    sessionStorage.setItem(TOKEN_KEY, item);
  }

  hasItem(): boolean {
    if (this.get() === null) {
      return false;
    }

    return true;
  }

  remove(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export const tokenStorage = new TokenStorage();
