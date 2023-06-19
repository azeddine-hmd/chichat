"use client";

import { BsDiscord, BsVr } from "react-icons/bs";
import Divider from "../molecules/divider";
import ServerButton, { ServerButtonType } from "../molecules/server-button";
import { useState } from "react";

export default function ServerSidebar() {
  const [servers, setServers] = useState<Array<ServerButtonType>>([]);

  return (
    <nav className="flex max-h-screen w-[4.5rem] shrink-0 flex-col items-center bg-gray-900 pt-3 text-white shadow-lg">
      <ServerButton icon={<BsDiscord size="26" />} text="Direct Messages" />
      <Divider />
      {servers.map((serverBtn) => {
        return (
          <ServerButton
            key={serverBtn.text}
            icon={serverBtn.icon}
            text={serverBtn.text}
          />
        );
      })}
    </nav>
  );
}
