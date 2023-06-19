"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import Arrow from "../atoms/arrow";

type TooltipType = {
  children?: React.ReactNode;
  direction: "top" | "bottom" | "left" | "right";
  margin?: number;
  unit?: "px" | "rem";
} & React.ComponentProps<"div">;

/* 
  one caveat is that you have to set parent to have `relative` 
  and `group` class names in order to position tooltip in correct place.
*/
export default function Tooltip({
  children,
  className,
  direction,
  margin = 0,
  unit = "px",
  ...restProps
}: TooltipType) {
  return (
    <div
      className={twMerge(
        `absolute inset-0 h-fit w-fit min-w-max origin-left scale-0 transition-all duration-100 group-hover:scale-100`,
        direction == "right" && "top-1/2 -translate-y-1/2",
        direction == "top" && "left-[50%] -translate-x-1/2"
      )}
      style={
        direction == "right"
          ? {
              left: `calc(100% + 4px + ${margin}${unit})`,
            }
          : direction == "top"
          ? {
              top: `calc(-100% - 4px - ${margin}${unit})`,
            }
          : {}
      }
      {...restProps}
    >
      <div className={twMerge("relative h-fit w-fit", className)}>
        {direction === "right" && <Arrow direction="left" />}
        {direction === "top" && <Arrow direction="bottom" />}
        {direction === "left" && <Arrow direction="right" />}
        {direction === "bottom" && <Arrow direction="top" />}
        <div
          className={`rounded-md bg-black p-2 text-sm font-semibold text-[#dbdfe2] shadow-md`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
