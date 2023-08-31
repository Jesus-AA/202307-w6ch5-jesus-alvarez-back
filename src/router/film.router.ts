import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { FilmController } from '../controller/film.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FilmMongoRepository } from '../repository/film.mongo.repository.js';

const debug = createDebug('V25:Router: FilmRouter');

const authInterceptor = new AuthInterceptor();

debug('Loaded');

const repo = new FilmMongoRepository();
const filmController = new FilmController(repo);
export const filmRouter = createRouter();

filmRouter.get('/', filmController.getAll.bind(filmController));
filmRouter.get('/:id', filmController.getById.bind(filmController));
filmRouter.post(
  '/',
  authInterceptor.authorization.bind(authInterceptor),
  filmController.create.bind(filmController)
);
filmRouter.patch(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.filmAuthentication.bind(authInterceptor),
  filmController.update.bind(filmController)
);
filmRouter.delete(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.filmAuthentication.bind(authInterceptor),
  filmController.delete.bind(filmController)
);
