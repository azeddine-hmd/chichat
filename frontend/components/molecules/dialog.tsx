import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export type DialogContentProps = {
  children?: React.ReactNode;
  className?: string;
} & DialogPrimitive.DialogContentProps;

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent({ children, className, ...restProps }, forwardedRef) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed bottom-0 left-0 right-0 top-0 grid place-items-center overflow-y-auto bg-black bg-opacity-[0.5]" />
      <DialogPrimitive.Content
        ref={forwardedRef}
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4px] p-[30px] focus:outline-none",
          className
        )}
        {...restProps}
      >
        {children}
        <DialogPrimitive.Close aria-label="close" />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
