import { Socket } from 'socket.io';

export const listenerWrapper = (handler: (socket: Socket) => Promise<void>) => {
  return async (socket: Socket) => {
    try {
      await handler(socket);
    } catch (error) {
      console.error('Error in socket: ', error);
      if (socket && socket.connected) {
        if (error instanceof Error) socket.emit('error', error.message);
        else socket.emit('error', 'something wrong happen');
      }
    }
  };
};
