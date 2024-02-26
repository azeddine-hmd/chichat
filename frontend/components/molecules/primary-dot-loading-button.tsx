import React, { MouseEvent } from "react";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";
import DotLoading from "../atoms/dot-loading";
import { cn } from "@/lib/cn";

export type PrimaryDotLoadingButtonProps = {
  onLoading: boolean;
} & PrimaryButtonProps;

const PrimaryLoadingButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryDotLoadingButtonProps
>(function PrimaryLoadingButton(
  { children, onLoading, onClick, className, ...restProps },
  forwardedRef
) {
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onLoading) return;
    onClick?.(e);
  };

  return (
    <PrimaryButton
      className={cn(
        "text-md flex items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 active:text-foreground/90 disabled:cursor-not-allowed disabled:bg-primary/30 disabled:text-white/30",
        className
      )}
      onClick={onButtonClick}
      ref={forwardedRef}
      {...restProps}
    >
      {!onLoading ? <>{children}</> : <DotLoading dotClassName="h-2 w-2" />}
    </PrimaryButton>
  );
});

export default PrimaryLoadingButton;
