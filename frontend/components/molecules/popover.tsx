import React, { useRef } from "react";
import * as RadixPopover from "@radix-ui/react-popover";

export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";
export type Point = { x: number; y: number };

export type PopoverProps = {
  children?: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  close: () => void;
  position?: Point;
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
};

export default function Popover({
  children,
  content,
  open,
  close,
  position,
  side = "top",
  sideOffset = 0,
  align = "center",
  alignOffset = 0,
}: PopoverProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <RadixPopover.Root open={open}>
      {children != undefined && <RadixPopover.Trigger ref={triggerRef} asChild>{children}</RadixPopover.Trigger>}
      {position && (
        <RadixPopover.Anchor
          className="h-0 w-0"
          style={{
            position: "fixed",
            top: position.y,
            left: position.x,
            transformOrigin: "right",
          }}
        />
      )}
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="flex flex-col items-center justify-between space-y-1 overflow-scroll bg-black p-2 text-xs font-semibold text-[#dbdfe2] shadow-md"
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          onPointerDownOutside={(e) => {
            if (!triggerRef.current?.contains(e.target as Node))
              close();
          }}
          asChild
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

Popover.Trigger = function PopoverTrigger({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
};
