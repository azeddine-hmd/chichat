"use client";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import Channelbar from "@/components/organisms/channelbar";
import ServerSidebar from "@/components/organisms/server-sidebar";
import FloatingShortcutHelper from "@/components/molecules/floating-shortcut-helper";
import QuickSearchPopup from "@/components/organisms/quick-search-popup";
import ShortcutPopup from "@/components/organisms/shortcut-popup";
import React, { useState } from "react";
import { GlobalContext } from "@/app/global-context";

export default function HomeLayout({
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
    <div className="h-full w-full">
      <GlobalContext.Provider value={globalContext}>
        <div className="flex h-full w-full">
          <ServerSidebar />
          <Channelbar />
          {children}
          <div className="h-full w-32 bg-gray-700" />
          {isFloatingShortcutHelperOpen && <FloatingShortcutHelper />}
        </div>
        {isSearchPopupOpen && <QuickSearchPopup />}
        {isShortcutHelpPopupOpen && <ShortcutPopup />}
      </GlobalContext.Provider>
    </div>
  );
}
