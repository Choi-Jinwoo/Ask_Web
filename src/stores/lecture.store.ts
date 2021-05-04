import { LectureRepository } from 'repositories/lecture.repository';
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
}

export const lectureStore = new LectureStore(new LectureRepository());