import React from "react";
import Button, { ButtonProps } from "../atoms/button";
import { cn } from "@/lib/utils";

export type PopoverButtonProps = ButtonProps;

export default function PopoverButton({
  className,
  children,
  ...restProps
}: PopoverButtonProps) {
  return (
    <Button
      className={cn(
        "min-w-[10rem] rounded-sm p-2 pr-2  text-left text-[14px]  font-[300] text-white  hover:bg-primary hover:text-white",
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
