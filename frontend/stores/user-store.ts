import { User } from "@/models/user";
import { create } from "zustand";
import zukeeper from 'zukeeper';

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

export const useUserStore = create<UserStore>(zukeeper((set: any) => ({
  profile: null,
  friends: [],
  blocked: [],
  pendingFR: [],
  setProfile: (profile: User) => set({ profile: profile }),
  setFriends: (friends: User[]) => set({ friends: friends }),
  setBlocked: (blocked: User[]) => set({ blocked: blocked }),
  setPendingFR: (pendingFR: User[]) => set({ pendingFR: pendingFR }),
})));
