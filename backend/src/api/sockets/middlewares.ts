import helmet from 'helmet';
import cookie from 'cookie';
import { Socket } from 'socket.io';
import { io } from './socket';
import { sessionMiddleware } from '../middlewares/express-session';
import { prisma, verifyJwt } from '../../config';

io.engine.use(sessionMiddleware);
io.engine.use(helmet());

function authentication(socket: Socket, next: (err?: Error) => void) {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  const jwtKey = process.env.JWT_COOKIE_NAME;
  if (!cookies[jwtKey]) {
    next(new Error('auth token not found'));
    socket.disconnect();
  }
  const payload = verifyJwt(cookies[jwtKey]);
  if (typeof payload === 'string') {
    next(new Error('invalid payload'));
    socket.disconnect();
  } else {
    prisma.user
      .findFirstOrThrow({
        where: { id: payload.id, username: payload.username },
        select: { id: true, username: true },
      })
      .then((user) => {
        socket.user = user;
        next();
      })
      .catch((error) => {
        console.error('socket:authentication: ', error);
        next(new Error('User not found'));
        socket.disconnect();
      });
  }
}
io.use(authentication);
