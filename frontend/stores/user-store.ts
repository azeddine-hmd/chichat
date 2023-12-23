import { User } from "@/models/user";
import { create } from "zustand";

type UserStore = {
	profile: User | null
	friends: User[] | null
	blocked: User[] | null
	setProfile: (profile: User) => void
	setFriends: (friends: User[]) => void
	setBlocked: (blocked: User[]) => void
};

export const useUserStore = create<UserStore>((set) => ({
	profile: null,
	friends: null,
	blocked: null,
	setProfile: (profile) => set({ profile: profile }),
	setFriends: (friends) => set({ friends: friends }),
	setBlocked: (blocked) =>  set({ blocked: blocked }),
}));
