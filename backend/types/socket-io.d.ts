import { Socket } from 'socket.io';
import { SingleDM } from '../src/api/dm/types/single-dm';

declare module 'socket.io' {
  interface Socket extends Socket {
    user: Express.User;
    unsavedSingleDms: SingleDM[];
    _cleanupFns: Function[];
  }
}
