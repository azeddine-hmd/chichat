-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_uploadedById_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
