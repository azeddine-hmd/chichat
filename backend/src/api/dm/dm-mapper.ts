import { mapToPublicProfile } from '../users/users-mapper';
import { SingleDm } from './types/single-dm';

export function mapToPublicDm(singleDm: SingleDm) {
  return {
    id: singleDm.id,
    type: singleDm.type,
    other: mapToPublicProfile(singleDm.other),
  };
}
