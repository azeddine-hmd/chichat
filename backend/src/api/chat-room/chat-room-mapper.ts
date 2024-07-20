import { UserWithAvatar } from '../users/types/user';
import { mapToPublicProfile } from '../users/users-mapper';
import { ChatRoomWithUsers, UnsavedChatRoomWithUsers } from './types/chat-room';

function moveUserToFirstIndex(
  myId: number,
  users: UserWithAvatar[]
): UserWithAvatar[] {
  const userIndex = users.findIndex((user) => user.id == myId);
  if (userIndex == -1) {
    throw new Error(
      'user not found when moving current user to first index in chat room mapper'
    );
  }
  const [user] = users.splice(userIndex, 1);
  users.unshift(user);

  return users;
}

export function mapToPublicChatRoom(
  myId: number,
  chatRoom: ChatRoomWithUsers | UnsavedChatRoomWithUsers
) {
  const users: UserWithAvatar[] = chatRoom.usersChatRooms.map(
    (userChatRoom) => userChatRoom.user
  );
  moveUserToFirstIndex(myId, users);

  return {
    id: chatRoom.id,
    type: chatRoom.type,
    users: users.map((user) => mapToPublicProfile(user)),
  };
}
