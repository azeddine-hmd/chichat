import { Server, Socket } from 'socket.io';
import { prisma } from '../config';

export async function forEachSocket(
  id: number | string,
  onEachSocket: (socket: Socket) => void
) {
  const io: Server = require('../api/sockets/socket').io;
  if (typeof id === 'number') {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { sockets: true },
    });
    user.sockets?.forEach((userSocket) => {
      const socket = io.sockets.sockets.get(userSocket.socketId);
      onEachSocket(socket);
    });
  } else if (typeof id === 'string') {
    const user = await prisma.user.findUnique({
      where: { username: id },
      include: { sockets: true },
    });
    user.sockets?.forEach((userSocket) => {
      const socket = io.sockets.sockets.get(userSocket.socketId);
      onEachSocket(socket);
    });
  }
}
