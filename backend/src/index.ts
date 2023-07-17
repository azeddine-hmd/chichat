import express from 'express';
import dotenv from 'dotenv';
import { randomInt } from 'crypto';
import bodyParser from 'body-parser';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';

dotenv.config();
const env = process.env;

export const app = express();

app.use(cookieParser());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Time:', Date.now().toLocaleString());
  next();
});

app.post('/users', (req, res, next) => {
  console.log(`request body: ${JSON.stringify(req.body)}`);
  if (randomInt(10) < 5) {
    next(createHttpError(400, 'failed to register user!'));
  }
  res.send('user added successfully');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('<h1>Internal Server Error</h1>');
});

app.listen(env.PORT, () => {
  console.log(
    `[server]: Server is running at ${env.PROTOCOL}://${env.HOST}:${env.PORT}`
  );
});
