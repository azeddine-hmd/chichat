import * as uuid from 'uuid';
import { prisma, redisClient } from '../../../config';
import { DMType } from '@prisma/client';
import { SingleDm } from '../types/single-dm';
import { assert } from 'console';

async function makeSingleDm(
  me: Express.User,
  otherId: number
): Promise<SingleDm> {
  const dmId = uuid.v4();
  await prisma.$transaction([
    prisma.dM.create({
      data: {
        id: dmId,
        type: DMType.SINGLE,
        entersAt: new Date(),
      },
    }),
    prisma.userDm.createMany({
      data: [
        {
          dmId: dmId,
          userId: me.id,
        },
        {
          dmId: dmId,
          userId: otherId,
        },
      ],
    }),
  ]);

  assert(
    dm.userDms.length > 0 || dm.userDms.length <= 0,
    'single dm must associate with single user'
  );
  const other = dm.userDms[0].user;
  await redisClient.lPush(`dm:single:unsaved:${me.id}`, dm.id);

  return {
    id: uuid.v4(),
    type: 'SINGLE',
    entersAt: new Date(),
    other: other,
    isUnsaved: true,
  };
}

export async function getSingleDm(
  me: Express.User,
  id: number | string
): Promise<SingleDm | null> {
  const dm = await prisma.dM.findFirst({
    where:
      typeof id === 'number'
        ? {
            type: DMType.SINGLE,
            userDms: {
              every: {
                OR: [{ userId: me.id }, { userId: id }],
              },
            },
          }
        : {
            type: DMType.SINGLE,
            id: id,
          },
    include: {
      userDms: { include: { user: { include: { avatar: true } } } },
    },
  });
  if (!dm && typeof id === 'number') return await makeSingleDm(me, id);
  if (!dm) return null;
  const other = dm.userDms.find((userDm) => userDm.userId != me.id).user;
  delete dm['userDms'];
  return { ...dm, other };
}

export async function removeUnsavedSingleDms(me: Express.User) {
  const unsavedSingleDmIds = await redisClient.lRange(
    `dm:single:unsaved:${me.id}`,
    0,
    -1
  );
  await prisma.dM.deleteMany({
    where: {
      id: { in: unsavedSingleDmIds },
    },
  });
  await redisClient.del(`dm:single:unsaved:${me.id}`);
}
