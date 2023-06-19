"use client";

import { twMerge } from "tailwind-merge";
import React from "react";
import Button, { ButtonProps } from "./button";

export type FieldProps = ButtonProps;

export default function Field({
  children,
  className,
  ...restProps
}: FieldProps) {

  return (
    <Button
      className={twMerge(
        "flex h-full w-full cursor-pointer items-center justify-start rounded-[4px] bg-gray-900 px-1 font-sans text-sm leading-[24px] text-muted-field",
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
