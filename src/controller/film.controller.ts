import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Film } from '../entities/films.js';
import { Repository } from '../repository/repository.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';
import { Controller } from './controller.js';

const debug = createDebug('V25:Controller: PlayerController');

export class FilmController extends Controller<Film> {
  constructor(protected repo: Repository<Film>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { validatedId } = req.body;
      const userRepo = new UserMongoRepository();
      const user = await userRepo.getById(validatedId);
      req.body.author = user.id;
      const finalNote = await this.repo.create(req.body);
      user.films.push(finalNote);
      userRepo.update(user.id, user);
      res.status(201);
      res.json(finalNote);
    } catch (error) {
      next(error);
    }
  }
}
