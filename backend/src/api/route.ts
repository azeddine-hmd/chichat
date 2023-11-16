import * as express from 'express';
import { requestTimeMiddleware } from './middlewares/request-time';
import bodyParser from 'body-parser';
import { cookieParserMiddleware } from './middlewares/cookie';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './auth/route';
import cors from 'cors';
import { sessionMiddleware } from './middlewares/express-session';
import passport from 'passport';
import { usersRouter } from './users/route';
import helmet from 'helmet';
import { app } from '../app';
import { corsOptions } from '../config';

const prefix = '/api';

// bind middlewares before routes mount
app.use(helmet());
app.use(cookieParserMiddleware);
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(requestTimeMiddleware);
app.use(cors(corsOptions));
app.use(passport.initialize());

// module routes
app.use('/static', express.static('uploads'));
app.use(prefix, authRouter);
app.use(prefix, usersRouter);

// bind middlewares after routes mount
app.use(errorHandler);
