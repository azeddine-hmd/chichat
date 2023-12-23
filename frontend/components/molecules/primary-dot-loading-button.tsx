import React, { MouseEvent } from "react";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";
import DotLoading from "../atoms/dot-loading";
import { twMerge } from "tailwind-merge";

export type PrimaryDotLoadingButtonProps = {
  children?: React.ReactNode;
  onLoading: boolean;
  innerRef?: React.RefObject<HTMLButtonElement>;
} & PrimaryButtonProps;

export default function PrimaryLoadingButton({
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
    <PrimaryButton
      className={twMerge(
        "text-md flex items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 active:text-foreground/90 disabled:bg-primary/30 disabled:text-white/30 disabled:cursor-not-allowed",
        className,
      )}
      onClick={onButtonClick}
      {...restProps}
    >
      {!onLoading ? <>{children}</> : <DotLoading dotClassName="h-2 w-2" />}
    </PrimaryButton>
  );
}
