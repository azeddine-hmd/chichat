import { io } from '.';
import helmet from 'helmet';
import cookie from 'cookie';
import { prisma, verifyJwt } from '../config';
import { sessionMiddleware } from '../api/middlewares/express-session';
import { UserStatus } from '@prisma/client';

io.engine.use(sessionMiddleware);
io.engine.use(helmet());

// authentication middleware
io.use((socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  const jwtKey = process.env.JWT_COOKIE_NAME;
  if (!cookies[jwtKey]) next(new Error('auth token not found'));
  const payload = verifyJwt(cookies[jwtKey]);
  if (typeof payload === 'string') next(new Error('invalid payload'));
  else {
    socket.user = { id: payload.id, username: payload.username };
    next();
  }
});
