import Button from "@/components/atoms/button";
import { User } from "@/models/user";
import { BsChatFill, BsThreeDots } from "react-icons/bs";
import Tooltip from "../tooltip";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { delay } from "@/lib/delay";
import { api } from "@/config";
import { useUserStore } from "@/stores/user-store";
import { usePopper, Popper, Placement, Vec2, PopperState } from "@/lib/popper";

export default function OnlineAllItem({ user }: { user: User }) {
  const { friends, setFriends } = useUserStore();

  const popperState = usePopper("mouse");

  const onFriendItemClicked = (displayName: string) => {
    console.log(`we're about to chat with ${displayName}`);
  };

  const removeFriendMut = useMutation({
    mutationFn: async () => {
      await delay(500);
      return await api.delete(`/api/users/friends/remove/${user.id}`);
    },
    onSuccess: () =>
      setFriends(friends.filter((friend) => friend.id != user.id)),
  });

  return (
    <>
      <Button
        className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
        onClick={(e) => {
          e.stopPropagation();
          onFriendItemClicked(user.displayName);
        }}
      >
        <BsChatFill className="text-lg" />
        <Tooltip direction="top" margin={2}>
          Message
        </Tooltip>
      </Button>
      <Button className="bg-grey-800 active:bg-inherit/50 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
        onMouseDown={(e) => {
          if (!popperState.menuOpen)
            popperState.setMenuPos({ x: e.clientX, y: e.clientY });
          popperState.setMenuOpen(true);
        }}
      >
        <BsThreeDots className="rotate-90 transform text-lg" />
        <Tooltip direction="top" margin={4}>
          More
        </Tooltip>
        <Popper popperState={popperState} >
          <Button
            className="min-w-[10rem] rounded-sm p-2  pr-2 text-left font-sans text-[14px] font-semibold text-red-500 hover:bg-primary hover:text-white"
            onClick={(e) => {
              console.log("popover: onClick");
              removeFriendMut.mutate();
              popperState.setMenuOpen(false);
            }}
            disabled={removeFriendMut.isPending}
          >
            Remove Friend
          </Button>
        </Popper>
      </Button>
    </>
  );
}
