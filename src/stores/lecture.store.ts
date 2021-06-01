import { LectureRepository } from 'repositories/lecture.repository';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { tokenStorage } from 'storage/token.storage';
import { ILecture } from 'types/lecture.interface';

class LectureStore {
  constructor(
    private readonly lectureRepository: LectureRepository,
  ) { };

  async join(joinCode: string): Promise<ILecture> {
    const token = tokenStorage.get() as string;
    const { lecture } = await this.lectureRepository.joinLecture(token, joinCode);

    return lecture;
  }

  async close(lecture: ILecture): Promise<void> {
    const adminCode = adminCodeStorage.get() as string;
    await this.lectureRepository.closeLecture(adminCode, lecture);
  }
}

export const lectureStore = new LectureStore(new LectureRepository());