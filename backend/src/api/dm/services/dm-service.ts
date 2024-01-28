import * as uuid from 'uuid';
import { prisma } from '../../../config';
import { DM, DMType } from '@prisma/client';
import { UnsavedSingleDm } from '../types/unsaved-single-dm';

async function makeUnsavedSingleDm(otherId: number): Promise<UnsavedSingleDm> {
  const other = await prisma.user.findUnique({
    where: {
      id: otherId,
    },
    include: {
      avatar: true,
    },
  });

  return {
    id: uuid.v4(),
    type: 'SINGLE',
    entersAt: new Date(),
    other: other,
  };
}

export async function enterSingleDm(me: Express.User, otherId: number) {
  const dm = await prisma.dM.findFirst({
    where: {
      type: DMType.SINGLE,
      userDms: {
        every: {
          AND: [{ userId: me.id }, { userId: otherId }],
        },
      },
    },
    include: {
      userDms: { include: { user: { include: { avatar: true } } } },
    },
  });
  if (!dm) {
    return {
      firstTime: true,
      unsavedDm: await makeUnsavedSingleDm(otherId),
    };
  }
  const other = dm.userDms.find((userDm) => userDm.userId != me.id).user;
  delete dm['userDms'];
  return {
    firstTime: false,
    dm: {
      ...(dm as DM),
      other,
    },
  };
}
