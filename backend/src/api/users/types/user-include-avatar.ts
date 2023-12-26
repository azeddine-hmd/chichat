import { File, User, UserSockets } from '@prisma/client';

export type UserIncludeRelations = User & {
  avatar?: File;
  sockets?: UserSockets[];
};
