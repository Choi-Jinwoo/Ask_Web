import { IStorage } from './storage.interface';

const ADMIN_CODE_KEY = 'admin_code';

class AdminCodeStorage implements IStorage<string> {
  get(): string | null {
    return sessionStorage.getItem(ADMIN_CODE_KEY);
  }

  set(item: string): void {
    sessionStorage.setItem(ADMIN_CODE_KEY, item);
  }

  hasItem(): boolean {
    if (this.get() === null) {
      return false;
    }

    return true;
  }
}

export const adminCodeStorage = new AdminCodeStorage();
