ALTER TABLE "Friendship" ADD CONSTRAINT "user1Id_less_than_user2Id_check" CHECK ("user1Id" < "user2Id");
ALTER TABLE "Block" ADD CONSTRAINT "user1Id_less_than_user2Id_check" CHECK ("user1Id" < "user2Id");
