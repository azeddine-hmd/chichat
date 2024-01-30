import * as uuid from 'uuid';
import { prisma, redisClient } from '../../../config';
import { DMType } from '@prisma/client';
import { SingleDm } from '../types/single-dm';

async function makeUnsavedSingleDm(id: number): Promise<SingleDm> {
  const other = await prisma.user.findUnique({
    where: {
      id: id,
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
    isUnsaved: true,
  };
}

async function getSingleDm(
  me: Express.User,
  id: number | string
): Promise<SingleDm | null> {
  let dm = null;
  if (typeof id === 'number') {
    dm = await prisma.dM.findFirst({
      where: {
        type: DMType.SINGLE,
        userDms: {
          every: {
            AND: [{ userId: me.id }, { userId: id }],
          },
        },
      },
      include: {
        userDms: { include: { user: { include: { avatar: true } } } },
      },
    });
  } else {
    dm = await prisma.dM.findFirst({
      where: {
        type: DMType.SINGLE,
        id: id,
      },
      include: {
        userDms: { include: { user: { include: { avatar: true } } } },
      },
    });
  }
  if (!dm) {
    if (typeof id === 'number') {
      const unsavedSingleDm = await makeUnsavedSingleDm(id);
      await redisClient.lPush(
        `dm:single:unsaved:${me.id}`,
        JSON.stringify(unsavedSingleDm)
      );
      return unsavedSingleDm;
    } else {
      return null;
    }
  }
  const other = dm.userDms.find((userDm) => userDm.userId != me.id).user;
  delete dm['userDms'];
  return { ...dm, other };
}

export async function getSingleDmInstanceByUserId(
  user: Express.User,
  otherId: number
) {
  const unsavedSingleDmsString = await redisClient.lRange(
    `dm:single:unsaved:${user.id}`,
    0,
    -1
  );
  const unsavedSingleDms = unsavedSingleDmsString.map(
    (unsavedSingleDmString) => {
      return JSON.parse(unsavedSingleDmString) as SingleDm;
    }
  );
  const unsavedSingleDm = unsavedSingleDms.find(
    (udm) => udm.other.id === otherId
  );
  if (unsavedSingleDm) return unsavedSingleDm;
  return await getSingleDm(user, otherId);
}

export async function getSingleDmInstanceById(user: Express.User, id: string) {
  const unsavedSingleDmsString = await redisClient.lRange(
    `dm:single:unsaved:${user.id}`,
    0,
    -1
  );
  const unsavedSingleDms = unsavedSingleDmsString.map(
    (unsavedSingleDmString) => {
      return JSON.parse(unsavedSingleDmString) as SingleDm;
    }
  );
  const unsavedSingleDm = unsavedSingleDms.find((udm) => udm.id === id);
  if (unsavedSingleDm) return unsavedSingleDm;
  return await getSingleDm(user, id);
}
