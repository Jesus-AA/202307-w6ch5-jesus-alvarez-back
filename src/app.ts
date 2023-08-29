import cors from 'cors';
import createDebug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';
import { filmRouter } from './router/film.router.js';
import { playerRouter } from './router/player.router.js';

const debug = createDebug('V25:App');
export const app = express();

debug('Started');

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
app.use('/films', filmRouter);

app.use(errorMiddleware);
