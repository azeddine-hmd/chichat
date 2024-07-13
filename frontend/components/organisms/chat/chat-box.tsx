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
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsPencilFill, BsThreeDots } from "react-icons/bs";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import Image from "next/image";
import { User } from "@/models/user";

export type ChatBoxProps = {
  time: number;
  content: string;
  isImage?: boolean;
  shape?: "FULL" | "SHORT";
  profile: User;
} & React.ComponentProps<"li">;

export default function ChatBox({
  className,
  content,
  shape = "SHORT",
  time,
  isImage = false,
  profile,
  onMouseEnter,
  onMouseLeave,
  ...restProps
}: ChatBoxProps) {
  const [onHover, setOnHover] = useState(false);
  const [openToolbox, setOpenToolbox] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [openEditTooltip, setOpenEditTooltip] = useState(false);
  const [openMoreTooltip, setOpenMoreTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const [disableToolbox, setDisableToolbox] = useState(false);

  const onEditComplete = (newContent: string) => {
    // TODO: emit new content
    setOnEdit(false);
  };

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

  return (
    <li
      ref={itemRef}
      className={cn(
        "relative mb-1 mr-[42px] mt-2 flex h-fit  w-full list-none",
        className,
        { "mb-3 mt-3": shape == "FULL" }
      )}
      onMouseEnter={(e) => {
        setOnHover(true);
        if (!disableToolbox) setOpenToolbox(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setOnHover(false);
        setOpenToolbox(false);
        onMouseLeave?.(e);
      }}
      {...restProps}
    >
      <div className="left-2 flex w-[72px] flex-shrink-0 items-start justify-center text-[10px] text-muted/80">
        {shape === "SHORT" && onHover && "10:43 PM"}
        {shape === "FULL" && profile && (
          <Avatar
            displayStatus={false}
            status={profile.status}
            imageSrc={profile.avatar}
          />
        )}
      </div>
      <div className="flex w-full flex-col flex-wrap  justify-center overflow-hidden">
        {shape === "FULL" && profile && (
          <div className="flex flex-wrap gap-4 overflow-hidden">
            <h3 className="text-sm text-white">{profile.displayName}</h3>
            <div className="items-center justify-center text-center text-[10px] text-muted/80">
              Today at 2:36 AM
            </div>
          </div>
        )}
        {!isImage ? (
          <>
            {onEdit ? (
              <ChatInputField
                placeholder=""
                content={content}
                className="flex-grow !break-words text-sm text-white/70"
                onMessageSent={(newContent) => onEditComplete(newContent)}
              />
            ) : (
              <p className="flex-grow !break-words text-sm text-white/70">
                {content}
              </p>
            )}
          </>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Image
                className="h-fit max-w-[40%]"
                src={content}
                alt="image"
                width={140}
                height={140}
              />
            </DialogTrigger>
            <DialogContent>
              <Image
                className="h-fit w-fit"
                src={content}
                alt="image"
                width={140}
                height={140}
              />
              <a
                className="text-sm text-white/60 hover:cursor-pointer hover:text-white hover:underline"
                href={content}
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
                >
                  <BsPencilFill size="22" />
                </Button>
              </Tooltip.Trigger>
            </Tooltip>

            <Tooltip open={openMoreTooltip}>
              <Tooltip.Content content="More" sideOffset={4} />
              <Tooltip.Trigger asChild>
                <Button
                  className="rounded-none p-[4px] hover:bg-white/10 hover:text-white active:bg-white/20"
                  onMouseEnter={() => setOpenMoreTooltip(true)}
                  onMouseLeave={() => setOpenMoreTooltip(false)}
                >
                  <BsThreeDots size="22" />
                </Button>
              </Tooltip.Trigger>
            </Tooltip>
          </Popover.Content>
        </Popover>
      )}
    </li>
  );
}
