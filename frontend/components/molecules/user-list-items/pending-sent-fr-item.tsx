import Button from "@/components/atoms/button";
import { api } from "@/config";
import { delay } from "@/lib/delay";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { BsX } from "react-icons/bs";
import Tooltip from "../tooltip";

export default function PendingSentFRItem({ user }: { user: User }) {
  const { pendingFR, setPendingFR } = useUserStore();
  const cancelFRMut = useMutation({
    mutationFn: async () => {
      await delay(500);
      return await api.delete(`/api/users/friends/cancel/${user.username}`);
    },
    onSuccess: () => {
      if (pendingFR)
        setPendingFR(
          pendingFR.filter((profile) => profile.username !== user.username)
        );
    },
  });

  return (
    <>
      <Tooltip>
        <Tooltip.Content content="Cancel" side="top" sideOffset={2} />
        <Tooltip.Trigger asChild>
          <Button
            className="bg-grey-800 group/reject group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
            disabled={cancelFRMut.isPending}
            onClick={(e) => cancelFRMut.mutate()}
          >
            <BsX className="text-lg group-hover/reject:fill-red-500" />
          </Button>
        </Tooltip.Trigger>
      </Tooltip>
    </>
  );
}
