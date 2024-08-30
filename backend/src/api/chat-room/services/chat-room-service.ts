import * as uuid from 'uuid';
import { prisma, redisClient } from '../../../config';
import { ChatRoomType } from '@prisma/client';
import {
  ChatRoomWithUsers,
  UnsavedChatRoomWithUsers,
} from '../types/chat-room';
import { mapToPublicChatRoom, moveUserToFirstIndex } from '../chat-room-mapper';
import { forEachSocket } from '../../../utils/for-each-socket';

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

  (async () => {
    const updatedChatRoom = await getChatRoom(me, chatRoom.id);
    updateUnsavedChatRoomHistory(me, updatedChatRoom);
  })();

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

export async function getChatRoomHistory(
  me: Express.User,
  chatRoomTypes: ChatRoomType[]
) {
  const chatRoomHistoryRecords = await prisma.chatRoomHistory.findMany({
    where: {
      user: { id: me.id },
      chatRoom: { type: { in: chatRoomTypes } },
    },
    include: {
      chatRoom: {
        include: {
          usersChatRooms: { include: { user: { include: { avatar: true } } } },
        },
      },
    },
    orderBy: {
      visitedAt: 'desc',
    },
  });

  const chatRoomHistory: ChatRoomWithUsers[] = chatRoomHistoryRecords.map(
    (historyRec) => historyRec.chatRoom
  );
  return chatRoomHistory;
}

export async function updateChatRoomHistory(
  me: Express.User,
  chatRoom: ChatRoomWithUsers | UnsavedChatRoomWithUsers
) {
  const users = chatRoom.usersChatRooms.map(
    (userChatRoom) => userChatRoom.user
  );
  moveUserToFirstIndex(me.id, users);
  // users.shift();
  users.forEach((user) => {
    prisma.chatRoomHistory
      .upsert({
        where: {
          userId_chatRoomId: { userId: user.id, chatRoomId: chatRoom.id },
        },
        update: { visitedAt: new Date() },
        create: {
          chatRoom: { connect: { id: chatRoom.id } },
          visitedAt: new Date(),
          user: { connect: { id: user.id } },
        },
      })
      .catch((error) => console.error('updateChatRoomHistory: erorr:', error))
      .then(() => {
        forEachSocket(user.id, (socket) => {
          getChatRoomHistory(user, ['GROUP', 'DIRECT']).then((history) => {
            console.log(
              `updating history of other people, user(username=${socket.user.username}) and socket(id=${socket.id})`
            );
            socket.emit('chatroom:getHistory', {
              history: history.map((chatRoom) =>
                mapToPublicChatRoom(socket.user.id, chatRoom)
              ),
            });
          });
        });
      });
  });
}

export async function updateUnsavedChatRoomHistory(
  me: Express.User,
  chatRoom: ChatRoomWithUsers | UnsavedChatRoomWithUsers
) {
  try {
    const result = await prisma.chatRoomHistory.upsert({
      where: {
        userId_chatRoomId: { userId: me.id, chatRoomId: chatRoom.id },
      },
      update: { visitedAt: new Date() },
      create: {
        chatRoom: { connect: { id: chatRoom.id } },
        visitedAt: new Date(),
        user: { connect: { id: me.id } },
      },
    });
    forEachSocket(me.id, (socket) => {
      getChatRoomHistory(me, ['GROUP', 'DIRECT']).then((history) => {
        console.log('result upsert is:', result);
        console.log('chatRoom:', chatRoom);
        console.log('history is:', JSON.stringify(history.map((h) => h.id)));
        console.log(
          `updating history of other people, user(username=${socket.user.username}) and socket(id=${socket.id})`
        );
        socket.emit('chatroom:getHistory', {
          history: history.map((chatRoom) =>
            mapToPublicChatRoom(socket.user.id, chatRoom)
          ),
        });
      });
    });
  } catch (error) {
    console.error('updateChatRoomHistory: erorr:', error);
  }
}
