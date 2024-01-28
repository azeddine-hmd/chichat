import { DM } from '@prisma/client';
import { UserIncludeRelations } from '../../users/types/user-include-avatar';

export type UnsavedSingleDm = Omit<DM, 'createdAt'> & {
  other: UserIncludeRelations;
};
