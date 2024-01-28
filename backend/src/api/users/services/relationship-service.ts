import { prisma } from '../../../config';
import { HttpError } from '../../../utils/error';
import { checkUserExists } from '../../../utils/prisma-utils';
import { UserIncludeRelations } from '../types/user-include-avatar';
import { forEachSocket } from '../../../utils/for-each-socket';
import { mapToPublicProfile } from '../users-mapper';

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
  const recipient = await checkUserExists(recipientUsername);

  const { user1Id, user2Id } = normalizeId(me.id, recipient.id);
  const friendship = await prisma.friendship.findUnique({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
  });
  if (friendship) throw new HttpError(409, 'Friendship already exist.');

  const blockRecord = await prisma.block.findFirst({
    where: {
      blockedById: recipient.id,
      blockedId: me.id,
    },
  });
  if (blockRecord)
    throw new HttpError(
      400,
      'you have been blocked cannot send friend request'
    );

  const pendingFriendship = await prisma.pendingFriendship.findFirst({
    where: {
      OR: [
        { senderId: me.id, recipientId: recipient.id },
        { senderId: recipient.id, recipientId: me.id },
      ],
    },
    include: {
      recipient: { include: { avatar: true } },
      sender: { include: { avatar: true } },
    },
  });

  const updateRecipient = (
    recipientId: number,
    sender: UserIncludeRelations
  ) => {
    forEachSocket(recipientId, (socket) => {
      socket.emit('relation:updates', {
        operation: 'sentFR',
        user: { ...mapToPublicProfile(sender) },
      });
    });
  };

  if (pendingFriendship) {
    updateRecipient(recipient.id, pendingFriendship.sender);
    return pendingFriendship.recipient;
  }

  try {
    const pendingFR = await prisma.pendingFriendship.create({
      data: {
        sender: { connect: { id: me.id } },
        recipient: { connect: { id: recipient.id } },
      },
      include: {
        recipient: { include: { avatar: true } },
        sender: { include: { avatar: true } },
      },
    });
    console.log('sending pending event');
    updateRecipient(recipient.id, pendingFR.sender);
    return pendingFR.recipient;
  } catch (err) {
    throw new HttpError(409, 'Friend request already exists');
  }
}

export async function cancelFriendRequest(
  me: Express.User,
  recipientUsername: string
) {
  const recipient = await checkUserExists(recipientUsername);
  if (me.id == recipient.id)
    throw new HttpError(400, 'You cannot perform this action on yourself');

  const pendingFR = await prisma.pendingFriendship.findFirst({
    where: { senderId: me.id, recipientId: recipient.id },
    include: { recipient: { include: { avatar: true } } },
  });
  if (!pendingFR) throw new HttpError(400, 'Friend request does not exist');

  await prisma.pendingFriendship.delete({
    where: { id: pendingFR.id },
  });

  forEachSocket(pendingFR.recipientId, (socket) => {
    socket.emit('relation:updates', {
      operation: 'cancelFR',
      user: { ...mapToPublicProfile(pendingFR.recipient) },
    });
  });
}

export async function rejectFriendRequest(me: Express.User, senderId: number) {
  await checkUserExists(senderId);
  if (me.id == senderId)
    throw new HttpError(400, 'You cannot perform this action on yourself');

  const pendingFR = await prisma.pendingFriendship.findFirst({
    where: { senderId: senderId, recipientId: me.id },
    include: {
      sender: { include: { avatar: true } },
      recipient: { include: { avatar: true } },
    },
  });
  if (!pendingFR) throw new HttpError(400, 'Friend request does not exist');

  await prisma.pendingFriendship.delete({
    where: {
      unique_user_combination: { senderId: senderId, recipientId: me.id },
    },
  });

  forEachSocket(pendingFR.senderId, (socket) => {
    socket.emit('relation:updates', {
      operation: 'rejectFR',
      user: { ...mapToPublicProfile(pendingFR.recipient) },
    });
  });
}

export async function acceptFriendRequest(me: Express.User, senderId: number) {
  await checkUserExists(senderId);
  if (me.id == senderId)
    throw new HttpError(400, 'You cannot perform this action on yourself');

  const pendingFR = await prisma.pendingFriendship.findFirst({
    where: { senderId: senderId, recipientId: me.id },
    include: { recipient: { include: { avatar: true } } },
  });
  if (!pendingFR) throw new HttpError(400, 'Friend request does not exist');

  await prisma.pendingFriendship.delete({
    where: {
      unique_user_combination: { senderId: senderId, recipientId: me.id },
    },
  });

  const { user1Id, user2Id } = normalizeId(me.id, senderId);
  await prisma.friendship.create({
    data: {
      user1: { connect: { id: user1Id } },
      user2: { connect: { id: user2Id } },
    },
  });

  forEachSocket(pendingFR.senderId, (socket) => {
    socket.emit('relation:updates', {
      operation: 'acceptFR',
      user: { ...mapToPublicProfile(pendingFR.recipient) },
    });
  });
}

export async function removeFriend(me: Express.User, friendId: number) {
  if (me.id == friendId)
    throw new HttpError(400, 'You cannot perform this action on yourself');
  await checkUserExists(friendId);

  const { user1Id, user2Id } = normalizeId(me.id, friendId);
  const friendship = await prisma.friendship.findUnique({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
    include: {
      user1: { include: { avatar: true } },
      user2: { include: { avatar: true } },
    },
  });
  if (!friendship) throw new HttpError(400, 'Friendship does not exist');

  let from = friendship.user1.id == me.id ? friendship.user2 : friendship.user1;
  let to = friendship.user1.id == me.id ? friendship.user1 : friendship.user2;

  await prisma.friendship.delete({
    where: { unique_user_combination: { user1Id: user1Id, user2Id: user2Id } },
  });

  forEachSocket(from.id, (socket) => {
    socket.emit('relation:updates', {
      operation: 'removeFriend',
      user: { ...mapToPublicProfile(to) },
    });
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

  const { user1Id, user2Id } = normalizeId(me.id, targetId);
  const friendship = await prisma.friendship.findUnique({
    where: {
      unique_user_combination: { user1Id: user1Id, user2Id: user2Id },
    },
  });
  if (friendship) {
    await prisma.friendship.delete({
      where: { id: friendship.id },
    });
  }

  const newBlockRecord = await prisma.block.create({
    data: {
      blockedBy: { connect: { id: me.id } },
      blocked: { connect: { id: targetId } },
    },
    include: {
      blocked: { include: { avatar: true } },
      blockedBy: { include: { avatar: true } },
    },
  });

  forEachSocket(newBlockRecord.blocked.id, (socket) => {
    socket.emit('relation:updates', {
      operation: 'blockUser',
      user: { ...mapToPublicProfile(newBlockRecord.blockedBy) },
    });
  });

  return newBlockRecord.blocked;
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
