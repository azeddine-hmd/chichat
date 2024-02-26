import { Request, Response } from 'express';
import * as relationshipService from '../services/relationship-service';
import { HttpError } from '../../../utils/error';
import { mapToPublicProfile } from '../users-mapper';

export async function sendFriendRequest(req: Request, res: Response) {
  if (!req.params.username)
    throw new HttpError(400, 'Invalid recipient username');
  const recipientUsername = req.params.username;
  if (!recipientUsername || recipientUsername === '')
    throw new HttpError(400, 'Invalid recipient username');
  const recipientProfile = await relationshipService.sendFriendRequest(
    req.user,
    recipientUsername
  );
  res.status(201).send(mapToPublicProfile(recipientProfile));
}

export async function cancelFriendRequest(req: Request, res: Response) {
  if (!req.params.username)
    throw new HttpError(400, 'Invalid recipient username');
  const recipientUsername = req.params.username;
  if (!recipientUsername || recipientUsername === '')
    throw new HttpError(400, 'Invalid recipient username');
  await relationshipService.cancelFriendRequest(req.user, recipientUsername);
  res.status(204).send();
}

export async function acceptFriendRequest(req: Request, res: Response) {
  if (!req.params.id) throw new HttpError(400, 'Invalid Id');
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.acceptFriendRequest(req.user, id);
  res.status(204).send();
}

export async function rejectFriendRequest(req: Request, res: Response) {
  if (!req.params.id) throw new HttpError(400, 'Invalid Id');
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.rejectFriendRequest(req.user, id);
  res.status(204).send();
}

export async function removeFriend(req: Request, res: Response) {
  if (!req.params.id) throw new HttpError(400, 'Invalid Id');
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.removeFriend(req.user, id);
  res.status(204).send();
}

export async function blockUser(req: Request, res: Response) {
  if (!req.params.id) throw new HttpError(400, 'Invalid Id');
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  const blockedUser = await relationshipService.blockUser(req.user, id);
  res.status(201).send({
    ...mapToPublicProfile(blockedUser),
  });
}

export async function unblockUser(req: Request, res: Response) {
  if (!req.params.id) throw new HttpError(400, 'Invalid Id');
  const id = parseInt(req.params.id);
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.unblockUser(req.user, id);
  res.status(204).send();
}
