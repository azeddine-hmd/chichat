"use client";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import React, { useState } from "react";
import { GlobalContext } from "@/app/global-context";

export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchPopupOpen, openSearchPopup] = useState(false);
  const [isShortcutHelpPopupOpen, openShortcutHelpPopup] = useState(false);
  const [isFloatingShortcutHelperOpen, showFloatingShortcut] = useState(true);

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
    callback(_) {
      openSearchPopup(true);
    },
  });

  useKeyboardShortcut({
    keys: ["Escape"],
    callback(_) {
      if (isSearchPopupOpen) openSearchPopup(false);
      if (isShortcutHelpPopupOpen) openShortcutHelpPopup(false);
    },
  });

  useKeyboardShortcut({
    keys: ["shift", "?"],
    callback(event) {
      openShortcutHelpPopup(true);
    },
  });

  return (
    <GlobalContext.Provider value={globalContext}>
      {children}
    </GlobalContext.Provider>
  );
}

