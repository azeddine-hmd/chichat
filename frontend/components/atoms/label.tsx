import React from "react";
import { twMerge } from "tailwind-merge";

export type LabelProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function Label({ children, className }: LabelProps) {
  return (
    <h3 className={twMerge("mb-2 w-full text-xs font-semibold text-muted", className)} >
      {children}
    </h3>
  );
}
