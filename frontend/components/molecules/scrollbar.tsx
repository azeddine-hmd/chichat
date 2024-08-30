import { cn } from "@/lib/cn";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { useState } from "react";

export default function ScrollArea({
  children,
  className,
  ...restProps
}: ScrollAreaPrimitive.ScrollAreaProps & { children: React.ReactNode }) {
  return (
    <ScrollAreaPrimitive.Root className={cn("scroll-area", className)} {...restProps}>
      {children}
    </ScrollAreaPrimitive.Root>
  );
}

ScrollArea.ScrollBar = function ScrollBar({
  className,
  ...restProps
}: ScrollAreaPrimitive.ScrollAreaScrollbarProps) {
  return (
    <>
      <ScrollAreaPrimitive.Scrollbar
        className={cn(
          "group duration-[160ms] flex touch-none select-none p-0.5 transition-colors ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-[7px] data-[orientation=vertical]:hover:w-2.5 data-[orientation=horizontal]:flex-col",
          className
        )}
        {...restProps}
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-black" />
    </>
  );
};

ScrollArea.Viewport = ScrollAreaPrimitive.Viewport;
