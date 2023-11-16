-- CreateTable
CREATE TABLE "UserSockets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "socketId" TEXT NOT NULL,

    CONSTRAINT "UserSockets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSockets" ADD CONSTRAINT "UserSockets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
