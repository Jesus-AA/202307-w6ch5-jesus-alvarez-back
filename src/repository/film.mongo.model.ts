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
  filmFan: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

filmSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FilmModel = model('Film', filmSchema, 'films');
