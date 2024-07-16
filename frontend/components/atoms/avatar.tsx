"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";

export type AvatarStatus = "online" | "offline";

export type AvatarType = {
  status: "online" | "offline";
  imageSrc: string;
  displayStatus?: boolean;
  resolution?: {
    height: number;
    width: number;
  };
} & React.ComponentProps<"div">;

export default function Avatar({
  className,
  status,
  imageSrc,
  displayStatus = true,
  resolution,
}: AvatarType) {
  return (
    <div className={cn("overflow-hidden pr-2 flex justify-center items-center", className)}>
      <div className="relative inline-block">
        {resolution ? (
        <Image
          className={cn("rounded-full")}
          style={{ height: resolution.height + "px", width: resolution.width + "px" }}
          width={resolution.width}
          height={resolution.height}
          src={imageSrc}
          alt="avatar"
        />
        ) :
        <Image
          className={cn("h-8 w-8 rounded-full")}
          width={32}
          height={32}
          src={imageSrc}
          alt="avatar"
        />
        }
        {displayStatus && (
          <>
            <span
              className={cn(
                "absolute left-[28px] top-[26px] h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-gray-700",
                {
                  "bg-[#23a55a]": status === "online",
                  "bg-[#80848e]": status === "offline",
                }
              )}
            />
            {status === "offline" && (
              <span className="absolute inset-0 left-[28px] top-[26px] h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
