"use client";

import { BsPersonFill, BsPlus, BsX } from "react-icons/bs";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import Tooltip from "./tooltip";
import Popover from "./popover";
import CreateDmPopoverContent from "./popover-content/create-dm-popover-content";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import Avatar from "../atoms/avatar";
import { useUserStore } from "@/stores/user-store";
import { User } from "@/models/user";
import { useState } from "react";

function ChannelDmItem({ user }: { user: User }) {
  const [onHover, setOnHover] = useState(false);

  return (
    <IconButton 
      className="group relative mb-2 flex w-full justify-between  p-2 active:bg-[#4E5058]/70"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className="flex w-full items-center justify-start">
        {user && <Avatar status={user.status} imageSrc={user.avatar} />}
        <div className="ml-1 flex flex-col items-center justify-start">
          <h3 className="text-muted group-hover:text-white/80 group-active:text-white">
            {user?.displayName}
          </h3>
        </div>
      </div>
      {onHover &&
        <BsX className="text-white/40 hover:text-foreground" size="22" />
      }
    </IconButton>
  );
}

export default function DefaultContentChannel() {
  const router = useRouter();
  const { item, setItem } = useActiveChannelItemContext();

  const onClickFriends = () => {
    router.push("/channels/me");
    setItem("friends");
  };


  const { profile } = useUserStore();

  return (
    <>
      <IconButton
        className="mb-6 h-[42px] w-full px-2 active:bg-[#4E5058]/70"
        onClick={() => onClickFriends()}
        active={item === "friends"}
      >
        <div className="flex items-center justify-center space-x-2">
          <BsPersonFill size="22" />
          <div>Friends</div>
        </div>
      </IconButton>
      <div className="mb-2 flex items-center justify-between pl-2">
        <div className="text-xs text-muted">DIRECT MESSAGES</div>
        <Popover>
          <Tooltip>
            <Popover.Trigger asChild>
              <Tooltip.Trigger asChild>
                <IconButton className="p-0 hover:bg-[initial] active:bg-[initial]">
                  <BsPlus className="fill-muted" size="16" />
                </IconButton>
              </Tooltip.Trigger>
            </Popover.Trigger>
            <Tooltip.Content content="Create DM" side="top" sideOffset={4} />
            <Popover.Content side="bottom" sideOffset={4} align="start">
              <CreateDmPopoverContent />
            </Popover.Content>
          </Tooltip>
        </Popover>
      </div>
      {profile &&
        <ChannelDmItem user={profile} />
      }
    </>
  );
}
