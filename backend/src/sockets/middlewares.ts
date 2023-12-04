import { io } from '.';
import helmet from 'helmet';
import cookie from 'cookie';
import { verifyJwt } from '../config';
import { sessionMiddleware } from '../api/middlewares/express-session';
import { Socket } from 'socket.io';

io.engine.use(sessionMiddleware);
io.engine.use(helmet());

function authentication(socket: Socket, next: (err?: Error) => void) {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  const jwtKey = process.env.JWT_COOKIE_NAME;
  if (!cookies[jwtKey]) next(new Error('auth token not found'));
  const payload = verifyJwt(cookies[jwtKey]);
  if (typeof payload === 'string') next(new Error('invalid payload'));
  else {
    socket.user = { id: payload.id, username: payload.username };
    next();
  }
}
io.use(authentication);
