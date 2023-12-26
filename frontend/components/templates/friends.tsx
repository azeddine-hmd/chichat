"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useEffect, useState } from "react";
import AddFriends from "../organisms/add-friends";
import UsersList from "../organisms/users-list";
import { useUserStore } from "@/stores/user-store";
import { User } from "@/models/user";
import { useRelationEvent } from "@/hooks/use-relation-event";

export default function FriendsTemplate() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriends
  );
  const { friends, blocked, pendingFR } = useUserStore();
  const [onlineFriends, setOnlineFriends] = useState<User[] | null>(null);

  useRelationEvent();

  useEffect(() => {
    window.clientSocket.emit("relation");
  }, []);

  useEffect(() => {
    if (!friends) return;
    setOnlineFriends(friends.filter((friend) => friend.status === "online"));
  }, [friends]);

  return (
    <div className="h-full w-full bg-gray-600">
      <FriendsTopBar
        activeOption={activeOption}
        activateOption={activateOption}
      />
      {(() => {
        switch (activeOption) {
          case TopBarOptions.AddFriends:
            return <AddFriends />;
          case TopBarOptions.All:
            return <UsersList filterBy="All" users={friends || []} />;
          case TopBarOptions.Online:
            return <UsersList filterBy="Online" users={onlineFriends || []} />;
          case TopBarOptions.Pending:
            return <UsersList filterBy="Pending" users={pendingFR || []} />;
          case TopBarOptions.Blocked:
            return <UsersList filterBy="Blocked" users={blocked || []} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
