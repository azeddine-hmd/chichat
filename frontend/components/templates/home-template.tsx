"use client";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import React, { useEffect, useState } from "react";
import { GlobalContext } from "@/app/global-context";
import { useRelationEvent } from "@/hooks/use-relation-event";
import { useRouter } from "next/navigation";
import { useEvent } from "@/hooks/use-event";

export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchPopupOpen, openSearchPopup] = useState(false);
  const [isShortcutHelpPopupOpen, openShortcutHelpPopup] = useState(false);
  const [isFloatingShortcutHelperOpen, showFloatingShortcut] = useState(true);
  const router = useRouter();

  useRelationEvent();

  useEvent("chatroom:direct:enter", (...args) => {
    console.log("chatroom:enter:", args[0]);
    const chatRoomId: string = args[0];
    router.push("/channels/me/" + chatRoomId);
  });

  useEffect(() => {
    console.log("emitting to event: relation");
    window.clientSocket.emit("relation");
  }, []);

  const globalContext: GlobalContext = {
    searchPopup: {
      state: isSearchPopupOpen,
      set: openSearchPopup,
    },
    shortcutHelpPopup: {
      state: isShortcutHelpPopupOpen,
      set: openShortcutHelpPopup,
    },
    floatingShortcut: {
      state: isFloatingShortcutHelperOpen,
      set: showFloatingShortcut,
    },
  };

  useKeyboardShortcut({
    keys: ["ctrl", "alt", "p"],
    callback() {
      openSearchPopup(true);
    },
  });

  useKeyboardShortcut({
    keys: ["Escape"],
    callback() {
      if (isSearchPopupOpen) openSearchPopup(false);
      if (isShortcutHelpPopupOpen) openShortcutHelpPopup(false);
    },
  });

  useKeyboardShortcut({
    keys: ["shift", "?"],
    callback() {
      openShortcutHelpPopup(true);
    },
  });

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
}
