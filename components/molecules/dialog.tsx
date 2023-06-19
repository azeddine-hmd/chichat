import React, { MouseEvent, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { SearchDialogContext } from "../templates/base-template";

type DialogProps = {
  children: React.ReactNode;
} & React.ComponentProps<"div">;

export default function Dialog({
  children,
  className,
  onClick,
  ...restProps
}: DialogProps) {
  const setOpenSearchDialog = useContext(SearchDialogContext)!!;

  const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick)
      onClick(event);
    setOpenSearchDialog(false);
    event.stopPropagation();
  }
  return (
    <div
      className={twMerge(
        "fixed flex inset-0 w-full max-h-screen flex-col items-center justify-center bg-black/80 py-10",
        className
      )}
      onClick={onClickHandler}
      {...restProps}
    >
      {children}
    </div>
  );
}
