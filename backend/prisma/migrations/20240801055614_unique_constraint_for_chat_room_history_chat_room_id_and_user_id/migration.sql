/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatRoomId]` on the table `ChatRoomHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatRoomHistory_userId_chatRoomId_key" ON "ChatRoomHistory"("userId", "chatRoomId");
