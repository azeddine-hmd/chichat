import { Request, Response, Router } from 'express';
import * as authController from './auth-controller';
import passport from 'passport';

const prefix = '/auth';

export const authRouter = Router();

authRouter.post(prefix + '/register', authController.register);
authRouter.post(prefix + '/email-verify', authController.verifyEmail);
authRouter.get(prefix + '/pass', authController.pass);
authRouter.post(prefix + '/login', passport.authenticate('jwt', (req: Request, res: Response) => {
  console.log("authentication route '/api/auth/login'...");
}), authController.login);
