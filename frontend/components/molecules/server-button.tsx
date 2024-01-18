"use client";

import React from "react";
import Button from "../atoms/button";
import { twJoin } from "tailwind-merge";
import Tooltip from "./tooltip";

export type ServerButtonProps = {
  icon: React.ReactNode;
  name: string;
  selected: boolean;
} & React.ComponentProps<typeof Button>;

export default function ServerButton({
  icon,
  name,
  selected,
  ...restProps
}: ServerButtonProps) {
  return (
    <Button
      className="mb-2 flex content-center items-center justify-center"
      {...restProps}
    >
      <div
        className={
          (selected ? "h-10" : "h-0 group-hover:h-5") +
          " absolute left-0 w-1 rounded-r-lg bg-white transition-all duration-300 ease-in-out"
        }
      ></div>
      <Tooltip>
        <Tooltip.Content content={name} side="right" sideOffset={16} />
        <Tooltip.Trigger asChild>
          <div
            className={twJoin(
              selected
                ? "rounded-2xl bg-primary text-white"
                : "rounded-3xl bg-secondary",
              "mx-auto flex h-12 w-12 cursor-pointer items-center justify-center p-3 text-foreground shadow-lg transition-all duration-300 ease-linear last:mt-auto hover:rounded-2xl hover:bg-primary hover:text-white"
            )}
          >
            {icon}
          </div>
        </Tooltip.Trigger>
      </Tooltip>
    </Button>
  );
}
