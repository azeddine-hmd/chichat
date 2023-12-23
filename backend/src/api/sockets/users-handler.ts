import { Socket } from 'socket.io';
import * as profileService from '../users/services/profile-service';
import { listenerWrapper } from '../../utils/listener-wrapper';

module.exports = (io: Socket, socket: Socket) => {
  const profile = async () => {
    console.log('recieving listener for event:', 'profile');
    const { profile, avatar } = await profileService.getProfile(socket.user.id);
    socket.emit('profile', {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      avatar: avatar.url,
      status: profile.status.toLowerCase(),
    });
  };

  const relation = async () => {
    console.log('recieving listener for event:', 'relation');
    const blockedUsersprofile = await profileService.getBlockedUsersProfile(
      socket.user.id
    );
    const friendsProfile = await profileService.getFriendsProfile(
      socket.user.id
    );
    socket.emit('relation', {
      friends: friendsProfile,
      blocked: blockedUsersprofile,
    });
  };

  socket.once('profile', listenerWrapper(profile));
  socket.once('relation', listenerWrapper(relation));
};
