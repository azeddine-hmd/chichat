import React from "react";
import Button, { ButtonProps } from "../atoms/button";
import { cn } from "@/lib/cn";

export type PrimaryButtonProps = {
  active?: boolean;
  hover?: boolean;
} & ButtonProps;



// "flex items-center justify-start rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 ││focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:bg-pri││mary/30 disabled disabled:cursor-not-allowed",

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(
    { children, className, active = false, hover = false, ...restProps },
    forwardedRef
  ) {
    return (
      <Button
        className={cn(
          "flex h-10 items-center justify-start rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-primary/30", {
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

export default PrimaryButton;
