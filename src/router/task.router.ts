import { Router as createRouter } from 'express';
import { TaskController } from '../controller/task.controller.js';

export const taskRouter = createRouter();

const taskController = new TaskController();

taskRouter.get('/', taskController.getAll.bind(taskController));

taskRouter.get('/:id', taskController.getById.bind(taskController));

taskRouter.post('/', taskController.create.bind(taskController));

taskRouter.patch('/:id', taskController.update.bind(taskController));

taskRouter.delete('/:id', taskController.delete.bind(taskController));
