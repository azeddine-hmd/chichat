import { cn } from "@/lib/cn";
import React from "react";

export type MenuPopoverContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function MenuPopoverContainer({ children, className }: MenuPopoverContainerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-between space-y-1 overflow-scroll bg-black p-2 text-xs font-semibold text-[#dbdfe2] shadow-md", className)}>
      {children}
    </div>
  );
}
