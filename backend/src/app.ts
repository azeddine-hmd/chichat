import express from 'express';
import './config';
import { setupRoutes } from './route';

export const app = express();

app.disable('x-powered-by');

setupRoutes(app);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    `[server]: Server is running at localhost:${process.env.EXPRESS_PORT}`
  );
});
