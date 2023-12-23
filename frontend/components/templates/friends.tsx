"use client";

import FriendsTopBar, {
  TopBarOptions,
} from "@/components/organisms/friends-topbar";
import React, { useEffect, useState } from "react";
import AddFriends from "../organisms/add-friends";
import UsersList from "../organisms/users-list";
import { useUserStore } from "@/stores/user-store";
import { User } from "@/models/user";

export default function FriendsTemplate() {
  const [activeOption, activateOption] = useState<TopBarOptions>(
    TopBarOptions.AddFriends
  );
  const { friends, blocked, setFriends, setBlocked } = useUserStore();

  useEffect(() => {
    window.clientSocket.once("relation", (...args) => {
      const relation: { friends: User[]; blocked: User[] } = args[0];
      setFriends(relation.friends);
      console.log("received friends:", JSON.stringify(relation.friends));
      setBlocked(relation.blocked);
      console.log("received blocked:", JSON.stringify(relation.blocked));
    });
    window.clientSocket.emit("relation");
    console.log("fetching relation...");
    // eslint-disable-next-line
  }, []);

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
            return <UsersList filterBy="All" users={friends} />;
          case TopBarOptions.Online:
            return (
              <UsersList
                filterBy="Online"
                users={
                  friends
                    ? friends.filter((friend) => friend.status === "online")
                    : []
                }
              />
            );
          case TopBarOptions.Pending:
            return <UsersList filterBy="Pending" users={[]} />;
          case TopBarOptions.Blocked:
            return <UsersList filterBy="Blocked" users={blocked} />;
          default:
            return null;
        }
      })()}
      {/* {activeOption === TopBarOptions.AddFriends && <AddFriends />} */}
    </div>
  );
}
