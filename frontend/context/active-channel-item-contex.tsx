"use client";

import type { ChatRoom } from "@/types/chat-room";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type ActiveChannelItemContextType = {
  item: ChannelItem;
  setItem: Dispatch<SetStateAction<ChannelItem>>;
};

const ActiveChannelItemContext =
  createContext<ActiveChannelItemContextType | null>(null);

export type ChannelItem = "friends" | ChatRoom;

export default function ActiveChannelItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [item, setItem] = useState<ChannelItem>("friends");

  return (
    <ActiveChannelItemContext.Provider value={{ item, setItem }}>
      {children}
    </ActiveChannelItemContext.Provider>
  );
}

export function useActiveChannelItemContext(item?: ChannelItem) {
  const ctx = useContext(ActiveChannelItemContext);
  if (item) ctx?.setItem(item);

  if (!ctx) {
    throw new Error(
      "useActiveChannelItemContext must be used within an ActiveChannelItemContextProvider"
    );
  }

  return ctx;
}
