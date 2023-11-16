import { State } from "@/models/state";
import { createContext } from "react";

export type GlobalContext = {
  searchPopup: State<boolean>;
  shortcutHelpPopup: State<boolean>;
  floatingShortcut: State<boolean>;
}

export const GlobalContext = createContext<GlobalContext | null>(null);
