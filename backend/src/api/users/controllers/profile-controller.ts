import { Request, Response } from 'express';
import * as profileService from '../services/profile-service';
import { HttpError } from '../../../utils/error';
import { mapToPrivateProfile, mapToPublicProfile } from '../users-mapper';

export async function myProfile(req: Request, res: Response) {
  const profile = await profileService.getProfile(req.user.id);
  res.status(200).send(mapToPrivateProfile(profile));
}

export async function otherProfile(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  const profile = await profileService.getProfile(id);
  res.status(200).send(mapToPublicProfile(profile));
}

export async function uploadAvatar(req: Request, res: Response) {
  const avatar = await profileService.uploadAvatar(req.user, req.file);
  res.status(201).send({ url: avatar.url });
}
