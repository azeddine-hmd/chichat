import * as uuid from 'uuid';
import { prisma, redisClient } from '../../../config';
import { DMType } from '@prisma/client';
import { SingleDm } from '../types/single-dm';

async function makeSingleDm(
  me: Express.User,
  otherId: number
): Promise<SingleDm> {
  const dmId = uuid.v4();
  const [dm, _, otherUserDm] = await prisma.$transaction([
    prisma.dM.create({
      data: {
        id: dmId,
        type: DMType.SINGLE,
        entersAt: new Date(),
      },
    }),
    prisma.userDm.create({
      data: {
        dm: { connect: { id: dmId } },
        user: { connect: { id: me.id } },
      },
    }),
    prisma.userDm.create({
      data: {
        dm: { connect: { id: dmId } },
        user: { connect: { id: otherId } },
      },
      include: { user: { include: { avatar: true } } },
    }),
  ]);

  await redisClient.lPush(`dm:single:unsaved:${me.id}`, dm.id);

  return {
    ...dm,
    other: otherUserDm.user,
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
  // check if dm in cache
  const pos = await redisClient.lPos(`dm:single:unsaved:${me.id}`, dm.id);
  return { ...dm, other, isUnsaved: pos != null };
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
