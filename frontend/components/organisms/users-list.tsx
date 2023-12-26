"use client";

import React, { useState, MouseEvent } from "react";
import SearchField from "../molecules/search-field";
import { BsSearch, BsX } from "react-icons/bs";
import SearchResults from "../molecules/search-result-new";
import UserListItem from "../molecules/user-list-item";
import { User } from "@/models/user";
import OnlineAllItem from "../molecules/user-list-items/online-all-item";
import PendingSentFRItem from "../molecules/user-list-items/pending-sent-fr-item";
import BlockedItem from "../molecules/user-list-items/blocked-item";
import PendingAcceptFRItem from "../molecules/user-list-items/pending-accept-fr-item";

export type FilterBy = "All" | "Online" | "Pending" | "Blocked";

export type UsersListProps = {
  filterBy: FilterBy;
  users: User[];
} & React.ComponentProps<"main">;

export default function UsersList({ filterBy, users }: UsersListProps) {
  const [searchText, setSearchText] = useState("");
  const onItemCLicked = (e: MouseEvent<HTMLDivElement>) => {
    console.log("item clicked");
  };

  return (
    <main className="h-full w-full p-4 px-8">
      <SearchField
        className="text-md mb-4 h-8 py-1 font-medium"
        fieldInputClassName="text-md font-medium"
        onTextChanged={(e) => setSearchText(e.target.value)}
        fieldInputProps={{ placeholder: "Search", value: searchText }}
      >
        {searchText === "" ? (
          <BsSearch className="ml-1 text-white" size="20"></BsSearch>
        ) : (
          <BsX
            className="text-white"
            size="24"
            onClick={(e) => setSearchText("")}
          ></BsX>
        )}
      </SearchField>
      <SearchResults
        targetKey={"displayName"}
        results={users}
        searchText={searchText}
        title={filterBy}
      >
        {(user) => (
          <UserListItem user={user} onItemClicked={onItemCLicked}>
            {(filterBy === "Online" || filterBy === "All") && (
              <OnlineAllItem user={user} />
            )}
            {filterBy === "Blocked" && <BlockedItem user={user} />}
            {filterBy === "Pending" && user.isAcceptFR && (
              <PendingAcceptFRItem user={user} />
            )}
            {filterBy === "Pending" && user.isSentFR && (
              <PendingSentFRItem user={user} />
            )}
          </UserListItem>
        )}
      </SearchResults>
    </main>
  );
}
