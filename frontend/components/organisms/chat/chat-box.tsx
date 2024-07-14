import Avatar from "@/components/atoms/avatar";
import Button from "@/components/atoms/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/molecules/dialog";
import Popover from "@/components/molecules/popover";
import Tooltip from "@/components/molecules/tooltip";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { BsPencilFill, BsThreeDots, BsTrash } from "react-icons/bs";
import Image from "next/image";
import { User } from "@/models/user";
import Divider from "@/components/molecules/divider";
import TimeComponent from "@/components/molecules/time-component";
import MenuPopoverContainer from "@/components/molecules/popover-content/menu-popover-container";
import PopoverButton from "@/components/molecules/popover-button";
import ChatInputField from "./chat-input-field";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { Message } from "@/models/message";

export type ChatBoxProps = {
  message: Message;
  shape?: "FULL" | "SHORT";
  profile: User;
  haveDateSeparator?: boolean;
  onDelete?: (messageId: number) => void;
  onEditComplete?: (newContent: string) => void;
} & React.ComponentProps<"li">;

export default function ChatBox({
  className,
  message,
  shape = "SHORT",
  profile,
  onMouseEnter,
  onMouseLeave,
  haveDateSeparator = false,
  onDelete,
  onEditComplete,
  ...restProps
}: ChatBoxProps) {
  const [onHover, setOnHover] = useState(false);
  const [openToolbox, setOpenToolbox] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [openEditTooltip, setOpenEditTooltip] = useState(false);
  const [openMoreTooltip, setOpenMoreTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const [disableToolbox, setDisableToolbox] = useState(false);
  const [openMorePopover, setOpenMorePopover] = useState(false);
  const [triggerSaveMessage, setTriggerSaveMessage] = useState(false);

  useEffect(() => {
    if (!onHover) return;
    if (itemRef.current) {
      const childTop = itemRef.current.getBoundingClientRect().top;
      if (childTop < 81) {
        setDisableToolbox(true);
      } else if (disableToolbox) {
        setDisableToolbox(false);
      }
    }

    // eslint-disable-next-line
  }, [onHover]);

  useKeyboardShortcut({
    keys: ["Escape"],
    callback: () => {
      if (onEdit) setOnEdit(false);
    },
  });

  const isImage = false;

  return (
    <li
      ref={itemRef}
      className={cn("mb-1 flex h-fit w-full list-none flex-col  ", className, {
        "mt-3": shape == "FULL",
      })}
      onMouseEnter={(e) => {
        setOnHover(true);
        if (!disableToolbox && !onEdit) setOpenToolbox(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setOnHover(false);
        setOpenToolbox(false);
        onMouseLeave?.(e);
      }}
      {...restProps}
    >
      {haveDateSeparator && (
        <div className="flex items-center justify-center bg-gray-600 pb-1 text-[12px] font-medium text-muted/80">
          <Divider className="flex-0 m-0 h-full w-full" />
          <TimeComponent
            className="w-[100px] flex-1"
            time={message.createAt}
            opts={{ short: true }}
            disableHoverInfo
          />
          <Divider className="flex-0 m-0 h-full w-full" />
        </div>
      )}
      <div
        className={cn("relative flex w-full pl-4 pr-[42px] pt-1", {
          "bg-gray-700": onEdit,
        })}
      >
        <div className="left-2 flex h-fit w-[72px] flex-shrink-0 items-start justify-center text-[10px] text-muted/80">
          {shape === "SHORT" && onHover && (
            <TimeComponent time={message.createAt} opts={{ onlyDayTime: true }} />
          )}
          {shape === "FULL" && profile && (
            <Avatar
              displayStatus={false}
              status={profile.status}
              imageSrc={profile.avatar}
            />
          )}
        </div>
        <div className="flex h-full w-full flex-col flex-wrap  justify-center overflow-hidden">
          {shape === "FULL" && profile && (
            <div className="flex flex-wrap gap-4 overflow-hidden">
              <h3 className="text-sm text-white">{profile.displayName}</h3>
              <div className="items-center justify-center text-center text-[10px] text-muted/80">
                <TimeComponent time={message.createAt} />
              </div>
            </div>
          )}
          {!isImage ? (
            <>
              {onEdit ? (
                <div className="mx-0 my-4 flex-grow">
                  <ChatInputField
                    className="m-0"
                    content={message.content}
                    onMessageSent={(newMessage) => {
                      if (newMessage !== message.content) {
                        onEditComplete?.(newMessage);
                      }
                      setOnEdit(false);
                    }}
                    trigger={{ triggerSaveMessage, setTriggerSaveMessage }}
                  />
                  <div className="mt-1 text-xs">
                    escape to{" "}
                    <span
                      onClick={() => setOnEdit(false)}
                      className="cursor-pointer text-link hover:underline"
                    >
                      cancel
                    </span>
                    {" "}<span className="inline-flex h-5 w-2 items-center justify-center rounded-full text-center align-middle">
                      *
                    </span>{" "}
                    enter to{" "}
                    <span 
                      onClick={() => {
                        setTriggerSaveMessage(true);
                      }}
                      className="cursor-pointer text-link hover:underline"
                    >
                      save
                    </span>
                  </div>
                </div>
              ) : (
                <p className="flex-grow !break-words text-sm text-white/70">
                  {message.content}{message.isEdited && <span className="inline-flex justify-center ml-1 items-center text-[9px] text-muted/70">(edited)</span>}
                </p>
              )}
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  className="h-fit max-w-[40%]"
                  src={message.content}
                  alt="image"
                  width={140}
                  height={140}
                />
              </DialogTrigger>
              <DialogContent>
                <Image
                  className="h-fit w-fit"
                  src={message.content}
                  alt="image"
                  width={140}
                  height={140}
                />
                <a
                  className="text-sm text-white/60 hover:cursor-pointer hover:text-white hover:underline"
                  href={message.content}
                  target="_blank"
                >
                  Open in browser
                </a>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {onHover && (
          <Popover open={openToolbox}>
            <Popover.Trigger className="absolute right-0 outline-none"></Popover.Trigger>
            <Popover.Content
              className="mr-4 flex gap-1 rounded-[4px] border border-black/10 bg-gray-500 p-0 text-white shadow-lg"
              side="top"
              align="start"
            >
              <Tooltip open={openEditTooltip}>
                <Tooltip.Content content="Edit" sideOffset={4} />
                <Tooltip.Trigger asChild>
                  <Button
                    className="rounded-none p-[4px] hover:bg-white/10 hover:text-white active:bg-white/20"
                    onMouseEnter={() => setOpenEditTooltip(true)}
                    onMouseLeave={() => setOpenEditTooltip(false)}
                    onClick={() => setOnEdit(true)}
                  >
                    <BsPencilFill size="22" />
                  </Button>
                </Tooltip.Trigger>
              </Tooltip>

              <Popover open={openMorePopover}>
                <Tooltip open={openMoreTooltip}>
                  <Tooltip.Content content="More" sideOffset={4} />
                  <Popover.Trigger asChild>
                    <Tooltip.Trigger asChild>
                      <Button
                        className="rounded-none p-[4px] hover:bg-white/10 hover:text-white active:bg-white/20"
                        onMouseEnter={() => setOpenMoreTooltip(true)}
                        onMouseLeave={() => setOpenMoreTooltip(false)}
                        onClick={() => setOpenMorePopover(true)}
                      >
                        <BsThreeDots size="22" />
                      </Button>
                    </Tooltip.Trigger>
                  </Popover.Trigger>
                  <Popover.Content
                    side="left"
                    sideOffset={8}
                    align="start"
                    alignOffset={0}
                    clickOutside={() => setOpenMorePopover(false)}
                  >
                    <MenuPopoverContainer>
                      <PopoverButton
                        className="text-xm flex items-center justify-between bg-transparent font-medium text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          setOpenMorePopover(false);
                          onDelete?.(message.id);
                        }}
                      >
                        Delete Message
                        <BsTrash className="inline" />
                      </PopoverButton>
                    </MenuPopoverContainer>
                  </Popover.Content>
                </Tooltip>
              </Popover>
            </Popover.Content>
          </Popover>
        )}
      </div>
    </li>
  );
}
