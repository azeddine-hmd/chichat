"use client";

import React, { useContext } from "react";
import { BsQuestion } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import Button from "../atoms/button";
import { GlobalContext } from "@/client-context/global";

export type FloatingShortcutHelperType = {
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function FloatingShortcutHelper({
  children,
  className,
}: FloatingShortcutHelperType) {
  const shortcutHelpPopup = useContext(GlobalContext)!!.shortcutHelpPopup;

  return (
    <Button
      className={twMerge(
        "fixed bottom-0 right-0 mb-8 mr-8 flex h-12 w-12 motion-safe:animate-bounce-slow items-center justify-center rounded-3xl bg-gradient-to-b from-[#a1a1a1] to-gray-200 text-gray-700 shadow-neutral-800 backdrop-blur-md",
        className
      )}
      onClick={(e) => shortcutHelpPopup.set(true)}
    >
      <BsQuestion size="48" />
    </Button>
  );
}
