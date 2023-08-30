import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { LoginData, User } from '../entities/user';
import { Repository } from '../repository/repository';
import { HttpError } from '../types/http.error.js';
import { Controller } from './controller.js';

const debug = createDebug('V25:Controller: UserController');

export class UserController extends Controller<User> {
  constructor(protected repo: Repository<User>) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { userName, passwd } = req.body as unknown as LoginData;
    const error = new HttpError(401, 'Unauthorized', 'Login Unauthorized');
    try {
      if (!this.repo.search) return;
      const data = await this.repo.search({ key: 'userName', value: userName });
      if (!data.length) {
        throw error;
      }

      const user = data[0];

      if (user.passwd !== passwd) {
        throw error;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
