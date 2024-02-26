/*
  Warnings:

  - You are about to drop the column `messageContentId` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId]` on the table `MessageContent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `MessageContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_messageContentId_fkey";

-- DropForeignKey
ALTER TABLE "MessageContent" DROP CONSTRAINT "MessageContent_fileId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageContentId";

-- AlterTable
ALTER TABLE "MessageContent" ADD COLUMN     "messageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MessageContent_messageId_key" ON "MessageContent"("messageId");

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
