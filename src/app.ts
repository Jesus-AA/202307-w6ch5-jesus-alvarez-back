import cors from 'cors';
import createDebug from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { playerRouter } from './router/player.router.js';

export const app = express(); // Llamamos a express.

const debug = createDebug('V25:App'); // El V25 puede ser el que sea.

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public')); // Static agarra esa ruta para buscar cualquier cosa que se pida (en este caso en la carpeta public). Antes de seguir primero busca en la carpeta.
// Middleware

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hola Mundo');

  res.end();
});

app.use('/players', playerRouter); // Importamos el taskRouter de la carpeta router.
