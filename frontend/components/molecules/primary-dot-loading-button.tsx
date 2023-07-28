import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import PrimaryButton, { PrimaryButtonProps } from "./primary-button";
import DotLoading from "../atoms/dot-loading";

export type PrimaryDotLoadingButtonProps = {
  children?: React.ReactNode;
  onButtonClicked: (event: MouseEvent<HTMLButtonElement>, setLoadingState: Dispatch<SetStateAction<boolean>>) => void;
} & PrimaryButtonProps;

export default function PrimaryDotLoadingButton({
  children,
  onButtonClicked,
  onClick,
  ...restProps
}: PrimaryDotLoadingButtonProps) {
  const [onLoading, setOnLoading] = useState(false);

  const continueOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onLoading) return;
    onButtonClicked(event, setOnLoading);
  };


  return (
    <PrimaryButton
      className="text-md mt-5 flex h-[44px] items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 "
      onClick={continueOnClick}
      {...restProps}
    >
      {!onLoading ? <>{children}</> : <DotLoading dotClassName="h-2 w-2" />}
    </PrimaryButton>
  );
}
