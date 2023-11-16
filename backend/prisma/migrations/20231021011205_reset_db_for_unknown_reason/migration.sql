/*
  Warnings:

  - The values [Online,Offline] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `operation` on the `Codes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CodeOperation" AS ENUM ('EMAIL_VALIDATION');

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('ONLINE', 'OFFLINE');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'OFFLINE';
COMMIT;

-- AlterTable
ALTER TABLE "Codes" DROP COLUMN "operation",
ADD COLUMN     "operation" "CodeOperation" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'OFFLINE';
