import React from "react";
import { twMerge } from "tailwind-merge";

export type LabelProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function Label({ children, className }: LabelProps) {
  return (
    <label className={twMerge("box-border w-full text-xs font-bold text-muted", className)} >
      {children}
    </label>
  );
}
