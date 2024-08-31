import Button from "@/components/atoms/button";
import { User } from "@/models/user";
import { BsPersonDashFill } from "react-icons/bs";
import Tooltip from "../tooltip";
import { MouseEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config";
import { useUserStore } from "@/stores/user-store";

export default function BlockedItem({ user }: { user: User }) {
  const { blocked, setBlocked } = useUserStore();

  const unblockUserMut = useMutation({
    mutationFn: async () => {
      return await api.patch(`/api/users/unblock/${user.id}`);
    },
    onSuccess: () => {
      setBlocked(blocked.filter((blockedUser) => blockedUser.id != user.id));
    },
  });

  const onUnblockClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    unblockUserMut.mutate();
  };

  return (
    <>
      <Tooltip>
        <Tooltip.Content content="Unblock" sideOffset={2} />
        <Button
          className="bg-grey-800 group/unblock group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
          onClick={onUnblockClicked}
          disabled={unblockUserMut.isPending}
        >
          <BsPersonDashFill className="text-lg group-hover/unblock:fill-red-500" />
        </Button>
      </Tooltip>
    </>
  );
}
