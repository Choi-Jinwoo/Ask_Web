export interface ILecture {
  id: string;
  title: string;
  isClosed: boolean;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}