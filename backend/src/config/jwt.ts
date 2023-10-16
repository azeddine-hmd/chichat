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
        (req: Request) => req.cookies['loginId'],
      ]),
      issuer: process.env.BACKEND_DOMAIN,
      audience: process.env.FRONTEND_DOMAIN,
    },
    (payload: jwtPayload, done: VerifiedCallback) => {
      prisma.user
        .findUnique({
          where: { id: payload.id },
        })
        .then(({ password, ...user }) => {
          done(null, { user });
        })
        .catch((res) => {
          done(new HttpError(400, 'user not found in database'), false);
        });
    }
  )
);

export async function signJwt(userId: number): Promise<string> {
  return jwt.sign(
    {
      id: userId,
      iss: process.env.BACKEND_DOMAIN,
      aud: process.env.FRONTEND_DOMAIN,
    },
    process.env.JWT_SECRET
  );
}
