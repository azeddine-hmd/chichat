"use client";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import ServerSidebar from "@/components/organisms/server-sidebar";
import React, { useState } from "react";
import { GlobalContext } from "@/app/global-context";
import DefaultContentChannel from "@/components/molecules/default-content-channel";
import ChannelSidebar from "@/components/organisms/channel-sidebar";

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
          <ChannelSidebar >
              <DefaultContentChannel />
          </ChannelSidebar>
          {children}
        </div>
      </GlobalContext.Provider>
    </div>
  );
}
