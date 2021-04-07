import { IUser } from './user.interface';
export interface IInquiry {
  content: string;
  user: IUser | null;
}