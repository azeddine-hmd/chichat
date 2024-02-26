import { MessageContentType } from '@prisma/client';

export type MessageContent = {
  type: MessageContentType;
  content: string | Express.Multer.File;
};
