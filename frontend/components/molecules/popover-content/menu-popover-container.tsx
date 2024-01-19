import React from "react";

export type MenuPopoverContainerProps = {
  children?: React.ReactNode;
};

export default function MenuPopoverContainer({ children }: MenuPopoverContainerProps) {
  return (
    <div className="flex flex-col items-center justify-between space-y-1 overflow-scroll bg-black p-2 text-xs font-semibold text-[#dbdfe2] shadow-md">
      {children}
    </div>
  );
}
