/*
  Warnings:

  - The primary key for the `UserSockets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserSockets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSockets" DROP CONSTRAINT "UserSockets_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserSockets_pkey" PRIMARY KEY ("socketId");
