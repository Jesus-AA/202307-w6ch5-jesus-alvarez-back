import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app.js';

const PORT = process.env.PORT || 3000;

const server = createServer(app); // App de express

server.listen(PORT);

server.on('listening', () => {
  console.log(`Listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
