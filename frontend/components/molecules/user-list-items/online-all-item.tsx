import Button from "@/components/atoms/button";
import { User } from "@/models/user";
import { BsChatFill, BsThreeDots } from "react-icons/bs";
import Tooltip from "../tooltip";
import { MouseEvent } from "react";

export default function OnlineAllItem({ user }: { user: User }) {
  const onFriendItemClicked = (e: MouseEvent<HTMLButtonElement>, displayName: string) => {
    e.stopPropagation();
    console.log(`we're about to chat with ${displayName}`);
  };

  return (
    <>
      <Button
        className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
        onClick={(e) => onFriendItemClicked(e, user.displayName)}
      >
        <BsChatFill className="text-lg" />
        <Tooltip direction="top" margin={2}>
          Message
        </Tooltip>
      </Button>
      <Button className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5">
        <BsThreeDots className="rotate-90 transform text-lg" />
        <Tooltip direction="top" margin={2}>
          Menu
        </Tooltip>
      </Button>
    </>
  );
}
