import express from 'express';
import './config';
import { setupRoutes } from './route';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

setupRoutes(app);

app.listen(process.env.EXPRESS_PORT, () => {
  const a = 1;
  const b = 2;
  console.log(
    `[server]: Server is running at localhost:${process.env.EXPRESS_PORT}`
  );
});
