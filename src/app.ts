import cors from 'cors';
import createDebug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';
import { playerRouter } from './router/player.router.js';

export const app = express();
const debug = createDebug('V25:App');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hola Mundo');
  res.write('<h1>Champions</h1>');
  res.end();
});

app.use('/players', playerRouter);

app.use(errorMiddleware);
