import * as uuid from 'uuid';
import { prisma, redisClient } from '../../../config';
import { ChatRoomType } from '@prisma/client';
import { UnsavedChatRoomWithUsers } from '../types/chat-room';

async function makeDirectChatRoom(
  me: Express.User,
  otherId: number
): Promise<UnsavedChatRoomWithUsers> {
  const chatRoomId = uuid.v4();
  const [chatRoom, myUserChatRoom, otherUserChatRoom] =
    await prisma.$transaction([
      prisma.chatRoom.create({
        data: {
          id: chatRoomId,
          type: ChatRoomType.DIRECT,
          entersAt: new Date(),
        },
      }),
      prisma.userChatRoom.create({
        data: {
          chatRoom: { connect: { id: chatRoomId } },
          user: { connect: { id: me.id } },
        },
        include: { user: { include: { avatar: true } } },
      }),
      prisma.userChatRoom.create({
        data: {
          chatRoom: { connect: { id: chatRoomId } },
          user: { connect: { id: otherId } },
        },
        include: { user: { include: { avatar: true } } },
      }),
    ]);

  await redisClient.lPush(`chatroom:unsaved:${me.id}`, chatRoom.id);

  return {
    ...chatRoom,
    usersChatRooms: [myUserChatRoom, otherUserChatRoom],
    isUnsaved: true,
  };
}

export async function getChatRoom(
  me: Express.User,
  id: number | string
): Promise<UnsavedChatRoomWithUsers | null> {
  const chatRoom = await prisma.chatRoom.findFirst({
    where:
      typeof id === 'number'
        ? {
            type: ChatRoomType.DIRECT,
            usersChatRooms: {
              every: {
                OR: [{ userId: me.id }, { userId: id }],
              },
            },
          }
        : {
            id: id,
          },
    include: {
      usersChatRooms: { include: { user: { include: { avatar: true } } } },
    },
  });

  if (!chatRoom && typeof id === 'number') {
    return await makeDirectChatRoom(me, id);
  } else if (!chatRoom) {
    return null;
  }

  // check if chatroom in cache
  const pos = await redisClient.lPos(`chatroom:unsaved:${me.id}`, chatRoom.id);

  return { ...chatRoom, isUnsaved: pos != null };
}

export async function removeUnsavedChatRoom(me: Express.User) {
  const unsavedChatRoomIds = await redisClient.lRange(
    `chatroom:unsaved:${me.id}`,
    0,
    -1
  );
  await prisma.chatRoom.deleteMany({
    where: {
      id: { in: unsavedChatRoomIds },
    },
  });
  await redisClient.del(`chatroom:unsaved:${me.id}`);
}
