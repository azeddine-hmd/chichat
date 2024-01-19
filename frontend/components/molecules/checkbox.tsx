import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "@/lib/cn";

export type CheckboxProps = {
  children?: React.ReactNode;
} & RadixCheckbox.CheckboxProps;

export default function Checkbox({
  children,
  className,
  onClick,
  ...restProps
}: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className={cn(
        "h-6 w-6 rounded-md border-2 border-gray-400/40 bg-transparent flex justify-center items-center data-[state=checked]:text-primary data-[state=checked]:border-primary",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...restProps}
    >
      {children}
    </RadixCheckbox.Root>
  );
}

Checkbox.Indicator = RadixCheckbox.Indicator;
