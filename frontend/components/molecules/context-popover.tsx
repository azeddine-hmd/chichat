import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "@/lib/cn";

export type ContextPopoverProps = {
  children?: React.ReactNode;
  open: boolean;
};

export default function ContextPopover({
  children,
  open,
}: ContextPopoverProps) {
  return <RadixPopover.Root open={open}>{children}</RadixPopover.Root>;
}

export type ContextPopoverNewContent = {
  position?: { x: number; y: number };
  clickOutside: () => void;
} & RadixPopover.PopperContentProps;

function ContextPopoverContent({
  children,
  position,
  className,
  clickOutside,
  ...restProps
}: ContextPopoverNewContent) {
  return (
    <>
      {position && (
        <RadixPopover.Anchor
          className="h-0 w-0"
          style={{
            position: "fixed",
            top: position?.y,
            left: position?.x,
            transformOrigin: "left",
          }}
        ></RadixPopover.Anchor>
      )}
      <RadixPopover.Portal>
        <RadixPopover.Content
          id="content"
          className={cn(
            "flex flex-col items-center justify-between space-y-1 overflow-scroll bg-black p-2 text-xs font-semibold text-[#dbdfe2] shadow-md",
            className
          )}
          onPointerDownOutside={(_) => {
            clickOutside();
          }}
          {...restProps}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </>
  );
}

ContextPopover.Content = ContextPopoverContent;
ContextPopover.Trigger = RadixPopover.Trigger;
