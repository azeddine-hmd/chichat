import { Router } from 'express';
import * as authController from './auth-controller';
import passport from 'passport';
import { upload } from '../../config';

const prefix = '/auth';

export const authRouter = Router();

authRouter.get(
  prefix + '/pass',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.status(200).send()
);

authRouter.post(prefix + '/register', authController.register);
authRouter.post(
  prefix + '/upload/avatar',
  upload.fields([
    {
      name: 'email',
    },
    {
      name: 'password',
    },
    {
      name: 'avatar',
    },
  ]),
  authController.uploadAvatar
);
authRouter.post(
  prefix + '/email-verify',
  authController.verifyEmail
);
authRouter.post(prefix + '/login', authController.login);
