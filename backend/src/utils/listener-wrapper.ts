import { Socket } from 'socket.io';

export const listenerWrapper = (handler: (socket: Socket) => Promise<void>) => {
  return (socket: Socket) => {
    handler(socket).catch((error) => {
      console.error('Error in socket: ', error);
      if (error instanceof Error) socket.emit('error', error.message);
      else socket.emit('error', 'something wrong happen');
    });
  };
};
