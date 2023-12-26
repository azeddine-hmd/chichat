import { User } from "@/models/user";
import { create } from "zustand";

type UserStore = {
  profile: User | null;
  friends: User[];
  blocked: User[];
  pendingFR: User[];
  setProfile: (profile: User) => void;
  setFriends: (friends: User[]) => void;
  setBlocked: (blocked: User[]) => void;
  setPendingFR: (pendingFR: User[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  friends: [],
  blocked: [],
  pendingFR: [],
  setProfile: (profile) => set({ profile: profile }),
  setFriends: (friends) => set({ friends: friends }),
  setBlocked: (blocked) => set({ blocked: blocked }),
  setPendingFR: (pendingFR) => set({ pendingFR: pendingFR }),
}));
