import { MessageContentType } from '@prisma/client';
import { prisma, redisClient } from '../../../config';
import { SingleDm } from '../types/single-dm';
import { MessageFull } from '../types/message-relationship';

export async function saveSingleMessage(
  me: Express.User,
  dm: SingleDm,
  message: string
): Promise<MessageFull> {
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
    },
  });
  const messageContent = await prisma.messageContent.create({
    data: {
      message: { connect: { id: messageRecord.id } },
      type: MessageContentType.TEXT,
      contentText: message,
    },
    include: { contentFile: true },
  });
  return {
    ...messageRecord,
    messageContent: messageContent,
  } as MessageFull;
}

export async function getMessages(_: Express.User, dmId: string) {
  const messagesRecords = await prisma.message.findMany({
    where: {
      dmId: dmId,
    },
    include: { messageContent: { include: { contentFile: true } } },
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
    return { success: false };
  }
  return { success: true };
}
