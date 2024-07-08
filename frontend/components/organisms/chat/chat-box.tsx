import Avatar from "@/components/atoms/avatar";
import Button from "@/components/atoms/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/molecules/dialog";
import Popover from "@/components/molecules/popover";
import Tooltip from "@/components/molecules/tooltip";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import React, { useState } from "react";
import { BsPencilFill, BsThreeDots } from "react-icons/bs";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import Image from "next/image";

export type ChatBoxProps = {
  time: number;
  content: string;
  isImage?: boolean;
  shape?: "FULL" | "BASIC";
} & React.ComponentProps<"div">;

export default function ChatBox({ 
  className,
  content,
  shape = "BASIC",
  time,
  isImage = false,
  onMouseEnter,
  onMouseLeave,
  ...restProps 
}: ChatBoxProps) {
  const [onHover, setOnHover] = useState(false);
  const {profile} = useUserStore();
  const [openToolbox, setOpenToolbox] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const onEditComplete = (newContent: string) => {
    // TODO: emit new content
    setOnEdit(false);
  };

  return (
    <div className={cn("relative flex w-full h-fit mr-[42px] mb-[2px]", className)}
      onMouseEnter={(e) => {
        setOnHover(true);
        setOpenToolbox(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setOnHover(false);
        setOpenToolbox(false);
        onMouseLeave?.(e);
      }}
      {...restProps}
    >
      <div className="flex justify-center flex-shrink-0 items-start w-[72px] left-2 text-muted/80 text-[10px]">
        {shape === "BASIC" && onHover && (
          "10:43 PM"
        )}
        {shape === "FULL" && profile && (
          <Avatar displayStatus={false} status={profile.status} imageSrc={profile.avatar} />
        )}
      </div>
      <div className="w-full flex flex-col justify-center  flex-wrap overflow-hidden">
        {shape === "FULL" && profile && (
          <div className="flex gap-4 flex-wrap overflow-hidden">
            <h3 className="text-white text-sm">{profile.displayName}</h3>
            <div className="justify-center items-center text-center text-muted/80 text-[10px]">
             Today at 2:36 AM
            </div>
          </div>
        )}
        {!isImage ? (
          <>
          {onEdit ? (
            <ChatInputField placeholder="" content={content} className="flex-grow text-white/70 !break-words text-sm" onMessageSent={(newContent) => onEditComplete(newContent)} />
          ) : (
            <p className="flex-grow text-white/70 !break-words text-sm">
              {content}
            </p>
          )}
          </>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Image className="max-w-[40%] h-fit" src={content} alt="image" width={140} height={140} />
            </DialogTrigger>
            <DialogContent>
              <Image className="w-fit h-fit" src={content} alt="image" width={140} height={140} />
              <a className="text-white/60 text-sm hover:text-white hover:underline hover:cursor-pointer" href={content} target="_blank">Open in browser</a>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {onHover && (
        <Popover open={openToolbox}>
          <Popover.Trigger className="outline-none absolute right-0" onClick={(e) => { e.stopPropagation() }}>
          </Popover.Trigger>
          <Popover.Content 
            className="mr-4 p-0 bg-gray-500 border border-black/10 shadow-lg rounded-[4px] flex gap-1 text-white" 
            side="top" 
            align="start"
          >

            <Tooltip>
              <Tooltip.Content content="Edit" sideOffset={4} />
              <Tooltip.Trigger asChild>
                <Button className="rounded-none hover:bg-white/10 active:bg-white/20 hover:text-white p-[4px]" onClick={() => {/* setOnEdit(true) */}}>
                  <BsPencilFill size="22"/>
                </Button>
              </Tooltip.Trigger>
            </Tooltip>

            <Tooltip>
              <Tooltip.Content content="More" sideOffset={4} />
              <Tooltip.Trigger asChild>
                <Button className="rounded-none hover:bg-white/10 active:bg-white/20 hover:text-white p-[4px]">
                  <BsThreeDots size="22"/>
                </Button>
              </Tooltip.Trigger>
            </Tooltip>
          </Popover.Content>
        </Popover>
      )}
    </div>
  );
}
