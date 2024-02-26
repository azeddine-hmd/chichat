"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useMemo, useState } from "react";
import { useUserStore } from "@/stores/user-store";
import AddFriends from "@/components/organisms/add-friends";
import UsersList from "@/components/organisms/users-list";

export default function FriendsPage() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriends
  );
  const { friends, blocked, pendingFR } = useUserStore();

  const onlineFriends = useMemo(
    () => friends.filter((friend) => friend.status === "online"),
    [friends]
  );

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
