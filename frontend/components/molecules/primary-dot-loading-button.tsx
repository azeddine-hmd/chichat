import React, { MouseEvent } from "react";
import { PrimaryButtonProps } from "./primary-button";
import DotLoading from "../atoms/dot-loading";
import { twMerge } from "tailwind-merge";
import IconButton from "./icon-button";

export type PrimaryDotLoadingButtonProps = {
  children?: React.ReactNode;
  onLoading: boolean;
} & PrimaryButtonProps;

export default function PrimaryDotLoadingButton({
  children,
  onLoading,
  onClick,
  className,
  ...restProps
}: PrimaryDotLoadingButtonProps) {

  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onLoading) return;
    onClick?.(e);
  };

  return (
    <IconButton
      className={twMerge(
        "text-md flex items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 active:text-foreground/90 disabled:bg-primary/30 disabled:text-white/30 disabled:cursor-not-allowed",
        className
      )}
      onClick={onButtonClick}
      {...restProps}
    >
      {!onLoading ? <>{children}</> : <DotLoading dotClassName="h-2 w-2" />}
    </IconButton>
  );
}
