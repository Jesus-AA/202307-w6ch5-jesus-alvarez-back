export type FilmNoId = {
  name: string;
  director: string;
  duration: string;
  genre: string;
};

export type FilmId = {
  id: string;
};

export type Film = FilmNoId & FilmId;
