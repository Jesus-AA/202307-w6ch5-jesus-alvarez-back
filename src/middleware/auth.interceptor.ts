import { NextFunction, Request, Response } from 'express';
import { FilmMongoRepository } from '../repository/film.mongo.repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';

export class AuthInterceptor {
  authorization = (req: Request, _res: Response, next: NextFunction) => {
    console.log('Call interceptor');
    try {
      const token = req.get('Authorization')?.split(' ')[1];

      if (!token) {
        throw new HttpError(498, 'Invalid Token');
      }

      const { id } = Auth.verifyJWTGettingPayLoad(token);
      req.body.validatedId = id;
      console.log('ID', id);
      next();
    } catch (error) {
      next(error);
    }
  };

  async filmAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userId = req.body.validatedId;
    const filmId = req.params.id;

    try {
      const filmRepo = new FilmMongoRepository();
      const film = await filmRepo.getById(filmId);
      if (!film.filmFan.id === userId) {
        const error = new HttpError(403, 'Forbidden');
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
}
