import { useEffect } from "react";

export type Key = 
  "ctrl" |
  "shift" |
  "alt"|
  "ArrowDown" |
  "ArrowUp" |
  string;

export type KeyboardInputEvent = {
  keys: Array<Key>;
  callback: () => void;
};

export function useKeyboardShortcut(keyboardInputEvent: KeyboardInputEvent) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if (event.repeat) {
      //   console.log("key repeated!");
      //   return;
      // }
      const {keys, callback} = keyboardInputEvent;
      if (keys.every((key) => {
        return (key === "ctrl" && event.ctrlKey) ||
          (key === "shift" && event.shiftKey) ||
          (key === "alt" && event.altKey) ||
          (key === "ArrowUp" && event.key === key) ||
          (key === "ArrowDown" && event.key === key) ||
          (typeof key === "string" && event.key.toLowerCase() === key);
        })
      ) {
        callback();
      } else {
        // console.log(`unknown key: ${event.key}`);
      }
    };

  // console.log("adding event: useKeyboardShortcut");
	window.addEventListener("keydown", handleKeyDown);
    return () => {
      // console.log("removing event: useKeyboardShortcut");
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [keyboardInputEvent]);
}
