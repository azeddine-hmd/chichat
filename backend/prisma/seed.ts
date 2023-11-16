import { PrismaClient, UserStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function fakeUsers() {
  await prisma.user.createMany({
    data: [
      {
        username: "test1",
        email: "test1@test.com",
        displayName: "test1",
        active: true,
        status: UserStatus.OFFLINE,
        password: "$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy",
        dateOfBirth: new Date(),
      },
      {
        username: "test2",
        email: "test2@test.com",
        displayName: "test2",
        active: true,
        status: UserStatus.OFFLINE,
        password: "$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy",
        dateOfBirth: new Date(),
      },
      {
        username: "test3",
        email: "test3@test.com",
        displayName: "test3",
        active: true,
        status: UserStatus.OFFLINE,
        password: "$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy",
        dateOfBirth: new Date(),
      },
      {
        username: "test4",
        email: "test4@test.com",
        displayName: "test4",
        active: true,
        status: UserStatus.OFFLINE,
        password: "$2b$10$dQSMKR7ywUMr0/WNz8EFoOQ8VTUwuGAvsBgijQyYtPgLOMyiyGTRy",
        dateOfBirth: new Date(),
      },
    ]
  })
}

async function main() {
  await fakeUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

