import { GlobalContext } from "@/client-context/global";
import React, { MouseEvent, useContext } from "react";
import { twMerge } from "tailwind-merge";

type PopupProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export default function Popup({
  children,
  className,
  onClick,
  ...restProps
}: PopupProps) {
  const searchPopup = useContext(GlobalContext)!!.searchPopup;

  const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick)
      onClick(event);
    event.stopPropagation();
  }
  return (
    <div
      className={twMerge(
        "fixed flex inset-0 w-full max-h-screen flex-col items-center justify-center py-10",
        className
      )}
      onClick={onClickHandler}
      {...restProps}
    >
      {children}
    </div>
  );
}
