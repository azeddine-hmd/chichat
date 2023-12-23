import express from 'express';
import './config';
import http from 'http';

process.on('unhandledRejection', (reason, promise) => {
  console.log(`reason: ${JSON.stringify(reason)}`);
  console.log(`reason: ${JSON.stringify(promise)}`);
  process.exit(1);
});

export const app = express();

import './api/route';

export const server = http.createServer(app);

import './api/sockets/socket';

const port = process.env.EXPRESS_PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`[server]: Server is running at localhost:${port}`);
  });
}
