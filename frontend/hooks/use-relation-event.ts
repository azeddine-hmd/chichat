import { User } from "@/models/user";
import { useEvent, useOneTimeEvent } from "./use-Event";
import { useUserStore } from "@/stores/user-store";

export function useRelationEvent() {
  const { friends, pendingFR, setPendingFR, setFriends, setBlocked } =
    useUserStore();

  useEvent("relation", (...args) => {
    console.log("socket:event:relation: received!");
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

  useEvent("relation:updates", (...args) => {
    const data: { operation: string; user: User } = args[0];
    console.log("socket:relation:updates:", data);

    // partial update
    // if (data.operation === "sentFR") {
    //   data.user.isAcceptFR = true;
    //   if (!pendingFR.find((profile) => profile.id === data.user.id))
    //     setPendingFR([...pendingFR, data.user]);
    // } else if (data.operation === "cancelFR" || data.operation === "rejectFR") {
    //   setPendingFR([
    //     ...pendingFR.filter((profile) => profile.id === data.user.id),
    //   ]);
    // } else if (data.operation === "acceptFR") {
    //   setPendingFR([
    //     ...pendingFR.filter((profile) => profile.id === data.user.id),
    //   ]);
    //   setFriends([...friends, data.user]);
    // } else if (data.operation === "removeFriend") {
    //   setFriends(friends.filter((friend) => friend.id != data.user.id));
    // } else if (data.operation === "blockUser") {
    //   setFriends(friends.filter((friend) => friend.id == data.user.id));
    // }

    // full update
    console.log("emitting to: relation")
    window.clientSocket.emit("relation");
  });

  useEvent("profile:updates", (...args) => {
    // const updated: User = args[0];
    console.log("emitting to: profile")
    window.clientSocket.emit("profile");
  });
}
