import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type FieldInputProps = React.ComponentProps<"input"> & {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

export default function FieldInput({ className, placeholder, type = "text", inputRef ,...restProps }: FieldInputProps) {
  return (
    <input
      className={twMerge("h-full w-full cursor-pointer bg-transparent text-2xl text-muted-field focus:outline-none", className)}
      type={type}
      placeholder={placeholder}
      ref={inputRef}
      {...restProps}
    />
  );
}
