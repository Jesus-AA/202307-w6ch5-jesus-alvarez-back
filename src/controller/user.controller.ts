import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { LoginData, User } from '../entities/user';
import { Repository } from '../repository/repository';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { TokenPayLoad } from '../types/token';
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

      if (!(await Auth.compare(passwd, user.passwd))) {
        throw error;
      }

      const payload: TokenPayLoad = {
        id: user.id,
        userName: user.userName,
      };

      const token = Auth.signJWT(payload);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.passwd = await Auth.hash(req.body.passwd);
      const finalItem = await this.repo.create(req.body);
      res.status(201);
      res.json(finalItem);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const finalItem = await this.repo.update(id, req.body);
      res.json(finalItem);
    } catch (error) {
      next(error);
    }
  }
}
