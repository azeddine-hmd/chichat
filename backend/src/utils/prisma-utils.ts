import { prisma } from '../config/prisma';
import { HttpError } from './error';

export async function checkUserExists(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { id: true },
  });
  if (!user) throw new HttpError(400, 'No user with the provided ID exists');
}
