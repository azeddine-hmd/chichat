"use client";

import { cn } from "@/lib/cn";
import React from "react";

export type FieldInputProps = React.ComponentProps<"textarea"> & {
  innerRef?: React.RefObject<HTMLTextAreaElement>;
  isError?: boolean;
  isSuccess?: boolean;
};

export default function FieldInputArea({
  className,
  ref,
  isError = false,
  isSuccess = false,
  innerRef,
  maxLength = 37,
  rows,
  ...restProps
}: FieldInputProps) {
  return (
      <textarea
        className={cn(
          "h-full w-full cursor-pointer rounded-sm bg-transparent text-2xl text-muted-field file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-300 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500", 
          {
            "border border-red-500 focus:outline-none focus:outline-0": isError,
            "border border-green-500 focus:outline-none focus:outline-0": isSuccess,
          },
          className,
        )}
        ref={innerRef}
        maxLength={maxLength}
        {...restProps}
      />
  );
}
