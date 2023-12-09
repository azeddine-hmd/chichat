"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useState } from "react";
import AddFriends from "../organisms/add-friends";
import FriendsList from "../organisms/friends-list";

export default function FriendsTemplate() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriends
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
            return <FriendsList filterBy="All" />;
          case TopBarOptions.Online:
            return <FriendsList filterBy="Online" />;
          case TopBarOptions.Pending:
            return <h1 className="m-4 text-white">Pending Friends</h1>;
          case TopBarOptions.Blocked:
            return <h1 className="m-4 text-white">Blocked Friends</h1>;
          default:
            return null;
        }
      })()}
      {/* {activeOption === TopBarOptions.AddFriends && <AddFriends />} */}
    </div>
  );
}
