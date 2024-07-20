import { File, User, UserSockets } from '@prisma/client';

export type UserWithAvatar = User & {
  avatar?: File;
  sockets?: UserSockets[];
};
