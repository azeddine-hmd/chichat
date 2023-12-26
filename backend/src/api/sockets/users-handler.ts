import { Socket } from 'socket.io';
import * as profileService from '../users/services/profile-service';
import { listenerWrapper } from '../../utils/listener-wrapper';
import { mapToPrivateProfile, mapToPublicProfile } from '../users/users-mapper';

module.exports = (io: Socket, socket: Socket) => {
  const profile = async () => {
    console.log('recieving listener for event:', 'profile');
    const profile = await profileService.getProfile(socket.user.id);

    socket.emit('profile', {
      ...mapToPrivateProfile(profile),
    });
  };

  const relation = async () => {
    console.log('recieving listener for event:', 'relation');
    const id = socket.user.id;
    const friends = await profileService.getFriendsProfile(id);
    const blocked = await profileService.getBlockedUsersProfile(id);
    const { acceptFR, sentFR } = await profileService.getPendingFRProfile(id);

    socket.emit('relation', {
      friends: friends.map((profile) => mapToPublicProfile(profile)),
      blocked: blocked.map((profile) => mapToPublicProfile(profile)),
      sentFR: sentFR.map((profile) => mapToPublicProfile(profile)),
      acceptFR: acceptFR.map((profile) => mapToPublicProfile(profile)),
    });
  };

  socket.once('profile', listenerWrapper(profile));
  socket.once('relation', listenerWrapper(relation));
};
