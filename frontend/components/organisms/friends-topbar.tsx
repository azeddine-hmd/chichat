import React, { Dispatch, SetStateAction, useState } from "react";
import TopBar from "../molecules/topbar";
import PrimaryButton from "../molecules/primary-button";
import { BsPersonFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export enum TopBarOptions {
  AddFriend,
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
        <span className="text-white">Friends</span>
      </div>

      <PrimaryButton
        className={twMerge(
          "h-6 rounded-[4px] border-2 border-accent p-2 text-[16px] font-medium ",
          activeOption === TopBarOptions.AddFriend &&
          "border-none text-[#2dc06d] hover:bg-transparent hover:text-[#2dc06d] active:bg-transparent active:text-[#2dc06d]",
          activeOption !== TopBarOptions.AddFriend &&
          "bg-accent text-white hover:bg-accent hover:text-white active:bg-accent active:text-white"
        )}
        onClick={(e) =>
          activeOption !== TopBarOptions.AddFriend &&
          activateOption(TopBarOptions.AddFriend)
        }
      >
        Add Friend
      </PrimaryButton>

      <PrimaryButton
        active={activeOption === TopBarOptions.Online}
        onClick={(e) =>
          activeOption !== TopBarOptions.Online &&
          activateOption(TopBarOptions.Online)
        }
      >
        Online
      </PrimaryButton>

      <PrimaryButton
        active={activeOption === TopBarOptions.All}
        onClick={(e) =>
          activeOption !== TopBarOptions.All &&
          activateOption(TopBarOptions.All)
        }
      >
        All
      </PrimaryButton>

      <PrimaryButton
        active={activeOption === TopBarOptions.Pending}
        onClick={(e) =>
          activeOption !== TopBarOptions.Pending &&
          activateOption(TopBarOptions.Pending)
        }
      >
        Pending
      </PrimaryButton>

      <PrimaryButton
        active={activeOption === TopBarOptions.Blocked}
        onClick={(e) =>
          activeOption !== TopBarOptions.Blocked &&
          activateOption(TopBarOptions.Blocked)
        }
      >
        Blocked
      </PrimaryButton>
    </TopBar>
  );
}
