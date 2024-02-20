-- DropForeignKey
ALTER TABLE "MessageContent" DROP CONSTRAINT "MessageContent_messageId_fkey";

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
