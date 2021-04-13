import { IStorage } from './storage.interface';

const LECTURE_KEY = 'lecture';

class LectureStorage implements IStorage<string> {

  get(): string | null {
    return sessionStorage.getItem(LECTURE_KEY);
  }

  set(item: string): void {
    sessionStorage.setItem(LECTURE_KEY, item);
  }

  hasItem(): boolean {
    if (this.get() === null) {
      return false;
    }

    return true;
  }

  remove(): void {
    sessionStorage.removeItem(LECTURE_KEY);
  }
}

export const lectureStorage = new LectureStorage();
