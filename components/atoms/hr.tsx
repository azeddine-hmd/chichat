import React from "react";
import { twMerge } from "tailwind-merge";

export type HrType = {
  children?: React.ReactNode;
} & React.ComponentProps<"hr">;

export default function Hr({ children, className }: HrType) {
  return (
    <hr className={twMerge("rounded[1px] border border-gray-500", className)} >
      {children}
    </hr>
  );
}
