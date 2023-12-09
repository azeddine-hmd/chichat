import React, { ChangeEvent, MouseEvent, useState } from "react";
import SearchField from "../molecules/search-field";
import {
  BsChatFill,
  BsSearch,
  BsThreeDots,
  BsX,
} from "react-icons/bs";
import Avatar from "../atoms/avatar";
import SearchResults from "../molecules/SearchResult";
import Button from "../atoms/button";
import Tooltip from "../molecules/tooltip";

export type FilterBy = "All" | "Online";

export type FriendsList = {
  filterBy: FilterBy;
} & React.ComponentProps<"main">;

export default function FriendsList({ filterBy }: FriendsList) {
  const [searchText, setSearchText] = useState("");

  function searchHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function onFriendItemClicked(e: MouseEvent, displayName: string) {
    e.stopPropagation();
    console.log(`we're about to chat with ${displayName}`);
  }

  return (
    <main className="h-full w-full p-4 px-8">
      <SearchField
        className="text-md mb-4 h-8 py-1 font-medium"
        fieldInputClassName="text-md font-medium"
        onTextChanged={searchHandler}
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
        results={[
          {
            username: "sbenjami",
            displayName: "Sarah Benjamin",
            status: "online" as const,
            avatar: "https://i.pravatar.cc/150?img=1",
          },
          {
            username: "kwells",
            displayName: "Kyro Wells",
            status: "online" as const,
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            username: "cpayne",
            displayName: "Cecilia Payne",
            status: "online" as const,
            avatar: "https://i.pravatar.cc/150?img=3",
          },
          {
            username: "eboyle",
            displayName: "Edward Boyle",
            status: "online" as const,
            avatar: "https://i.pravatar.cc/150?img=7",
          },
          {
            username: "akaur",
            displayName: "Aliya Kaur",
            status: "online" as const,
            avatar: "https://i.pravatar.cc/150?img=5",
          },
        ]}
        searchText={searchText}
        title={filterBy}
      >
        {(profile) => (
          <div
            className="group/item group- flex h-[62px] items-center justify-between rounded-lg border-t border-t-separator-xlight px-1 hover:bg-hover/20"
            onClick={(e) => onFriendItemClicked(e, profile.displayName)}
          >
            <div className="flex">
              <Avatar
                className="mr-2"
                status={profile.status}
                imageSrc={profile.avatar}
              />
              <div className="justify-Start flex flex-col items-start">
                <div className="w-full text-start text-sm font-medium text-white">
                  {profile.displayName}
                </div>
                <div className="w-full text-left text-xs font-light text-muted">
                  {profile.username}
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              <Button
                className="bg-grey-800 group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5 z-10"
                onClick={(e) => onFriendItemClicked(e, profile.displayName)}
              >
                <BsChatFill className="text-lg" />
                <Tooltip direction="top" margin={4}>
                  Message
                </Tooltip>
              </Button>
              <Button className="bg-grey-800 group group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5 z-10">
                <BsThreeDots className="rotate-90 transform text-lg" />
                <Tooltip direction="top" margin={4}>
                  Menu
                </Tooltip>
              </Button>
            </div>
          </div>
        )}
      </SearchResults>
    </main>
  );
}
