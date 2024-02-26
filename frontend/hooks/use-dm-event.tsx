import { useEvent } from "./use-event";
import { useRouter } from "next/navigation";

export function useDmEvent() {
  const router = useRouter();

  useEvent("dm:single:enter", (...args) => {
    console.log("dm:single:enter:", args[0]);
    const singleDmId: string = args[0];
    router.push("/channels/me/" + singleDmId);
  });
}
