"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useState } from "react";
import AddFriends from "../organisms/add-friends";
import UsersList from "../organisms/users-list";

export default function FriendsTemplate() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriends
  );
  const users = [
    {
      id: 1,
      username: "sbenjami",
      displayName: "Sarah Benjamin",
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      username: "kwells",
      displayName: "Kyro Wells",
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      username: "cpayne",
      displayName: "Cecilia Payne",
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      username: "eboyle",
      displayName: "Edward Boyle",
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 5,
      username: "akaur",
      displayName: "Aliya Kaur",
      status: "online" as const,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

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
            return <UsersList filterBy="All" users={users} />;
          case TopBarOptions.Online:
            return <UsersList filterBy="Online" users={users} />;
          case TopBarOptions.Pending:
            return <UsersList filterBy="Pending" users={users} />;
          case TopBarOptions.Blocked:
            return <UsersList filterBy="Blocked" users={users} />;
          default:
            return <></>;
        }
      })()}
      {/* {activeOption === TopBarOptions.AddFriends && <AddFriends />} */}
    </div>
  );
}
