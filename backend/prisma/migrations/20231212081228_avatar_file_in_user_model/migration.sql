/*
  Warnings:

  - A unique constraint covering the columns `[uploadedById]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_uploadedById_key" ON "File"("uploadedById");
