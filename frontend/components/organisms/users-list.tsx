"use client";

import React, { useState, MouseEvent } from "react";
import SearchField from "../molecules/search-field";
import { BsCheck, BsPersonDashFill, BsSearch, BsX } from "react-icons/bs";
import SearchResults from "../molecules/search-result-new";
import UserListItem from "../molecules/user-list-item";
import { User } from "@/models/user";
import Button from "../atoms/button";
import Tooltip from "../molecules/tooltip";
import { BsChatFill, BsThreeDots } from "react-icons/bs";

export type FilterBy = "All" | "Online" | "Pending" | "Blocked";

export type UsersListProps = {
  filterBy: FilterBy;
  users: User[];
} & React.ComponentProps<"main">;

export default function UsersList({ filterBy, users }: UsersListProps) {
  const [searchText, setSearchText] = useState("");

  function onFriendItemClicked(e: MouseEvent<any>, displayName: string) {
    e.stopPropagation();
    console.log(`we're about to chat with ${displayName}`);
  }

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
          <UserListItem
            user={user}
            onItemClicked={(e) => onFriendItemClicked(e, user.displayName)}
          >

            {(filterBy === "Online" || filterBy === "All") && (
              <>
                <Button
                  className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5"
                  onClick={(e) => onFriendItemClicked(e, user.displayName)}
                >
                  <BsChatFill className="text-lg" />
                  <Tooltip direction="top" margin={2}>
                    Message
                  </Tooltip>
                </Button>
                <Button className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5">
                  <BsThreeDots className="rotate-90 transform text-lg" />
                  <Tooltip direction="top" margin={2}>
                    Menu
                  </Tooltip>
                </Button>
              </>
            )}

            {filterBy === "Blocked" && (
              <>
                <Button className="bg-grey-800 group group/unblock relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5">
                  <BsPersonDashFill className="text-lg group-hover/unblock:fill-red-500" />
                  <Tooltip direction="top" margin={2}>
                    Unblock
                  </Tooltip>
                </Button>
              </>
            )}

            {filterBy === "Pending" && (
              <>
                <Button className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5 group/check">
                  <BsCheck className="text-lg group-hover/check:fill-green-500" size={20} />
                  <Tooltip direction="top" margin={2}>
                    Accept
                  </Tooltip>
                </Button>
                <Button className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5 group/reject">
                  <BsX className="text-lg group-hover/reject:fill-red-500" />
                  <Tooltip direction="top" margin={2}>
                    Reject
                  </Tooltip>
                </Button>
              </>
            )}

          </UserListItem>
        )}
      </SearchResults>
    </main>
  );
}
