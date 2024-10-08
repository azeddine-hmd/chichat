import { UserWithAvatar } from './types/user';

export function mapToPrivateProfile(user: UserWithAvatar) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    dateOfBirth: user.dateOfBirth,
    status: user.status.toLowerCase(),
    avatar: user?.avatar.url || '',
  };
}

export function mapToPublicProfile(user: UserWithAvatar) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    status: user.status.toLowerCase(),
    avatar: user?.avatar.url || '',
  };
}
