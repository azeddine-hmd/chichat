"use client";
import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type AvatarStatus = "online" | "offline";

interface AvatarType {
  className?: string;
}

export default function Avatar({ className }: AvatarType) {
  const [status, setStatus] = useState<AvatarStatus>("online");

  return (
    <div className={twMerge("relative pr-2", className)} >
      <Image
        className="h-[32px] w-[32px] rounded-full"
        src="https://cdn.discordapp.com/avatars/346352416897105920/6d0b746cce5af403d51ed738624c6028.webp?size=32"
        width={32}
        height={32}
        alt="user avatar"
      />
      <span
        className={
          (status == "online" ? "bg-[#23a55a] " : "bg-[#80848e]") +
          " absolute bottom-[0px] left-[21px] h-[15px] w-[15px] rounded-full border-2 border-gray-700"
        }
      >
        {status == "offline" ? (
          <span className="absolute bottom-[3px] left-[3px] h-[5px] w-[5px] rounded-full border-2 border-gray-700 bg-gray-700" />
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
