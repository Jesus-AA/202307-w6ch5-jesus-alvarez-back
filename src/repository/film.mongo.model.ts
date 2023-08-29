import { Schema, model } from 'mongoose';
import { Film } from '../entities/films';

const filmSchema = new Schema<Film>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
});

export const FilmModel = model('Film', filmSchema, 'films');
