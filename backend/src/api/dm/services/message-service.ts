import { Message } from '@prisma/client';
import { prisma, redisClient } from '../../../config';
import { SingleDm } from '../types/single-dm';

export async function saveSingleMessage(
  me: Express.User,
  dm: SingleDm,
  message: string
) {
  // remove dm from unsaved dms list
  if (dm.isUnsaved) {
    console.log('saving into unsaved single dm');
    const result = await redisClient.lRem(
      `dm:single:unsaved:${me.id}`,
      0,
      dm.id
    );
    console.log(`removed unsaved DM of id: ${result}`);
  }

  const messageRecord = await prisma.message.create({
    data: {
      dm: { connect: { id: dm.id } },
      by: { connect: { id: me.id } },
      content: message,
    },
  });
  return messageRecord;
}

export async function getMessages(_: Express.User, dmId: string) {
  const messagesRecords = await prisma.message.findMany({
    where: {
      dmId: dmId,
    },
  });
  return messagesRecords;
}

export async function deleteMessage(
  me: Express.User,
  dmId: string,
  messageId: number
) {
  try {
    await prisma.message.delete({
      where: { id: messageId, dmId: dmId, byId: me.id },
    });
  } catch (error) {
    console.error('delete message had an error: ', error);
    return { success: false };
  }
  return { success: true };
}

export async function updateMessage(
  _: Express.User,
  dmId: string,
  messageId: number,
  newContent: string
) {
  let newMessage: Message = null;
  try {
    newMessage = await prisma.message.update({
      where: { dmId: dmId, id: messageId },
      data: { content: newContent, isEdited: true },
    });
  } catch (error) {
    console.error('update message had an error: ', error);
    return { success: false };
  }
  return { success: true, newMessage };
}
