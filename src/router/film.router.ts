import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { FilmController } from '../controller/film.controller.js';
import { FilmMongoRepository } from '../repository/film.mongo.repository.js';

const debug = createDebug('V25:Router: FilmRouter');

debug('Loaded');

const repo = new FilmMongoRepository();
const filmController = new FilmController(repo);
export const filmRouter = createRouter();

filmRouter.get('/', filmController.getAll.bind(filmController));
filmRouter.get('/:id', filmController.getById.bind(filmController));
filmRouter.post('/:userId', filmController.create.bind(filmController));
filmRouter.patch('/:id', filmController.update.bind(filmController));
filmRouter.delete('/:id', filmController.delete.bind(filmController));
