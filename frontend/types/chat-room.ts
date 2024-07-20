import { User } from "@/models/user";

export interface ChatRoom {
  id: string;
  type: "DIRECT" | "GROUP";
  users: User[];
}
