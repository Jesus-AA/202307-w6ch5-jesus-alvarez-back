import { Router as createRouter } from 'express';
import { PlayerController } from '../controller/player.controller.js';
import { PlayersFsRepository } from '../repository/player.fs.repository.js';

const repo = new PlayersFsRepository();

const playerController = new PlayerController(repo);

export const playerRouter = createRouter();

playerRouter.get('/', playerController.getAll.bind(playerController));
playerRouter.get('/:id', playerController.getById.bind(playerController));
playerRouter.post('/', playerController.create.bind(playerController));
playerRouter.patch('/:id', playerController.update.bind(playerController));
playerRouter.delete('/:id', playerController.delete.bind(playerController));
