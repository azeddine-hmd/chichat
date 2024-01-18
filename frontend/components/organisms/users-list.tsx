"use client";
import React, { useState, MouseEvent, useRef } from "react";
import SearchField from "../molecules/search-field";
import { BsSearch, BsX } from "react-icons/bs";
import SearchResults from "../molecules/search-result-new";
import UserListItem from "../molecules/user-item";
import { User } from "@/models/user";
import OnlineAllItem from "../molecules/user-list-items/online-all-item";
import PendingSentFRItem from "../molecules/user-list-items/pending-sent-fr-item";
import BlockedItem from "../molecules/user-list-items/blocked-item";
import PendingAcceptFRItem from "../molecules/user-list-items/pending-accept-fr-item";
import PopoverButton from "../molecules/popover-button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config";
import { useUserStore } from "@/stores/user-store";
import { AxiosResponse } from "axios";
// import Popover from "../molecules/popover";
import ContextPopover from "../molecules/context-popover";

export type FilterBy = "All" | "Online" | "Pending" | "Blocked";

export type UsersListProps = {
  filterBy: FilterBy;
  users: User[];
} & React.ComponentProps<"main">;

export default function UsersList({ filterBy, users }: UsersListProps) {
  const [searchText, setSearchText] = useState("");
  const { friends, setFriends, blocked, setBlocked } = useUserStore();

  const onItemCLicked = (e: MouseEvent<HTMLDivElement>) => {};

  const blockUserMut = useMutation({
    mutationFn: async (id: number) => {
      return await api.post(`/api/users/block/${id}`);
    },
    onSuccess: (response: AxiosResponse) => {
      const blockedUser = response.data as User;
      if (friends.some((friend) => friend.id == blockedUser.id))
        setFriends(friends.filter((friend) => friend.id != blockedUser.id));
      setBlocked([...blocked, blockedUser]);
    },
  });

  const [openCtxPopover, setOpenCtxPopover] = useState(false);
  const [ctxPopoverPos, setCtxPopoverPos] = useState({ x: 0, y: 0 });

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
          <ContextPopover open={openCtxPopover}>
            <UserListItem
              id="rr"
              user={user}
              onClick={onItemCLicked}
              onContextMenu={(e) => {
                e.preventDefault();
                setCtxPopoverPos({ x: e.clientX, y: e.clientY });
                setOpenCtxPopover(true);
              }}
            >
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
            <ContextPopover.Content
              position={ctxPopoverPos}
              clickOutside={() => setOpenCtxPopover(false)}
              side="left"
              align="start"
            >
              {(filterBy === "All" || filterBy === "Online") && (
                <PopoverButton
                  onClick={(_) => {
                    blockUserMut.mutate(user.id);
                    setOpenCtxPopover(false);
                  }}
                  disabled={blockUserMut.isPending}
                >
                  Block
                </PopoverButton>
              )}
            </ContextPopover.Content>
          </ContextPopover>
        )}
      </SearchResults>
    </main>
  );
}
