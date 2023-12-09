import React, { ChangeEvent } from "react";
import Field from "../atoms/field";
import FieldInput, { FieldInputProps } from "../atoms/field-input";
import { twJoin, twMerge } from "tailwind-merge";

type SearchFieldType = {
  children?: React.ReactNode;
  className?: string;
  onTextChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  fieldInputProps?: FieldInputProps;
  fieldInputClassName?: string;
} & React.ComponentProps<"div">;

export default function SearchField({
  children,
  className,
  fieldInputClassName,
  onTextChanged,
  fieldInputProps,
  ...restProps
}: SearchFieldType) {
  return (
    <Field
      className={twMerge("p-3", className)}
      onClick={(e) => e.stopPropagation()}
      {...restProps}
    >
      <FieldInput
        className={twJoin(
          "text-white focus:outline-transparent",
          fieldInputClassName
        )}
        placeholder="Where would you like to go?"
        onChange={onTextChanged}
        autoFocus
        {...fieldInputProps}
      />
      {children}
    </Field>
  );
}
