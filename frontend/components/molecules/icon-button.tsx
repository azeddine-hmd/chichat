import React from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atoms/button";

export type IconButtonProps = {
  children?: React.ReactNode;
  active?: boolean;
  hover?: boolean;
  innerRef?: React.RefObject<HTMLButtonElement>;
} & React.ComponentProps<"button">;

export default function IconButton({
  children,
  className,
  active = false,
  hover = false,
  innerRef,
  ...restProps
}: IconButtonProps) {
  return (
    <Button
      className={twMerge(
        "flex h-fit w-fit items-center justify-start rounded-[4px] rounded-s px-2 hover:bg-[#4E5058]/60 hover:text-foreground active:bg-[#4E5058]/60 active:text-white",
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
