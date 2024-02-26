import { cn } from "@/lib/cn";
import React from "react";

export type ButtonProps = React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, ...restProps },
  forwardedRef
) {
  return (
    <button
      className={cn(
        "rounded-lg bg-transparent text-muted outline-none",
        className
      )}
      ref={forwardedRef}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
});

export default Button;
