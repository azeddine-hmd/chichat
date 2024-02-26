import { MessageContentType } from '@prisma/client';
import { prisma, redisClient } from '../../../config';
import { SingleDm } from '../types/single-dm';

export async function saveSingleTextMessage(
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
    },
  });
  const messageContent = await prisma.messageContent.create({
    data: {
      message: { connect: { id: messageRecord.id } },
      type: MessageContentType.TEXT,
      contentText: message,
    },
  });
  return {
    message: messageRecord,
    messageContent: messageContent,
  };
}

export async function getMessages(_: Express.User, dmId: string) {
  const result = await prisma.message.findMany({
    where: {
      dmId: dmId,
    },
    include: { messageContent: true },
  });
  return result;
}
