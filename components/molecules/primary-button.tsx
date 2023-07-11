import React, { ButtonHTMLAttributes, MouseEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atoms/button";

export type PrimaryButtonProps = {
  children?: React.ReactNode;
  active?: boolean;
} & React.ComponentProps<"button">;

export default function PrimaryButton({ children, className, active = false }: PrimaryButtonProps) {
  return (
    <Button className={twMerge("rounded-[4px] flex justify-start items-center px-2 rounded-s w-full h-8 hover:bg-[#4E5058]/60 hover:text-foreground active:bg-[#4E5058]/60 active:text-white", className, (active && "bg-[#4E5058]/60 text-white"))} 
    >
      {children}
    </Button>
  );
}
