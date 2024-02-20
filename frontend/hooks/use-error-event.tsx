import { useEvent } from "./use-event";

export default function useErrorEvent(callback: (error: string | string[]) => void) {
  useEvent("error", (...args: any[]) => {
    console.log("socket error:", args[0]);
    callback(args[0]);
  });
}
