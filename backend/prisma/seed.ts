import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function fakeUsers() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        username: 'test1',
        email: 'test1@test.com',
        displayName: 'test1',
        active: true,
        status: UserStatus.OFFLINE,
        password:
          '$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy',
        dateOfBirth: new Date(),
      },
      {
        id: 2,
        username: 'test2',
        email: 'test2@test.com',
        displayName: 'test2',
        active: true,
        status: UserStatus.OFFLINE,
        password:
          '$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy',
        dateOfBirth: new Date(),
      },
      {
        id: 3,
        username: 'test3',
        email: 'test3@test.com',
        displayName: 'test3',
        active: true,
        status: UserStatus.OFFLINE,
        password:
          '$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy',
        dateOfBirth: new Date(),
      },
      {
        id: 4,
        username: 'test4',
        email: 'test4@test.com',
        displayName: 'test4',
        active: true,
        status: UserStatus.OFFLINE,
        password:
          '$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy',
        dateOfBirth: new Date(),
      },
    ],
  });
  await prisma.file.create({
    data: {
      filename: 'test1-avatar',
      fieldname: 'avatar',
      filePath: 'wefwefA',
      url: 'https://i.pravatar.cc/150?img=1',
      mimeType: 'image/jpg',
      fileSize: 5000,
      uploadedBy: { connect: { username: 'test1' } },
    },
  });
  await prisma.file.create({
    data: {
      filename: 'test2-avatar',
      fieldname: 'avatar',
      filePath: 'wefwefA',
      url: 'https://i.pravatar.cc/150?img=2',
      mimeType: 'image/jpg',
      fileSize: 5000,
      uploadedBy: { connect: { username: 'test2' } },
    },
  });
  await prisma.file.create({
    data: {
      filename: 'test3-avatar',
      fieldname: 'avatar',
      filePath: 'wefwefA',
      url: 'https://i.pravatar.cc/150?img=3',
      mimeType: 'image/jpg',
      fileSize: 5000,
      uploadedBy: { connect: { username: 'test3' } },
    },
  });
  await prisma.file.create({
    data: {
      filename: 'test4-avatar',
      fieldname: 'avatar',
      filePath: 'wefwefA',
      url: 'https://i.pravatar.cc/150?img=4',
      mimeType: 'image/jpg',
      fileSize: 5000,
      uploadedBy: { connect: { username: 'test4' } },
    },
  });
}

async function main() {
  await fakeUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
