import { DM } from '@prisma/client';
import { UserIncludeRelations } from '../../users/types/user-include-avatar';

export type SingleDm = Omit<DM, 'createdAt'> & {
  isUnsaved: boolean;
  other: UserIncludeRelations;
};
