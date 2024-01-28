import { mapToPublicProfile } from '../users/users-mapper';
import { SingleDm } from './types/single-dm';
import { UnsavedSingleDm } from './types/unsaved-single-dm';

export function mapToPublicDm(dm: UnsavedSingleDm | SingleDm) {
  return {
    id: dm.id,
    type: dm.type,
    other: mapToPublicProfile(dm.other),
  };
}
