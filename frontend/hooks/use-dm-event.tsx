import { SingleDm } from "@/types/single-dm";
import { useEvent } from "./use-event";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import { useRouter } from "next/navigation";

export function useDmEvent() {
  const { setItem } = useActiveChannelItemContext();
  const router = useRouter();

  useEvent("dm:enter:single", (...args) => {
    console.log("dm:enter:single: received!");
    const singleDm: SingleDm = args[0];
    console.log("singleDm received:", singleDm);
    setItem(singleDm);
    router.push(`/channels/me/${singleDm.id}`);
  });
}
