import createDebug from 'debug';
import { Player } from '../entities/player';
import { Repository } from '../repository/repository';
import { Controller } from './controller.js';

const debug = createDebug('V25:Controller: PlayerController');
export class PlayerController extends Controller<Player> {
  constructor(protected repo: Repository<Player>) {
    super(repo);
    debug('Instantiated');
  }
}
