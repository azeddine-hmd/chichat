/*
  Warnings:

  - You are about to drop the column `user1Id` on the `PendingFriendship` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `PendingFriendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,recieverId]` on the table `PendingFriendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recieverId` to the `PendingFriendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `PendingFriendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PendingFriendship" DROP CONSTRAINT "PendingFriendship_user1Id_fkey";

-- DropForeignKey
ALTER TABLE "PendingFriendship" DROP CONSTRAINT "PendingFriendship_user2Id_fkey";

-- AlterTable
ALTER TABLE "PendingFriendship" DROP COLUMN "user1Id",
DROP COLUMN "user2Id",
ADD COLUMN     "recieverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PendingFriendship_senderId_recieverId_key" ON "PendingFriendship"("senderId", "recieverId");

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
