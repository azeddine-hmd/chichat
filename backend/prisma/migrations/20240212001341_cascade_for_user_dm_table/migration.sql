-- DropForeignKey
ALTER TABLE "UserDm" DROP CONSTRAINT "UserDm_dmId_fkey";

-- DropForeignKey
ALTER TABLE "UserDm" DROP CONSTRAINT "UserDm_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserDm" ADD CONSTRAINT "UserDm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDm" ADD CONSTRAINT "UserDm_dmId_fkey" FOREIGN KEY ("dmId") REFERENCES "DM"("id") ON DELETE CASCADE ON UPDATE CASCADE;
