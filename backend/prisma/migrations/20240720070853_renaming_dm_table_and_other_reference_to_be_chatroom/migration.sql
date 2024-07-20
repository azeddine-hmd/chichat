/*
  Warnings:

  - You are about to drop the column `dmId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `DM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDm` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChatRoomType" AS ENUM ('DIRECT', 'GROUP');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dmId_fkey";

-- DropForeignKey
ALTER TABLE "UserDm" DROP CONSTRAINT "UserDm_dmId_fkey";

-- DropForeignKey
ALTER TABLE "UserDm" DROP CONSTRAINT "UserDm_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "dmId",
ADD COLUMN     "chatRoomId" TEXT;

-- DropTable
DROP TABLE "DM";

-- DropTable
DROP TABLE "UserDm";

-- DropEnum
DROP TYPE "DMType";

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entersAt" TIMESTAMP(3) NOT NULL,
    "type" "ChatRoomType" NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChatRoom" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatRoomId" TEXT NOT NULL,

    CONSTRAINT "UserChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserChatRoom_userId_chatRoomId_key" ON "UserChatRoom"("userId", "chatRoomId");

-- AddForeignKey
ALTER TABLE "UserChatRoom" ADD CONSTRAINT "UserChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChatRoom" ADD CONSTRAINT "UserChatRoom_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
