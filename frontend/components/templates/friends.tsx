"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useState } from "react";
import AddFriends from "../organisms/add-friends";

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
            return <AddFriends />
          case TopBarOptions.All:
            return <h1 className="text-white m-4" >All Friends</h1>
          case TopBarOptions.Online:
            return <h1 className="text-white m-4" >Online Friends</h1>
          case TopBarOptions.Pending:
            return <h1 className="text-white m-4" >Pending Friends</h1>
          case TopBarOptions.Blocked:
            return <h1 className="text-white m-4" >Blocked Friends</h1>
          default:
            return null
        }
      })()}
      {/* {activeOption === TopBarOptions.AddFriends && <AddFriends />} */}
    </div>
  );
}
