import Button from "@/components/atoms/button";
import { api } from "@/config";
import { delay } from "@/lib/delay";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { useMutation } from "@tanstack/react-query";
import { BsCheck, BsX } from "react-icons/bs";
import Tooltip from "../tooltip";

export default function PendingAcceptFRItem({ user }: { user: User }) {
  const { pendingFR, friends, setPendingFR, setFriends } = useUserStore();
  const acceptFRMut = useMutation({
    mutationFn: async () => {
      await delay(500);
      return await api.post(`/api/users/friends/accept/${user.id}`);
    },
    onSuccess: () => {
      if (pendingFR) setPendingFR(pendingFR.filter((profile) => profile.username !== user.username));
      if (friends) setFriends([...friends, user]);
    },
  });
  const rejectFRMut = useMutation({
    mutationFn: async () => {
      await delay(500);
      return await api.delete(`/api/users/friends/reject/${user.id}`);
    },
    onSuccess: () => {
      if (pendingFR) setPendingFR(pendingFR.filter((profile) => profile.username !== user.username));
    },
  });

  return (
    <>
      <Button className="bg-grey-800 group/check group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
        disabled={acceptFRMut.isPending}
        onClick={(e) => acceptFRMut.mutate()}
      >
        <BsCheck
          className="text-lg group-hover/check:fill-green-500"
          size={20}
        />
        <Tooltip direction="top" margin={2}>
          Accept
        </Tooltip>
      </Button>
      <Button className="bg-grey-800 group/reject group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
        disabled={rejectFRMut.isPending}
        onClick={(e) => rejectFRMut.mutate()}
      >
        <BsX className="text-lg group-hover/reject:fill-red-500" />
        <Tooltip direction="top" margin={2}>
          Reject
        </Tooltip>
      </Button>
    </>
  );
}
