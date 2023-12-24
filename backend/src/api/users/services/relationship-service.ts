import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';
import { checkUserExists } from '../../../utils/prisma-utils';

function normalizeId(firstId: number, secondId: number) {
  return firstId < secondId
    ? { user1Id: firstId, user2Id: secondId }
    : { user1Id: secondId, user2Id: firstId };
}

export async function sendFriendRequest(
  me: Express.User,
  recipientUsername: string
) {
  if (me.username == recipientUsername)
    throw new HttpError(400, 'You cannot perform this action on yourself');
  const { id: recipientId } = await checkUserExists(recipientUsername);

  const { user1Id, user2Id } = normalizeId(me.id, recipientId);
  const friendship = await prisma.friendship.findUnique({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
  });
  if (friendship) throw new HttpError(409, 'Friendship already exist.');

  const pendingFriendship = await prisma.pendingFriendship.findFirst({
    where: {
      OR: [
        { senderId: me.id, recipientId: recipientId },
        { senderId: recipientId, recipientId: me.id },
      ],
    },
  });

  if (pendingFriendship)
    // throw new HttpError(
    //   409,
    //   'Friendship request already been sent or You have to accept'
    // );
    return;

  try {
    await prisma.pendingFriendship.create({
      data: {
        sender: { connect: { id: me.id } },
        recipient: { connect: { id: recipientId } },
      },
    });
  } catch (err) {
    throw new HttpError(409, 'Friend request already exists');
  }
}

export async function removeFriend(me: Express.User, friendId: number) {
  if (me.id == friendId)
    throw new HttpError(400, 'You cannot perform this action on yourself');
  await checkUserExists(friendId);

  const { user1Id, user2Id } = normalizeId(me.id, friendId);
  const friendship = await prisma.friendship.findUnique({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
  });
  if (!friendship) throw new HttpError(400, 'Friendship does not exist');

  await prisma.friendship.delete({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
  });
}

export async function acceptFriendRequest(me: Express.User, senderId: number) {
  await checkUserExists(senderId);
  if (me.id == senderId)
    throw new HttpError(400, 'You cannot perform this action on yourself');

  const pendingFriendship = await prisma.pendingFriendship.findFirst({
    where: { senderId: senderId, recipientId: me.id },
  });
  if (!pendingFriendship)
    throw new HttpError(400, 'Friend request does not exist');

  const { user1Id, user2Id } = normalizeId(me.id, senderId);
  await prisma.pendingFriendship.delete({
    where: {
      unique_user_combination: { senderId: user1Id, recipientId: user2Id },
    },
  });
  await prisma.friendship.create({
    data: {
      user1: { connect: { id: user1Id } },
      user2: { connect: { id: user2Id } },
    },
  });
}

export async function rejectFriendRequest(me: Express.User, senderId: number) {
  await checkUserExists(senderId);
  if (me.id == senderId)
    throw new HttpError(400, 'You cannot perform this action on yourself');

  const pendingFriendship = await prisma.pendingFriendship.findFirst({
    where: { senderId: senderId, recipientId: me.id },
  });
  if (!pendingFriendship)
    throw new HttpError(400, 'Friend request doeds not exist');

  const { user1Id, user2Id } = normalizeId(me.id, senderId);
  await prisma.pendingFriendship.delete({
    where: {
      unique_user_combination: { senderId: user1Id, recipientId: user2Id },
    },
  });
}

export async function blockUser(me: Express.User, targetId: number) {
  if (me.id == targetId)
    throw new HttpError(400, 'You cannot perform this action on yourself');
  await checkUserExists(targetId);

  const blockRecord = await prisma.block.findFirst({
    where: {
      blockedById: me.id,
      blockedId: targetId,
    },
  });
  if (blockRecord) throw new HttpError(409, 'User already blocked');

  await prisma.block.create({
    data: {
      blockedBy: { connect: { id: me.id } },
      blocked: { connect: { id: targetId } },
    },
  });
}

export async function unblockUser(me: Express.User, targetId: number) {
  if (me.id == targetId)
    throw new HttpError(400, 'You cannot perform this action on yourself');
  await checkUserExists(targetId);

  const blockRecord = await prisma.block.findFirst({
    where: {
      blockedById: me.id,
      blockedId: targetId,
    },
  });
  if (!blockRecord) throw new HttpError(409, 'User already unblocked');

  await prisma.block.delete({
    where: {
      unique_user_combination: {
        blockedById: me.id,
        blockedId: targetId,
      },
    },
  });
}
