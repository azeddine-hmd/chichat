"use client";

import React, { useState } from "react";
import Button from "../atoms/button";
import { twJoin } from "tailwind-merge";
import Tooltip from "./tooltip";

export type ServerButtonType = {
  icon: React.ReactNode;
  text: string;
};

export default function ServerButton({ icon, text }: ServerButtonType) {
  const [isSelected, setIsSelected] = useState(true);

  const sidebarOnClick = (_: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(!isSelected);
  };

  return (
    <Button
      className=" group mb-2 flex content-center items-center justify-center"
      onClick={sidebarOnClick}
    >
      <div
        className={
          (isSelected ? "h-10" : "h-0 group-hover:h-5") +
          " absolute left-0 w-1 rounded-r-lg bg-white transition-all duration-300 ease-in-out"
        }
      ></div>
      <div
        className={twJoin(
          isSelected
            ? "rounded-2xl bg-primary text-white"
            : "rounded-3xl bg-secondary",
          "relative mx-auto flex h-12 w-12 cursor-pointer items-center justify-center p-1 text-foreground shadow-lg transition-all duration-300 ease-linear last:mt-auto hover:rounded-2xl hover:bg-primary hover:text-white"
        )}
      >
        {icon}
        <Tooltip direction="right" margin={16}>
          {text}
        </Tooltip>
      </div>
    </Button>
  );
}
