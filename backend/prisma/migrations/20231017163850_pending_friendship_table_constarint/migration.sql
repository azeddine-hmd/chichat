ALTER TABLE "PendingFriendship" ADD CONSTRAINT "user1Id_less_than_user2Id_check" CHECK ("user1Id" < "user2Id");
