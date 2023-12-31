import { MutableRefObject, useEffect } from "react";

function useOutsideElement(ref: MutableRefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: globalThis.MouseEvent) => {
      if (!ref.current?.contains(e.target as Node))
        handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
    // eslint-disable-next-line
  }, []);
}

export default useOutsideElement;
