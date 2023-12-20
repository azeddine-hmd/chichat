import React from "react";
import { twMerge } from "tailwind-merge";

export type FieldInputProps = React.ComponentProps<"input"> & {
  placeholder?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  isError?: boolean;
  isSuccess?: boolean;
};

export default function FieldInput({
  className,
  placeholder = "",
  type = "text",
  ref,
  isError = false,
  isSuccess = false,
  innerRef,
  maxLength = 37,
  ...restProps
}: FieldInputProps) {
  return (
      <input
        className={twMerge(
          "h-full w-full cursor-pointer rounded-sm bg-transparent text-2xl text-muted-field file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-300 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-500",
          isError && "border border-red-500 focus:outline-none focus:outline-0",
          isSuccess && "border border-green-500 focus:outline-none focus:outline-0",
          className,
        )}
        type={type}
        placeholder={placeholder}
        ref={innerRef}
        maxLength={maxLength}
        {...restProps}
      />
  );
}
