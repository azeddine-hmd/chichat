-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dmId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "dmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dmId_fkey" FOREIGN KEY ("dmId") REFERENCES "DM"("id") ON DELETE SET NULL ON UPDATE CASCADE;
