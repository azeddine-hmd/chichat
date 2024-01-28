/*
  Warnings:

  - Added the required column `entersAt` to the `DM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DM" ADD COLUMN     "entersAt" TIMESTAMP(3) NOT NULL;
