"use client";

import { BsGearFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { MouseEvent, useState } from "react";
import Button from "../atoms/button";
import Avatar from "../atoms/avatar";
import { MicSvg } from "@/svg/mic";
import { HeadphoneSvg } from "@/svg/headphone";
import Tooltip from "./tooltip";

interface AvatarSectionType {
  className?: string;
}

export default function AvatarSection({ className }: AvatarSectionType) {
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
    <div className={twMerge("flex h-[52px] w-full bg-gray-800 p-2", className)}>
      <Button className="relative group mr-2 flex items-center justify-start rounded-[4px] pl-[2px] hover:bg-[#4E5058]/60">
        <Avatar />
        <div className="flex w-[78px] flex-col items-start justify-start">
          <div className="w-full text-start text-sm font-medium text-white">
            Azeddine
          </div>
          <div className="w-[78px] overflow-hidden text-ellipsis whitespace-nowrap text-left text-xs font-light">
            Azeddine#5554
          </div>
        </div>
      </Button>

      <Button
        className="group relative flex w-8 items-center justify-center hover:bg-[#4E5058]/60"
        onClick={setMicOnClick}
      >
        <MicSvg muted={isMicMuted} />
        <Tooltip direction="top" margin={4} >Mute</Tooltip>
      </Button>

      <Button
        className="group relative flex w-8 items-center justify-center hover:bg-[#4E5058]/60"
        onClick={setHeadphoneOnClick}
      >
        <HeadphoneSvg muted={isHeadphoneMuted} />
        <Tooltip direction="top" margin={4} >Defean</Tooltip>
      </Button>

      <Button className="group relative flex w-8 items-center justify-center hover:bg-[#4E5058]/60">
        <BsGearFill size="18" />
        <Tooltip direction="top" margin={4} >User Settings</Tooltip>
      </Button>
    </div>
  );
}
