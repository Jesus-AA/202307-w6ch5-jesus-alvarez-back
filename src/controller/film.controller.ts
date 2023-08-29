import createDebug from 'debug';
import { Film } from '../entities/films';
import { Repository } from '../repository/repository';
import { Controller } from './controller.js';

const debug = createDebug('V25:Controller: PlayerController');

export class FilmController extends Controller<Film> {
  constructor(protected repo: Repository<Film>) {
    super(repo);
    debug('Instantiated');
  }
}
