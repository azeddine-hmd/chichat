import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atoms/button";

export type PrimaryButtonProps = {
  children?: React.ReactNode;
  active?: boolean;
  hover?: boolean;
  innerRef?: React.RefObject<HTMLButtonElement>;
} & React.ComponentProps<"button">;

export default function PrimaryButton({
  children,
  className,
  active = false,
  hover = false,
  innerRef,
  ...restProps
}: PrimaryButtonProps) {
  return (
    <Button
      className={twMerge(
        "flex items-center justify-start rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:bg-primary/30 disabled disabled:cursor-not-allowed",
        active && "bg-[#4E5058]/60 text-white",
        hover && "bg-[#4E5058]/60 text-foreground",
        className
      )}
      {...restProps}
      innerRef={innerRef}
    >
      {children}
    </Button>
  );
}
