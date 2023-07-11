"use client";

import { BsDiscord, BsRobot, BsTv, BsVr } from "react-icons/bs";
import Divider from "../molecules/divider";
import ServerButton from "../molecules/server-button";
import { useState } from "react";
import { Server } from "@/types/server";

export default function ServerSidebar() {
  const [servers, setServers] = useState<Array<Server>>([
    new Server({ id: 1, name: "Runic Games", icon: <BsRobot /> }),
    new Server({ id: 2, name: "GuildWars2", icon: <BsTv /> }),
  ]);
  const [selectedServer, setSelectedServer] = useState(-1);

  return (
    <nav className="flex h-full w-[4.5rem] shrink-0 grow-0 flex-col items-center bg-gray-900 pt-3 text-white shadow-lg ">
      <ServerButton icon={<BsDiscord size="26" />} text="Direct Messages" selected={selectedServer == -1 ? true : false} onClick={e => setSelectedServer(-1)} />
      <Divider />
      {servers.map((server, index) => {
        return (
          <ServerButton key={server.id} icon={server.icon} text={server.name} selected={selectedServer == index ? true : false} onClick={e => setSelectedServer(index)} />
        );
      })}
    </nav>
  );
}
