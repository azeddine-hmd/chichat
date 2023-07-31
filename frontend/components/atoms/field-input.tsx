import React from "react";
import { twMerge } from "tailwind-merge";

export type FieldInputProps = React.ComponentProps<"input"> & {
  placeholder?: string;
  innerRef?: React.RefObject<HTMLInputElement>;
};

export default function FieldInput({ className, placeholder = "", type = "text", ref, innerRef, ...restProps }: FieldInputProps) {
  return (
    <input
      className={twMerge("h-full w-full cursor-pointer bg-transparent text-2xl text-muted-field focus:outline focus:outline-offset-2 focus:outline-4 focus:outline-cyan-500 rounded-sm", className)}
      type={type}
      placeholder={placeholder}
      ref={innerRef}
      {...restProps}
    />
  );
}
