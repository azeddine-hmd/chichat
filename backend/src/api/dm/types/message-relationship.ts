import { Message, MessageContent, File } from '@prisma/client';

export type MessageFull = Message & {
  messageContent: MessageContentFull;
};

export type MessageContentFull = MessageContent & {
  contentFile?: File | null;
};
