import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

export type ContextPopoverProps = RadixPopover.PopoverProps;

export default function Popover({ children, ...restProps }: ContextPopoverProps) {
  return (
    <RadixPopover.Root {...restProps}>{children}</RadixPopover.Root>
  );
}

export type ContextPopoverNewContent = {
  position?: { x: number; y: number };
  clickOutside?: () => void;
} & RadixPopover.PopoverContentProps;

function PopoverContent({
  children,
  position,
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
          onPointerDownOutside={(_) => {
            clickOutside?.();
          }}
          {...restProps}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </>
  );
}

Popover.Content = PopoverContent;
Popover.Trigger = RadixPopover.Trigger;
