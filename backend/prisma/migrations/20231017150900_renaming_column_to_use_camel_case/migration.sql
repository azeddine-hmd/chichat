/*
  Warnings:

  - You are about to drop the column `user1_id` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `user2_id` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `user1_id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user2_id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user1_id` on the `PendingFriendship` table. All the data in the column will be lost.
  - You are about to drop the column `user2_id` on the `PendingFriendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Block` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `PendingFriendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1Id` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1Id` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1Id` to the `PendingFriendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `PendingFriendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_user2_id_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_user2_id_fkey";

-- DropForeignKey
ALTER TABLE "PendingFriendship" DROP CONSTRAINT "PendingFriendship_user1_id_fkey";

-- DropForeignKey
ALTER TABLE "PendingFriendship" DROP CONSTRAINT "PendingFriendship_user2_id_fkey";

-- DropIndex
DROP INDEX "Block_user1_id_user2_id_key";

-- DropIndex
DROP INDEX "Friendship_user1_id_user2_id_key";

-- DropIndex
DROP INDEX "PendingFriendship_user1_id_user2_id_key";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "user1_id",
DROP COLUMN "user2_id",
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "user1_id",
DROP COLUMN "user2_id",
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PendingFriendship" DROP COLUMN "user1_id",
DROP COLUMN "user2_id",
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Block_user1Id_user2Id_key" ON "Block"("user1Id", "user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_user1Id_user2Id_key" ON "Friendship"("user1Id", "user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "PendingFriendship_user1Id_user2Id_key" ON "PendingFriendship"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
