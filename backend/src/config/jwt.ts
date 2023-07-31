import { ExtractJwt, Strategy, VerifiedCallback, VerifyCallback } from 'passport-jwt';
import { Request } from 'express';
import { HttpError } from '../utils/error';
import passport from 'passport';

const verifyCallback: VerifyCallback = (
  payload: any,
  done: VerifiedCallback
) => {
  console.log(`recieving payload: ${payload}`);
  done(new HttpError(400, "user not found in database"), false);
};

export const jwtStrategy = new Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
      let token = null;
      if (req && req.cookies){
        token = req.cookies['loginId'];
      }
      return token;
    }]),
    issuer: process.env.GMAIL_EMAIL,
    audience: process.env.FRONTEND_DOMAIN,
  },
  verifyCallback,
);

passport.use(jwtStrategy);
