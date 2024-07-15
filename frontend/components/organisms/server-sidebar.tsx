"use client";

import { BsRobot, BsTv } from "react-icons/bs";
import Divider from "../molecules/divider";
import ServerButton from "../molecules/server-button";
import { useState } from "react";
import { Server } from "@/models/server";
import Image from "next/image";
import ChiChatIcon from "@/public/svg/chichat-logo.svg";
import { cn } from "@/lib/cn";

export default function ServerSidebar({ className }: { className?: string }) {
  const [servers, setServers] = useState<Array<Server>>([
    // new Server({ id: 1, name: "Runic Games", icon: <BsRobot /> }),
    // new Server({ id: 2, name: "GuildWars2", icon: <BsTv /> }),
  ]);
  const [selectedServer, setSelectedServer] = useState(-1);

  return (
    <nav
      className={cn(
        "flex h-full w-[4.5rem]  flex-col items-center bg-gray-900 pt-3 text-white shadow-lg",
        className
      )}
    >
      <ServerButton
        icon={<Image priority src={ChiChatIcon} alt="Main Server" />}
        name="Direct Messages"
        selected={selectedServer == -1 ? true : false}
        onClick={(e) => setSelectedServer(-1)}
      />
      <Divider />
      {servers.map((server, index) => {
        return (
          <ServerButton
            key={server.id}
            icon={server.icon}
            name={server.name}
            selected={selectedServer == index ? true : false}
            onClick={(e) => setSelectedServer(index)}
          />
        );
      })}
    </nav>
  );
}
