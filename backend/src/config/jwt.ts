import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { HttpError } from '../utils/error';
import passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { prisma } from './prisma';

type jwtPayload = {
  id: number;
  iss: string;
  aud: string;
  iat: number;
};

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies[`${process.env.JWT_COOKIE_NAME}`],
      ]),
      issuer: process.env.BACKEND_DOMAIN,
      audience: process.env.FRONTEND_DOMAIN,
    },
    (payload: jwtPayload, done: VerifiedCallback) => {
      prisma.user
        .findUnique({
          where: { id: payload.id },
          select: {
            id: true,
            username: true,
          },
        })
        .then((user) => {
          done(null, user);
        })
        .catch((res) => {
          done(new HttpError(400, 'User not found in database'), false);
        });
    }
  )
);

export function signJwt(userId: number): string {
  return jwt.sign(
    {
      id: userId,
      iss: process.env.BACKEND_DOMAIN,
      aud: process.env.FRONTEND_DOMAIN,
    },
    process.env.JWT_SECRET
  );
}

export function verifyJwt(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET);
}
