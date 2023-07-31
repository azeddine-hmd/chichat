import React from "react";
import Label from "../atoms/label";
import FieldInput, { FieldInputProps } from "../atoms/field-input";
import { twMerge } from "tailwind-merge";

export type LabelInputFieldProps = {
  children?: React.ReactNode;
  placeholder?: string;
  type?: string;
  error?: string;
} & React.ComponentProps<"input">;

export default function FormField({
  children,
  placeholder = "",
  type = "text",
  error,
  className,
  ...restProps
}: LabelInputFieldProps) {
  return (
    <div>
      <Label>{children}
        {error === "Required" && (<>&nbsp;&nbsp;<span className="text-red-400" >*</span></>)}
        {error && error !== "Required" && <span className="text-red-400" >&nbsp;&nbsp;-&nbsp;&nbsp;{error}</span>}
      </Label>
      <FieldInput
        className={twMerge("text-md mb-3 mt-2 h-10 w-full bg-gray-850 p-2 text-foreground")}
        placeholder={placeholder}
        type={type}
        {...restProps}
      />
    </div>
  );
}
