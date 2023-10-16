import DisabledSearchField from "@/components/molecules/disabled-search-field";
import UserSection from "@/components/molecules/user-section";
import React, { ReactNode } from "react";
import Hr from "../atoms/hr";

export default function ChannelSidebar({ children }: { children: ReactNode }) {
  return (
    <nav className="flex h-full w-[240px] shrink-0 grow-0 flex-col bg-gray-700 shadow-lg">
      <DisabledSearchField />
      <Hr className="w-full border-separator-dark"></Hr>
      <div className="ml-2 mr-2 mt-2 h-full overflow-y-scroll">
        {children}
      </div>
      <UserSection />
    </nav>
  );
}
