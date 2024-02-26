import { KeyboardEvent, useEffect } from "react";

export type Key = 
  "ctrl" |
  "shift" |
  "alt"|
  "ArrowDown" |
  "ArrowUp" |
  "Escape" |
  "Enter" |
  string;

export type KeyboardInputEvent = {
  keys: Array<Key>;
  callback: (event: any) => void;
};

export function useKeyboardShortcut(keyboardInputEvent: KeyboardInputEvent, disableScrollEvent: boolean = false) {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const {keys, callback} = keyboardInputEvent;
      if (keys.every((key) => {
        return (key === "ctrl" && event.ctrlKey) ||
          (key === "shift" && event.shiftKey) ||
          (key === "alt" && event.altKey) ||
          (key === "ArrowUp" && event.key === key) ||
          (key === "ArrowDown" && event.key === key) ||
          (key === "Escape" && event.key === key) ||
          (key === "Enter" && event.key === key) ||
          (typeof key === "string" && event.key.toLowerCase() === key);
        })
      ) {
        callback(event);
      } else {
      }
      if (disableScrollEvent)
        event.stopPropagation();
    };

    window.addEventListener("keypress", handleKeyDown)
    return () => {
      window.removeEventListener("keypress", handleKeyDown);
    };

    // eslint-disable-next-line
  }, [keyboardInputEvent]);
}
