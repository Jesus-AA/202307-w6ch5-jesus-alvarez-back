import { UserWithId } from '../types/id';
import { Film } from './films';

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  lastName: string;
  role: 'admin' | 'pro' | 'user';
  films: Film[];
};

export type User = UserNoId & UserWithId;
