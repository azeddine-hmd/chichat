import session, { Store } from 'express-session';
import { prisma } from '../../config';
import { COOKIE_MAX_AGE_MILIS } from '../../constants';

class MyStore extends Store {
  get(
    sid: string,
    callback: (err: any, session?: session.SessionData) => void
  ): void {
    prisma.session
      .findUnique({
        where: { sid: sid },
      })
      .then((session) => {
        callback(null, JSON.parse(session.data));
      })
      .catch((err) => {
        callback(err);
      });
  }

  set(
    sid: string,
    session: session.SessionData,
    callback?: (err?: any) => void
  ): void {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + COOKIE_MAX_AGE_MILIS);
    prisma.session
      .upsert({
        where: { sid: sid },
        create: {
          sid: sid,
          data: JSON.stringify(session),
          expires: expireDate,
        },
        update: {
          data: JSON.stringify(session),
        },
      })
      .then(() => callback())
      .catch((err) => callback(err));
  }

  destroy(sid: string, callback?: (err?: any) => void): void {
    prisma.session
      .delete({
        where: { sid: sid },
      })
      .then(() => callback())
      .catch((err) => callback(err));
  }
}

export const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  cookie:
    process.env.NODE_ENV === 'production'
      ? { secure: true, sameSite: 'lax', httpOnly: true }
      : { secure: false, sameSite: 'none', httpOnly: false },
  resave: false,
  saveUninitialized: false,
  store: new MyStore(),
});
