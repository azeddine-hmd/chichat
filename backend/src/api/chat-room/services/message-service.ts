import { Message } from '@prisma/client';
import { prisma, redisClient } from '../../../config';
import {
  ChatRoomWithUsers,
  UnsavedChatRoomWithUsers,
} from '../types/chat-room';
import { updateChatRoomHistory } from './chat-room-service';

export async function saveMessage(
  me: Express.User,
  chatRoom: ChatRoomWithUsers | UnsavedChatRoomWithUsers,
  message: string
) {
  // remove chat room from unsaved chat rooms list
  if ('isUnsaved' in chatRoom && chatRoom.isUnsaved) {
    console.log('saving into unsaved chat room');
    const result = await redisClient.lRem(
      `chatroom:unsaved:${me.id}`,
      0,
      chatRoom.id
    );
    console.log(`removed unsaved chat room of id: ${result}`);
  }

  const messageRecord = await prisma.message.create({
    data: {
      chatRoom: { connect: { id: chatRoom.id } },
      by: { connect: { id: me.id } },
      content: message,
    },
  });

  updateChatRoomHistory(me, chatRoom);

  return messageRecord;
}

export async function getMessages(_: Express.User, chatRoomId: string) {
  const messagesRecords = await prisma.message.findMany({
    where: {
      chatRoomId: chatRoomId,
    },
    orderBy: {
      createAt: 'asc',
    },
  });
  return messagesRecords;
}

export async function deleteMessage(
  me: Express.User,
  chatRoomId: string,
  messageId: number
) {
  try {
    await prisma.message.delete({
      where: { id: messageId, chatRoomId: chatRoomId, byId: me.id },
    });
  } catch (error) {
    console.error('delete message had an error: ', error);
    return { success: false };
  }
  return { success: true };
}

export async function updateMessage(
  _: Express.User,
  chatRoomId: string,
  messageId: number,
  newContent: string
) {
  let newMessage: Message = null;
  try {
    newMessage = await prisma.message.update({
      where: { chatRoomId: chatRoomId, id: messageId },
      data: { content: newContent, isEdited: true },
    });
  } catch (error) {
    console.error('update message had an error: ', error);
    return { success: false };
  }
  return { success: true, newMessage };
}
