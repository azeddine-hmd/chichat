import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type FloatingCardProps = {
  children?: React.ReactNode;
  direction: "top" | "left" | "right" | "bottom";
  showCard: React.Dispatch<React.SetStateAction<boolean>>;
} & React.ComponentProps<"div">;

export default function FloatingCard({
  children,
  className,
  direction,
  showCard,
  ...restProps
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== "dropdown-arrow"
      ) {
        showCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showCard]);

  return (
    <div
      className={twMerge(
        "absolute inset-0 max-h-[215px] w-full overflow-y-auto border border-gray-850 bg-gray-700 text-muted shadow-lg",
        direction == "top" && "-translate-y-full",
        className
      )}
      ref={ref}
      {...restProps}
    >
      {children}
    </div>
  );
}
