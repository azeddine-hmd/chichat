import { prisma } from '../config/prisma';
import { HttpError } from './error';

export async function checkUserExists(id: number | string) {
  if (typeof id === 'string') {
    const user = await prisma.user.findUnique({
      where: { username: id },
      include: { avatar: true },
    });
    if (!user)
      throw new HttpError(400, 'No user with the provided Username exists');
    return user;
  } else {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { avatar: true },
    });
    if (!user) throw new HttpError(400, 'No user with the provided ID exists');
    return user;
  }
}
