import session from 'express-session';

export const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  cookie:
    process.env.NODE_ENV === 'production'
      ? { secure: true, sameSite: 'lax', httpOnly: true }
      : { secure: false, sameSite: 'none', httpOnly: false },
});
