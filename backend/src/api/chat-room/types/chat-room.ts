import { ChatRoom, UserChatRoom } from '@prisma/client';
import { UserWithAvatar } from '../../users/types/user';

export type UnsavedChatRoomWithUsers = Omit<ChatRoomWithUsers, 'createdAt'> & {
  isUnsaved: boolean;
};

export type ChatRoomWithUsers = ChatRoom & {
  usersChatRooms: UserChatRoomWithUser[];
};

export type UserChatRoomWithUser = UserChatRoom & {
  user: UserWithAvatar;
};
