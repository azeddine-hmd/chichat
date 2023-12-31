import { Router } from 'express';
import * as relationshipController from './controllers/relationship-controller';
import * as profileController from './controllers/profile-controller';
import { upload } from '../../config';
import { authenticated } from '../middlewares/authenticated';

const prefix = '/users';

export const usersRouter = Router();

//==[Profile]==//

/**
 * @openapi
 * /api/users/profile/me:
 *    get:
 *      summary: Get current user profile
 *      tags:
 *      - Profile
 */
usersRouter.get(
  prefix + '/profile/me',
  authenticated,
  profileController.myProfile
);

/**
 * @openapi
 * /api/users/profile/{id}:
 *    get:
 *      summary: Get other user profile by id
 *      tags:
 *        - Profile
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.get(
  prefix + '/profile/:id',
  authenticated,
  profileController.otherProfile
);

/**
 * @openapi
 * /api/users/upload/avatar:
 *    post:
 *      summary: Upload avatar
 *      tags:
 *        - Profile
 *      consumes:
 *        - multipart/form-data
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                avatar:
 *                  type: string
 *                  format: binary
 */
usersRouter.post(
  prefix + '/upload/avatar',
  authenticated,
  upload.single('avatar'),
  profileController.uploadAvatar
);

//==[Friendship]==//

/**
 * @openapi
 * /api/users/friends/send/{username}:
 *    post:
 *      summary: Send friend request by username
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: username
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 */
usersRouter.post(
  prefix + '/friends/send/:username',
  authenticated,
  relationshipController.sendFriendRequest
);

/**
 * @openapi
 * /api/users/friends/cancel/{username}:
 *    delete:
 *      summary: Cancel friend request by username
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: username
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 */
usersRouter.delete(
  prefix + '/friends/cancel/:username',
  authenticated,
  relationshipController.cancelFriendRequest
);

/**
 * @openapi
 * /api/users/friends/accept/{id}:
 *    post:
 *      summary: Accept friend request by id
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.post(
  prefix + '/friends/accept/:id',
  authenticated,
  relationshipController.acceptFriendRequest
);

/**
 * @openapi
 * /api/users/friends/reject/{id}:
 *    delete:
 *      summary: Reject friend request by id
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.delete(
  prefix + '/friends/reject/:id',
  authenticated,
  relationshipController.rejectFriendRequest
);

/**
 * @openapi
 * /api/users/friends/remove/{id}:
 *    delete:
 *      summary: Remove Friend by id
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.delete(
  prefix + '/friends/remove/:id',
  authenticated,
  relationshipController.removeFriend
);

/**
 * @openapi
 * /api/users/block/{id}:
 *    post:
 *      summary: Block user by id
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.post(
  prefix + '/block/:id',
  authenticated,
  relationshipController.blockUser
);

/**
 * @openapi
 * /api/users/unblock/{id}:
 *    patch:
 *      summary: Unblock user by id
 *      tags:
 *        - Friendship
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 */
usersRouter.patch(
  prefix + '/unblock/:id',
  authenticated,
  relationshipController.unblockUser
);
