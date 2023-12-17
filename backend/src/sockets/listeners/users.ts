import { Socket } from 'socket.io';
import { io } from '..';
import { listenerWrapper } from '../listener-wrapper';

io.on(
  'friendsPresence',
  listenerWrapper(async (socket: Socket) => {
    throw new Error('FriendsPresence');
  })
);
