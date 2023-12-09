"use client";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type AvatarStatus = "online" | "offline";

export type AvatarType = {
  status: "online" | "offline";
  imageSrc: string;
} & React.ComponentProps<"div">;

export default function Avatar({ className, status, imageSrc }: AvatarType) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={twMerge("relative pr-2 overflow-hidden", className)} >
      <Image
        className="h-[32px] w-[32px] rounded-full"
        src={imageSrc}
        width={32}
        height={32}
        alt=""
        onLoadingComplete={(e) => setIsLoading(false)}
      />
      <span
        className={
          (status == "online" ? "bg-[#23a55a] " : "bg-[#80848e]") +
          " absolute bottom-[0px] left-[21px] h-[15px] w-[15px] rounded-[999px] border-2 border-gray-700"
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
