import React, { ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";

export type TooltipProps = {
  children: ReactNode;
} & RadixTooltip.TooltipProps;

export default function Tooltip({ children, ...restProps}: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root {...restProps}>
        {children}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

export type TooltipContentProps = {
  content: string;
} & RadixTooltip.TooltipContentProps;

function TooltipContent({
  children,
  className,
  content,
  ...restProps
}: TooltipContentProps) {
  return (
    <>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className={cn(
            "rounded-md bg-black p-2 px-3 text-xs font-semibold text-[#dbdfe2] shadow-md",
            className
          )}
          {...restProps}
        >
          {content}
          <RadixTooltip.Arrow />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </>
  );
}

Tooltip.Trigger = RadixTooltip.Trigger;
Tooltip.Content = TooltipContent;
