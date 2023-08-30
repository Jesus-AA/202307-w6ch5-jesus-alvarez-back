import { User } from './user';

export type FilmNoId = {
  name: string;
  director: string;
  duration: string;
  genre: string;
  filmFan: User;
};

export type FilmId = {
  id: string;
};

export type Film = FilmNoId & FilmId;
