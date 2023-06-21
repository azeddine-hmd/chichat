"use client";

import { useState } from "react";
import Channelbar from "../organisms/channelbar";
import ServerSidebar from "../organisms/server-sidebar";
import { GlobalContext } from "@/client-context/global";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import ShortcutPopup from "../organisms/shortcut-popup";
import FloatingShortcutHelper from "../molecules/floating-shortcut-helper";
import QuickSearchPopup from "../organisms/quick-search-popup";

type BaseTemplateType = {
  children: React.ReactNode;
};

export default function BaseTemplate({ children }: BaseTemplateType) {
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
  }

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

  useKeyboardShortcut

  return (
    <div>
      <GlobalContext.Provider value={globalContext} >
        <div className="flex">
          <ServerSidebar />
          <Channelbar />
          {children}
          <main className="w-32">
            <div className="h-full w-full bg-gray-700" />
          </main>
          {isFloatingShortcutHelperOpen && <FloatingShortcutHelper /> }
        </div>
        {isSearchPopupOpen && <QuickSearchPopup />}
        {isShortcutHelpPopupOpen && <ShortcutPopup />}
      </GlobalContext.Provider>
    </div>
  );
}
