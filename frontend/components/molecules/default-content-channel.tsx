import { BsPersonFill, BsPlus } from "react-icons/bs";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";
import Tooltip from "./tooltip";
import Popover from "./popover";
import CreateDmPopoverContent from "./popover-content/create-dm-popover-content";

export default function DefaultContentChannel() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(0);
  const onClickFriends = (_: MouseEvent<HTMLButtonElement>) => {
    if (selectedItem != 0) {
      router.push("/channels/friends");
      setSelectedItem(0);
    }
  };

  return (
    <>
      <IconButton
        className="mb-2 h-[42px] w-full px-2"
        onClick={onClickFriends}
        active={selectedItem == 0}
      >
        <div className="flex items-center justify-center space-x-2">
          <BsPersonFill size="22" />
          <div>Friends</div>
        </div>
      </IconButton>
      <div className="flex items-center justify-between pl-2">
        <div className="text-xs text-muted">DIRECT MESSAGES</div>
        <Popover>
          <Tooltip>
            <Popover.Trigger asChild>
              <Tooltip.Trigger asChild>
                <IconButton className="hover:bg-[initial] active:bg-[initial] p-0">
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
    </>
  );
}
