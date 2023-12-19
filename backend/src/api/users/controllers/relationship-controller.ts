import { Request, Response } from 'express';
import * as relationshipService from '../services/relationship-service';
import { HttpError } from '../../../utils/error';

export async function sendFriendRequest(req: Request, res: Response) {
  const recipientUsername = req.params.username;
  if (!recipientUsername || recipientUsername === '')
    throw new HttpError(400, 'Invalid recipient username');
  await relationshipService.sendFriendRequest(req.user, recipientUsername);
  res.status(204).send();
}

export async function acceptFriendRequest(req: Request, res: Response) {
  const id = parseInt(req.query.id.toString());
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.acceptFriendRequest(req.user, id);
  res.status(204).send();
}

export async function rejectFriendRequest(req: Request, res: Response) {
  const id = parseInt(req.query.id.toString());
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.rejectFriendRequest(req.user, id);
  res.status(204).send();
}

export async function removeFriend(req: Request, res: Response) {
  const id = parseInt(req.query.id.toString());
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.removeFriend(req.user, id);
  res.status(204).send();
}

export async function blockUser(req: Request, res: Response) {
  const id = parseInt(req.query.id.toString());
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.blockUser(req.user, id);
  res.status(204).send();
}

export async function unblockUser(req: Request, res: Response) {
  const id = parseInt(req.query.id.toString());
  if (!id) throw new HttpError(400, 'Invalid id');
  await relationshipService.unblockUser(req.user, id);
  res.status(204).send();
}
