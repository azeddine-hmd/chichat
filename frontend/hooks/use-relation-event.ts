import { User } from "@/models/user";
import { useEvent, useOneTimeEvent } from "./use-Event";
import { useUserStore } from "@/stores/user-store";

export function useRelationEvent() {
  const { friends, pendingFR, setPendingFR, setFriends, setBlocked } = useUserStore();

  useOneTimeEvent("relation", (...args) => {
    const relation: {
      sentFR: User[];
      acceptFR: User[];
      friends: User[];
      blocked: User[];
    } = args[0];
    setFriends(relation.friends);
    setBlocked(relation.blocked);
    const pendingFR = [
      ...relation.sentFR.map((profile) => ({ ...profile, isSentFR: true })),
      ...relation.acceptFR.map((profile) => ({ ...profile, isAcceptFR: true })),
    ];
    setPendingFR(pendingFR);
  });

  useEvent("relation:pending:updates", (...args) => {
    const data: { operation: string; user: User } = args[0];
    if (data.operation === "sentFR") {
      data.user.isAcceptFR = true;
      if (!pendingFR.find((profile) => profile.id === data.user.id))
        setPendingFR([...pendingFR, data.user]);
    } else if (data.operation === "cancelFR" || data.operation === "rejectFR") {
      setPendingFR([
        ...pendingFR.filter((profile) => profile.id === data.user.id),
      ]);
    } else if (data.operation === "acceptFR") {
      setPendingFR([
        ...pendingFR.filter((profile) => profile.id === data.user.id),
      ]);
      setFriends([...friends, data.user]);
    }
  });

  useEvent("profile updated", (...args) => {
    const updated: User = args[0];
    console.log("updating friend profile:", updated);
    setFriends([...friends.filter((friend) => friend.id === updated.id), updated])
  });
}
