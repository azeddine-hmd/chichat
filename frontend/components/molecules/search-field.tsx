import React, { ChangeEvent } from "react";
import Field from "../atoms/field";
import FieldInput from "../atoms/field-input";
import { twMerge } from "tailwind-merge";

type SearchFieldType = {
  className?: string;
  onTextChanged: (event: ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"button">;

export default function SearchField({ className, onTextChanged, ...restProps }: SearchFieldType) {
  return (
    <Field
      className={twMerge("h-[70px] p-3", className)}
      onClick={ e => e.stopPropagation() }
      {...restProps}
    >
      <FieldInput
        className="text-white"
        placeholder="Where would you like to go?"
        onChange={onTextChanged}
        autoFocus
      />
    </Field>
  );
}

