import React from "react";
import Button from "../atoms/button";
import { cn } from "@/lib/cn";

export type IconButtonProps = {
  active?: boolean;
  hover?: boolean;
} & React.ComponentPropsWithRef<"button">;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      children,
      className,
      active = false,
      hover = false,
      ...restProps
    }: IconButtonProps,
    forwardedRef
  ) {
    return (
      <Button
        className={cn(
          "flex h-fit w-fit items-center justify-start rounded px-2 hover:bg-[#4E5058]/60 hover:text-foreground active:bg-[#4E5058]/60 active:text-white",
          {
            "bg-[#4E5058]/60 text-white": active,
            "bg-[#4E5058]/60 text-foreground": hover,
          },
          className
        )}
        {...restProps}
        ref={forwardedRef}
      >
        {children}
      </Button>
    );
  }
);

export default IconButton;
