import { BsGearFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { MouseEvent, useState } from "react";
import Avatar from "../atoms/avatar";
import { MicSvg } from "@/svg/mic";
import { HeadphoneSvg } from "@/svg/headphone";
import Tooltip from "./tooltip";
import { User } from "@/models/user";
import Button from "../atoms/button";

interface UserSectionProps {
  className?: string;
  user: User;
}

export default function UserSection({ className, user }: UserSectionProps) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isHeadphoneMuted, setIsHeadphoneMuted] = useState(false);

  const setMicOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isMicMuted && isHeadphoneMuted) {
      setIsMicMuted(false);
      setIsHeadphoneMuted(false);
    } else {
      setIsMicMuted(!isMicMuted);
    }
  };

  const setHeadphoneOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isHeadphoneMuted && !isMicMuted) {
      setIsMicMuted(true);
      setIsHeadphoneMuted(true);
    } else if (isHeadphoneMuted) {
      setIsMicMuted(false);
      setIsHeadphoneMuted(false);
    } else {
      setIsHeadphoneMuted(!isHeadphoneMuted);
    }
  };

  return (
    <section
      className={twMerge("flex h-[52px] w-full bg-gray-800 p-2", className)}
    >
      <Button className="group relative mr-2 flex items-center justify-start rounded-[4px] pl-[2px] hover:bg-[#4E5058]/60">
        <Avatar status="online" imageSrc={user.avatar} />
        <div className="flex w-[78px] flex-col items-start justify-start">
          <div className="w-full text-start text-sm font-medium text-white">
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
              {user.displayName}
            </h1>
          </div>
          <div className="w-[78px] overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs font-light">
            {user.username}
          </div>
        </div>
      </Button>
      <Tooltip>
        <Tooltip.Content content="Mute" sideOffset={1} />
        <Tooltip.Trigger asChild>
          <Button
            className="flex w-8 items-center justify-center hover:bg-[#4E5058]/60"
            onClick={setMicOnClick}
          >
            <MicSvg muted={isMicMuted} />
          </Button>
        </Tooltip.Trigger>
      </Tooltip>
      <Tooltip>
        <Tooltip.Content content="Defean" sideOffset={1} />
        <Tooltip.Trigger asChild>
          <Button
            className="flex w-8 items-center justify-center hover:bg-[#4E5058]/60"
            onClick={setHeadphoneOnClick}
          >
            <HeadphoneSvg muted={isHeadphoneMuted} />
          </Button>
        </Tooltip.Trigger>
      </Tooltip>

      <Tooltip>
        <Tooltip.Content content="User Settings" side="top" sideOffset={1} />
        <Tooltip.Trigger asChild>
          <Button className="flex w-8 items-center justify-center hover:bg-[#4E5058]/60">
            <BsGearFill size="18" />
          </Button>
        </Tooltip.Trigger>
      </Tooltip>
    </section>
  );
}
