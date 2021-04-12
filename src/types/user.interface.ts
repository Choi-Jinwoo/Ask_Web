import { AccessLevels } from 'enum/user.enum';

export interface IUser {
  id: string;
  name: string;
  grade: string | null;
  room: string | null;
  number: string | null;
  accessLevel: AccessLevels;
  profileImage: string | null;
}
