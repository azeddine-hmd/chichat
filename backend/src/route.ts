import { Express } from 'express';
import { requestTimeMiddleware } from './middlewares/request-time';
import { sessionMiddleware } from './middlewares/express-session';
import bodyParser from 'body-parser';
import { cookieParserMiddleware } from './middlewares/cookie';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './auth/route';
import cors from 'cors';
import { corsOptions } from './config';

const prefix = '/api';

export function setupRoutes(app: Express) {
  // setup middlewares BEFORE routes
  app.use(cookieParserMiddleware);
  app.use(bodyParser.json());
  app.use(sessionMiddleware);
  app.use(requestTimeMiddleware);
  app.use(cors(corsOptions));

  // routes
  app.use(prefix, authRouter);

  // setup middlewares AFTER routes
  app.use(errorHandler);
}
