import { Server } from 'socket.io';
import { server } from '../app';
import { COOKIE_MAX_AGE_MILIS } from '../constants';
import { corsOptions, prisma } from '../config';
import { UserStatus } from '@prisma/client';

export const io = new Server(server, {
  cookie: {
    name: 'io',
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: COOKIE_MAX_AGE_MILIS,
  },
  cors: corsOptions,
});

io.on('connection', async (socket) => {
  // handling user status
  console.log(`client(id=${socket.user.id}, sid=${socket.id}) connected!`);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: socket.user.id },
      data: { status: UserStatus.ONLINE },
    }),
    prisma.userSockets.create({
      data: {
        socketId: socket.id,
        user: { connect: { id: socket.user.id } },
      },
    }),
  ]);

  socket.on('disconnect', async () => {
    console.log(`client(id=${socket.user.id}, sid=${socket.id}) disconnected!`);
    const [_, userSocketsCount] = await prisma.$transaction([
      prisma.userSockets.delete({
        where: { socketId: socket.id },
      }),
      prisma.userSockets.count({ where: { userId: socket.user.id } }),
    ]);
    if (userSocketsCount == 0) {
      await prisma.user.update({
        where: { id: socket.user.id },
        data: { status: UserStatus.OFFLINE },
      });
    }
  });
});

import './middlewares';
import './namespaces';
