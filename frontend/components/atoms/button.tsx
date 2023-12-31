"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  children?: React.ReactNode;
  innerRef?: React.LegacyRef<HTMLButtonElement> | undefined
} & React.ComponentProps<"button">;

export default function Button({
  children,
  className,
  innerRef,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={twMerge("outline-none rounded-lg bg-transparent text-muted", className)}
      ref={innerRef}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
}
