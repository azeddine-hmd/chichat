import React from "react";
import { twMerge } from "tailwind-merge";

type DotLoadingProps = React.ComponentProps<"div"> & {
  dotClassName?: string;
};

export default function DotLoading({
  className,
  dotClassName,
}: DotLoadingProps) {
  return (
    <div className={twMerge("flex space-x-2", className)}>
      <div className={twMerge( "h-4 w-4 animate-pulse rounded-full bg-white", dotClassName)} />
      <div className={twMerge( "h-4 w-4 animate-pulse rounded-full bg-white", dotClassName)} />
      <div className={twMerge( "h-4 w-4 animate-pulse rounded-full bg-white", dotClassName)} />
    </div>
  );
}
