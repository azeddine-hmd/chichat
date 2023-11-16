ALTER TABLE "Block"
ADD CONSTRAINT user1_id_less_than_user2_id_check
CHECK (user1_id < user2_id);
