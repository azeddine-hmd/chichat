import React, { Dispatch, SetStateAction } from "react";
import TopBar from "../molecules/topbar";
import IconButton from "../molecules/icon-button";
import { BsPersonFill } from "react-icons/bs";
import { cn } from "@/lib/cn";

export enum TopBarOptions {
  AddFriends,
  Online,
  All,
  Pending,
  Blocked,
}

export default function FriendsTopBar({
  activeOption,
  activateOption,
}: {
  activeOption: TopBarOptions;
  activateOption: Dispatch<SetStateAction<TopBarOptions>>;
}) {
  return (
    <TopBar>
      <div className="flex w-fit gap-2">
        <BsPersonFill size="22" className="text-icon" />
        <span className="select-none text-white">Friends</span>
      </div>
      <IconButton
        className={cn(
          "h-6 rounded-[4px] border-2 border-accent p-2 text-[16px] font-medium ",
          {
            "border-none text-[#2dc06d] hover:bg-transparent hover:text-[#2dc06d] active:bg-transparent active:text-[#2dc06d]":
              activeOption === TopBarOptions.AddFriends,
            "bg-accent text-white hover:bg-accent hover:text-white active:bg-accent active:text-white":
              activeOption !== TopBarOptions.AddFriends,
          }
        )}
        onClick={() =>
          activeOption !== TopBarOptions.AddFriends &&
          activateOption(TopBarOptions.AddFriends)
        }
      >
        Add Friend
      </IconButton>

      <IconButton
        className="px-2"
        active={activeOption === TopBarOptions.Online}
        onClick={() =>
          activeOption !== TopBarOptions.Online &&
          activateOption(TopBarOptions.Online)
        }
      >
        Online
      </IconButton>

      <IconButton
        className="px-2"
        active={activeOption === TopBarOptions.All}
        onClick={() =>
          activeOption !== TopBarOptions.All &&
          activateOption(TopBarOptions.All)
        }
      >
        All
      </IconButton>

      <IconButton
        className="px-2"
        active={activeOption === TopBarOptions.Pending}
        onClick={() =>
          activeOption !== TopBarOptions.Pending &&
          activateOption(TopBarOptions.Pending)
        }
      >
        Pending
      </IconButton>

      <IconButton
        className="px-2"
        active={activeOption === TopBarOptions.Blocked}
        onClick={() =>
          activeOption !== TopBarOptions.Blocked &&
          activateOption(TopBarOptions.Blocked)
        }
      >
        Blocked
      </IconButton>
    </TopBar>
  );
}
