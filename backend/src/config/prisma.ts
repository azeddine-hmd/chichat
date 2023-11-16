import { PrismaClient } from '@prisma/client';

const createPrisma = () => {
  if (process.env.NODE_ENV === 'test') {
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL,
        },
      },
    });
  }
  return new PrismaClient();
};

export const prisma = createPrisma();
