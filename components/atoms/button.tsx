"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export default function Button({
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={twMerge("rounded-lg bg-transparent text-muted", className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
