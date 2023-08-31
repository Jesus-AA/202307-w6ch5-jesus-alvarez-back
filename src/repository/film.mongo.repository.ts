import createDebug from 'debug';
import { Film } from '../entities/films';
import { HttpError } from '../types/http.error.js';
import { FilmModel } from './film.mongo.model.js';
import { Repository } from './repository';

const debug = createDebug('V25:RepoFilmMongoRepository');

export class FilmMongoRepository implements Repository<Film> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Film[]> {
    debug('GetAll');
    const data = await FilmModel.find()
      .populate('filmFan', { userName: 1, email: 1 })
      .exec();
    return data;
  }

  async getById(id: string): Promise<Film> {
    debug('GetById' + id);
    const data = await FilmModel.findById(id).exec();
    debug(data);
    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying findById',
      });
    return data;
  }

  async create(newData: Omit<Film, 'id'>): Promise<Film> {
    debug('Create');
    const data = await FilmModel.create(newData);
    return data;
  }

  async update(id: string, newData: Partial<Film>): Promise<Film> {
    debug('Update');
    const data = await FilmModel.findByIdAndUpdate(id, newData, {
      new: true,
    }).exec();

    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying findByIdAndUpdate',
      });
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('Delete');
    const result = await FilmModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Fail to delete',
      });
  }
}
