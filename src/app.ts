import cors from 'cors';
import createDebug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { taskRouter } from './router/task.router.js';

export const app = express(); // Llamamos a express.

const debug = createDebug('V25:App'); // El V25 puede ser el que sea.

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));
// Middleware

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hola Mundo');

  res.end();
});

app.use('/players', taskRouter); // Importamos el taskRouter de la carpeta router.
