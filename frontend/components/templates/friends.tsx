"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useState } from "react";
import OnlineFriends from "../organisms/online-friends";

export default function FriendsTemplate() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriend
  );

  return (
    <div className="h-full w-full bg-gray-600">
      <FriendsTopBar
        activeOption={activeOption}
        activateOption={activateOption}
      />
      {activeOption === TopBarOptions.AddFriend && <OnlineFriends />}
    </div>
  );
}
