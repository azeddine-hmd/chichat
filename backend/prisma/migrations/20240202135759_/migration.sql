/*
  Warnings:

  - Added the required column `messageContentId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageContentType" AS ENUM ('TEXT', 'IMAGE');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageContentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MessageContent" (
    "id" SERIAL NOT NULL,
    "type" "MessageContentType" NOT NULL,
    "contentText" TEXT,
    "fileId" INTEGER,

    CONSTRAINT "MessageContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_messageContentId_fkey" FOREIGN KEY ("messageContentId") REFERENCES "MessageContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
