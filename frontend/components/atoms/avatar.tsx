"use client";
import { cn } from "@/lib/cn";
import Image from "next/image";

export type AvatarStatus = "online" | "offline";

export type AvatarType = {
  status: "online" | "offline";
  imageSrc: string;
} & React.ComponentProps<"div">;

export default function Avatar({ className, status, imageSrc }: AvatarType) {
  return (
    <div className={cn("overflow-hidden pr-2", className)}>
      <div className="relative inline-block">
        <Image
          className="h-8 w-8 rounded-full"
          width={32}
          height={32}
          src={imageSrc}
          alt="avatar"
        />
        <span
          className={cn(
            "absolute left-[28px] top-[26px] h-[16px] w-[16px] rounded-full border-[4px] border-gray-700 -translate-x-1/2 -translate-y-1/2",
            {
              "bg-[#23a55a]": status === "online",
              "bg-[#80848e]": status === "offline",
            }
          )}
        />
        {status === "offline" && (
          <span className="absolute inset-0 left-[28px] top-[26px] h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700" />
        )}
      </div>
    </div>
  );
}
