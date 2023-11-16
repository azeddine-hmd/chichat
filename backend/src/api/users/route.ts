import { Router } from 'express';
import * as relationshipController from './controllers/relationship-controller';
import * as profileController from './controllers/profile-controller';
import passport from 'passport';
import { upload } from '../../config';

const prefix = '/users';

export const usersRouter = Router();

// profile
usersRouter.get(
  prefix + '/profile/me',
  passport.authenticate('jwt', { session: false }),
  profileController.myProfile
);
usersRouter.get(
  prefix + '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  profileController.otherProfile
);
usersRouter.post(
  prefix + '/upload/avatar',
  passport.authenticate('jwt', { session: false }),
  upload.single('avatar'),
  profileController.uploadAvatar
);

// friends
usersRouter.post(
  prefix + '/friends/send/:id',
  passport.authenticate('jwt', { session: false }),
  relationshipController.sendFriendRequest
);
usersRouter.post(
  prefix + '/friends/accept/:id',
  passport.authenticate('jwt', { session: false }),
  relationshipController.acceptFriendRequest
);
usersRouter.delete(
  prefix + '/friends/remove/:id',
  passport.authenticate('jwt', { session: false }),
  relationshipController.removeFriend
);

usersRouter.post(
  prefix + '/block/:id',
  passport.authenticate('jwt', { session: false }),
  relationshipController.removeFriend
);

usersRouter.post(
  prefix + '/block/:id',
  passport.authenticate('jwt', { session: false }),
  relationshipController.removeFriend
);

// block
