/*
  Warnings:

  - You are about to drop the `_BlockedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlockedUsers" DROP CONSTRAINT "_BlockedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedUsers" DROP CONSTRAINT "_BlockedUsers_B_fkey";

-- DropTable
DROP TABLE "_BlockedUsers";

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "sinceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockedId" INTEGER NOT NULL,
    "blockedById" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockedId_blockedById_key" ON "Block"("blockedId", "blockedById");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_blockedById_fkey" FOREIGN KEY ("blockedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
