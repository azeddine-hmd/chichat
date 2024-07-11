import { MessageContentType } from '@prisma/client';
import { MessagePublic } from './types/message-public';
import { MessageFull } from './types/message-relationship';

export function mapToMessage(message: MessageFull): MessagePublic {
  return {
    id: message.id,
    content:
      message.messageContent.type.toString() ===
      MessageContentType.IMAGE.toString()
        ? message.messageContent.contentFile.url
        : message.messageContent.contentText,
    createdAt: message.createAt.toISOString(),
    isImage: message.messageContent.contentFile != null,
    byId: message.byId,
  };
}
