"use client";

import DisabledSearchField from "@/components/molecules/disabled-search-field";
import UserSection from "@/components/molecules/user-section";
import React, { ReactNode, useEffect } from "react";
import Hr from "../atoms/hr";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { useEvent } from "@/hooks/use-event";

export default function ChannelSidebar({ children }: { children: ReactNode }) {
  const { profile, setProfile } = useUserStore();

  useEffect(() => {
    if (profile) return;
    window.clientSocket.emit("profile");
    // eslint-disable-next-line
  }, [profile]);

  useEvent("profile", (...args) => {
    const profile: User = args[0];
    setProfile(profile);
  });

  return (
    <nav className="flex h-full w-[240px] shrink-0 grow-0 flex-col bg-gray-700 shadow-lg">
      <DisabledSearchField />
      <Hr className="w-full border-separator-dark"></Hr>
      <div className="ml-2 mr-2 mt-2 h-full">{children}</div>
      {profile && <UserSection user={profile} />}
    </nav>
  );
}
