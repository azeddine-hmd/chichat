import { Request, Response } from 'express';
import * as profileService from '../services/profile-service';
import { File, User } from '@prisma/client';
import { HttpError } from '../../../utils/error';

function mapToProfileResponse(user: User, avatar?: File) {
  return {
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    dateOfBirth: user.dateOfBirth,
    status: user.status.toLowerCase(),
    avatar: avatar ? avatar.url : '',
  };
}

export async function myProfile(req: Request, res: Response) {
  const { user, avatar } = await profileService.getProfile(req.user.id);
  res.status(200).send(mapToProfileResponse(user, avatar));
}

export async function otherProfile(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  const { user, avatar } = await profileService.getProfile(id);
  res.status(200).send(mapToProfileResponse(user, avatar));
}

export async function uploadAvatar(req: Request, res: Response) {
  console.log('Uploaded file: ', req.file);
  const avatar = await profileService.uploadFile(req.user, req.file);
  res.status(201).send({ url: avatar.url });
}
