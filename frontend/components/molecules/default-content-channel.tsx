"use client";

import { BsPersonFill, BsPlus, BsX } from "react-icons/bs";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import Tooltip from "./tooltip";
import Popover from "./popover";
import CreateGroupChatRoomPopoverContent from "./popover-content/create-group-chat-room-popover-content";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import Avatar from "../atoms/avatar";
import { useEffect, useState } from "react";
import { ChatRoom } from "@/types/chat-room";
import { useEvent } from "@/hooks/use-event";
import { cn } from "@/lib/cn";

function ChannelDmItem({ chatRoom }: { chatRoom: ChatRoom }) {
  const [onHover, setOnHover] = useState(false);
  const router = useRouter();
  const { item, setItem } = useActiveChannelItemContext();
  const isItemActive = typeof item === "object" && item.id === chatRoom.id;

  const onDmItemClicked = () => {
    if (item !== chatRoom) {
      setItem(chatRoom);
      router.push("/channels/me/" + chatRoom.id);
    }
  };

  useEffect(() => {
    console.log("item:", item);
  }, [item]);

  return (
    <li>
      <IconButton
        className="group relative mb-[1px] flex w-full justify-between p-2  hover:bg-[#4E5058]/30 active:bg-[#4E5058]/70"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={onDmItemClicked}
        active={isItemActive}
      >
        <div className="flex w-full items-center justify-start">
          {chatRoom.type === "DIRECT" && (
            <Avatar
              status={chatRoom.users[1].status}
              imageSrc={chatRoom.users[1].avatar}
            />
          )}
          <div className="ml-1 flex flex-col items-center justify-start">
            <h3
              className={cn(
                "text-muted group-hover:text-white/80 group-active:text-white",
                {
                  "text-white": isItemActive,
                }
              )}
            >
              {chatRoom.type === "DIRECT" && chatRoom.users[1].displayName}
            </h3>
          </div>
        </div>
        {onHover && (
          <BsX className="text-white/40 hover:text-foreground" size="22" />
        )}
      </IconButton>
    </li>
  );
}

export default function DefaultContentChannel() {
  const router = useRouter();
  const { item, setItem } = useActiveChannelItemContext();
  const [dmHistory, setDmHistory] = useState<ChatRoom[]>([]);

  const onClickFriends = () => {
    router.push("/channels/me");
    setItem("friends");
  };

  useEffect(() => {
    window.clientSocket.emit("chatroom:getHistory", ["DIRECT", "GROUP"]);
  }, []);

  useEvent("chatroom:getHistory", ({ history }: { history: ChatRoom[] }) => {
    if (!history) {
      console.log("chatroom:getHistory is empty");
      setDmHistory([]);
      return;
    }
    console.log("chatroom:getHistory: history:", history);
    setDmHistory(history);
    // setDmHistory([...history, ...history, ...history, ...history, ...history]);
  });

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
              <CreateGroupChatRoomPopoverContent />
            </Popover.Content>
          </Tooltip>
        </Popover>
      </div>
      <ul className="h-fit">
        {dmHistory.map((chatRoom: ChatRoom) => (
          <>
            {chatRoom.type === "DIRECT" && (
              <ChannelDmItem key={chatRoom.id} chatRoom={chatRoom} />
            )}
          </>
        ))}
      </ul>
    </>
  );
}
