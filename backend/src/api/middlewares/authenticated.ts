import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../utils/error';
import { prisma, verifyJwt } from '../../config';

export async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwtKey = process.env.JWT_COOKIE_NAME;
  if (!req.cookies[jwtKey]) throw new HttpError(400, 'unauthenticated');
  const payload = verifyJwt(req.cookies[jwtKey]);
  if (typeof payload === 'string') {
    res.clearCookie(jwtKey);
    throw new HttpError(400, 'unauthenticated');
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: { id: true, username: true },
  });
  if (!user) {
    res.clearCookie(jwtKey);
    throw new HttpError(400, 'unauthenticated');
  }
  req.user = {
    id: user.id,
    username: user.username,
  };
  next();
}
