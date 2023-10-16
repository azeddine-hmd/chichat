import { Express } from 'express';
import { requestTimeMiddleware } from './middlewares/request-time';
import bodyParser from 'body-parser';
import { cookieParserMiddleware } from './middlewares/cookie';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './auth/route';
import cors from 'cors';
import { corsOptions } from './config';
import { sessionMiddleware } from './middlewares/express-session';
import passport from 'passport';

const prefix = '/api';

export function setupRoutes(app: Express) {
  // setup middlewares BEFORE routes
  app.use(cookieParserMiddleware);
  app.use(bodyParser.json());
  app.use(sessionMiddleware);
  app.use(requestTimeMiddleware);
  app.use(cors(corsOptions));
  app.use(passport.initialize());

  // routes
  app.use(prefix, authRouter);

  // setup middlewares AFTER routes
  app.use(errorHandler);
}
