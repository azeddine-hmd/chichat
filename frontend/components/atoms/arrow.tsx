import React from "react";
import { twJoin } from "tailwind-merge";

export type ArrowType = {
  children?: React.ReactNode;
  placement: "top" | "bottom" | "left" | "right";
} & React.ComponentProps<"div">;

export default function Arrow({ className, placement }: ArrowType) {
  return (
    <div className={className}>
      <div
        className={twJoin(
          "absolute flex h-full w-full flex-col",
          placement == "left" && "-left-[4px] items-start justify-center",
          placement == "bottom" && "-bottom-[4px] items-center justify-end"
        )}
      >
        <div className="h-[8px] w-[8px] rotate-45 bg-black"></div>
      </div>
    </div>
  );
}
