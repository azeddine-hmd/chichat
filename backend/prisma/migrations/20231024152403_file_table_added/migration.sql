/*
  Warnings:

  - You are about to drop the column `recieverId` on the `PendingFriendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,recipientId]` on the table `PendingFriendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientId` to the `PendingFriendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PendingFriendship" DROP CONSTRAINT "PendingFriendship_recieverId_fkey";

-- DropIndex
DROP INDEX "PendingFriendship_senderId_recieverId_key";

-- AlterTable
ALTER TABLE "PendingFriendship" DROP COLUMN "recieverId",
ADD COLUMN     "recipientId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "fieldname" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "uploadedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingFriendship_senderId_recipientId_key" ON "PendingFriendship"("senderId", "recipientId");

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
