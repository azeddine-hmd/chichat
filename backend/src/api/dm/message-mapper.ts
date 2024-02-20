import { Message } from '@prisma/client';

type MessageMapper = {
  id: number;
  renderType: 'short' | 'normal';
  content: /*TODO */
};

export function mapToMessage(message: Message) {
  return {
    id: message.id,
  };
}
