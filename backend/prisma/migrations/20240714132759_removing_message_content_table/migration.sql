/*
  Warnings:

  - You are about to drop the `MessageContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dmId_fkey";

-- DropForeignKey
ALTER TABLE "MessageContent" DROP CONSTRAINT "MessageContent_fileId_fkey";

-- DropForeignKey
ALTER TABLE "MessageContent" DROP CONSTRAINT "MessageContent_messageId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "content" TEXT NOT NULL;

-- DropTable
DROP TABLE "MessageContent";

-- DropEnum
DROP TYPE "MessageContentType";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dmId_fkey" FOREIGN KEY ("dmId") REFERENCES "DM"("id") ON DELETE CASCADE ON UPDATE CASCADE;
