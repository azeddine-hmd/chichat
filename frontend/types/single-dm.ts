import { User } from "@/models/user";

export interface SingleDm {
  type: "SINGLE";
  id: string;
  other: User;
}
