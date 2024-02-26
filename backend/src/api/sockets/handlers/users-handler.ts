import { Socket } from 'socket.io';
import * as profileService from '../../users/services/profile-service';
import { listenerWrapper } from '../../../utils/listener-wrapper';
import {
  mapToPrivateProfile,
  mapToPublicProfile,
} from '../../users/users-mapper';

module.exports = (io: Socket, socket: Socket) => {
  const profile = async () => {
    console.log(
      `receiving emit from client(${socket.user.username}) of event: profile`
    );
    const profile = await profileService.getProfile(socket.user.id);

    console.log(
      `emitting to client(${socket.user.username}) of event: profile`
    );
    socket.emit('profile', {
      ...mapToPrivateProfile(profile),
    });
  };

  const relation = async () => {
    console.log(
      `receiving emit from client(${socket.user.username}) of event: relation`
    );
    const id = socket.user.id;
    const friends = await profileService.getFriendsProfile(id);
    friends.forEach((friend) => {
      socket.join('profile:' + friend.id);
    });
    const blocked = await profileService.getBlockedUsersProfile(id);
    const { acceptFR, sentFR } = await profileService.getPendingFRProfile(id);

    console.log(
      `emitting to client(${socket.user.username}) of event: relation`
    );
    socket.emit('relation', {
      friends: friends.map((profile) => mapToPublicProfile(profile)),
      blocked: blocked.map((profile) => mapToPublicProfile(profile)),
      sentFR: sentFR.map((profile) => mapToPublicProfile(profile)),
      acceptFR: acceptFR.map((profile) => mapToPublicProfile(profile)),
    });
  };

  socket.on('profile', listenerWrapper(socket, profile));
  socket.on('relation', listenerWrapper(socket, relation));
};
