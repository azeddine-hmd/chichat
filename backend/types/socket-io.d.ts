import { Socket } from 'socket.io';
import { UnsavedChatRoomWithUsers } from '../src/api/chat-room/types/chat-room';

declare module 'socket.io' {
  interface Socket extends Socket {
    user: Express.User;
    unsavedSingleDms: UnsavedChatRoomWithUsers[];
    _cleanupFns: Function[];
  }
}
