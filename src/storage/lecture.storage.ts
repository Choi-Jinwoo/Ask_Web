import { ILecture } from 'types/lecture.interface';
import { IStorage } from './storage.interface';

const LECTURE_KEY = 'lecture';

class LectureStorage implements IStorage<ILecture> {

  get(): ILecture | null {
    const jsonData = sessionStorage.getItem(LECTURE_KEY);

    return jsonData === null ? null : JSON.parse(jsonData);
  }

  set(item: ILecture): void {
    sessionStorage.setItem(LECTURE_KEY, JSON.stringify(item));
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
