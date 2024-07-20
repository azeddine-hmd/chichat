import { Message } from '@prisma/client';
import { MessagePublic } from './types/message-public';

export function mapToMessage(message: Message): MessagePublic {
  return {
    id: message.id,
    content: message.content,
    createAt: message.createAt.toISOString(),
    byId: message.byId,
    isEdited: message.isEdited,
  };
}
