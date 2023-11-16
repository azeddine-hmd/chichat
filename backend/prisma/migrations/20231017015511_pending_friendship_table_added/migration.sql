-- CreateTable
CREATE TABLE "PendingFriendship" (
    "id" SERIAL NOT NULL,
    "sinceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user1_id" INTEGER NOT NULL,
    "user2_id" INTEGER NOT NULL,

    CONSTRAINT "PendingFriendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingFriendship_user1_id_user2_id_key" ON "PendingFriendship"("user1_id", "user2_id");

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingFriendship" ADD CONSTRAINT "PendingFriendship_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
