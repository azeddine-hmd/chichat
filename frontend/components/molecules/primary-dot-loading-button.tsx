import React, { MouseEvent, useState } from "react";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";
import DotLoading from "../atoms/dot-loading";
import { twMerge } from "tailwind-merge";

export type PrimaryDotLoadingButtonProps = {
  children?: React.ReactNode;
  onButtonClicked: (
    event: MouseEvent<HTMLButtonElement>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
} & PrimaryButtonProps;

export default function PrimaryDotLoadingButton({
  children,
  onButtonClicked,
  onClick,
  className,
  ...restProps
}: PrimaryDotLoadingButtonProps) {
  const [onLoading, setOnLoading] = useState(false);

  const continueOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onLoading) return;
    onButtonClicked(event, setOnLoading);
  };

  return (
    <PrimaryButton
      className={twMerge(
        "text-md flex items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 disabled:bg-primary/30 disabled:text-white/30 disabled:cursor-not-allowed",
        className
      )}
      onClick={continueOnClick}
      {...restProps}
    >
      {!onLoading ? <>{children}</> : <DotLoading dotClassName="h-2 w-2" />}
    </PrimaryButton>
  );
}
