-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "user1_id" INTEGER NOT NULL,
    "user2_id" INTEGER NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Block_user1_id_user2_id_key" ON "Block"("user1_id", "user2_id");

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
