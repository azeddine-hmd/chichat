import { Socket } from 'socket.io';

export const listenerWrapper = (
  socket: Socket,
  handler: (...args: any[]) => Promise<void>
) => {
  return async (...args: any[]) => {
    try {
      await handler(...args);
    } catch (error) {
      console.error('Error in socket: ', error);
      if (socket && socket.connected) {
        if (error instanceof Error) socket.emit('error', error.message);
        else socket.emit('error', 'something wrong happen');
      }
    }
  };
};
