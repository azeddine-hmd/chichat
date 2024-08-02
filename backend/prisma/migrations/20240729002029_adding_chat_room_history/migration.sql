-- CreateTable
CREATE TABLE "ChatRoomHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoomHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatRoomHistory_visitedAt_idx" ON "ChatRoomHistory"("visitedAt");

-- AddForeignKey
ALTER TABLE "ChatRoomHistory" ADD CONSTRAINT "ChatRoomHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomHistory" ADD CONSTRAINT "ChatRoomHistory_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
