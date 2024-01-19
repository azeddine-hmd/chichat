import Button from "@/components/atoms/button";
import { User } from "@/models/user";
import { BsChatFill, BsThreeDots } from "react-icons/bs";
import Tooltip from "../tooltip";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { delay } from "@/lib/delay";
import { api } from "@/config";
import { useUserStore } from "@/stores/user-store";
import PopoverButton from "../popover-button";
import Popover from "../popover";
import MenuPopoverContainer from "../popover-content/menu-popover-container";

export default function OnlineAllItem({ user }: { user: User }) {
  const { friends, setFriends } = useUserStore();
  const [openMorePopover, setOpenMorePopover] = useState(false);
  const [morePopoverPos, setMorePopoverPos] = useState({ x: 0, y: 0 });
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
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button
            className="bg-grey-800 rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
            onClick={(e) => {
              e.stopPropagation();
              onFriendItemClicked(user.displayName);
            }}
          >
            <BsChatFill className="text-lg" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content content="Message" sideOffset={2} />
      </Tooltip>

      <Popover open={openMorePopover}>
        <Tooltip>
          <Tooltip.Content content="More" sideOffset={4} />
          <Tooltip.Trigger asChild>
            <Button
              className="bg-grey-800 active:bg-inherit/50 rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
              onMouseDown={(e) => {
                e.stopPropagation();
                setMorePopoverPos({ x: e.clientX, y: e.clientY });
                if (!openMorePopover) setOpenMorePopover(true);
              }}
            >
              <BsThreeDots className="rotate-90 transform text-lg" />
            </Button>
          </Tooltip.Trigger>
        </Tooltip>
        <Popover.Content
          position={morePopoverPos}
          clickOutside={() => {
            setOpenMorePopover(false);
          }}
          side="left"
          align="start"
          sideOffset={7}
        >
          <MenuPopoverContainer>
            <PopoverButton
              className="text-red-500 hover:bg-red-500 hover:font-[500] hover:text-white"
              onClick={(_) => {
                removeFriendMut.mutate();
                setOpenMorePopover(false);
              }}
              disabled={removeFriendMut.isPending}
            >
              Remove Friend
            </PopoverButton>
          </MenuPopoverContainer>
        </Popover.Content>
      </Popover>
    </>
  );
}
