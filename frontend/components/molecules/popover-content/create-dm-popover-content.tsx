import React, { useState } from "react";
import FieldInput from "@/components/atoms/field-input";
import SearchResults from "../search-result-new";
import { useUserStore } from "@/stores/user-store";
import UserItem from "../user-item";
import Checkbox from "../checkbox";
import { BsCheck, BsSearch } from "react-icons/bs";
import PrimaryButton from "../primary-button";

export default function CreateDmPopoverContent() {
  const [usernameInput, setUsernameInput] = useState("");
  const { friends } = useUserStore();

  return (
    <div className="w-96 overflow-hidden rounded-md border border-black/20 bg-gray-700 p-2 shadow-lg transition-all">
      <h3 className="text-lg font-medium text-white">Select Friends</h3>
      <small className="text-muted">You can add 9 more friends.</small>
      <FieldInput
        className="mr-2 mb-4 mt-4 h-8 rounded-md bg-gray-900 p-2 text-sm focus:!outline-none"
        placeholder="Type the username of a friend"
        onChange={(e) => setUsernameInput(e.target.value)}
        value={usernameInput}
      />
      <SearchResults
        className="max-h-40 mb-4"
        results={friends}
        targetKey="username"
        searchText={usernameInput}
        emptyCn={
          <div className="flex justify-center items-center flex-col text-sm gap-2 text-gray-400/60">
            <BsSearch size={20} />
            <div className="">No friends found that are not already in this DM</div>
          </div>
        }
      >
        {(user) => (
          <UserItem className="h-fit px-2 py-1 border-none rounded-sm" user={user}>
            <Checkbox onClick={(e) => console.log("checked")} >
              <Checkbox.Indicator>
                <BsCheck />
              </Checkbox.Indicator>
            </Checkbox>
          </UserItem>
        )}
      </SearchResults>
      <PrimaryButton className="m-0 text-sm w-full rounded-sm flex justify-center items-center">
        Create DM
      </PrimaryButton>
    </div>
  );
}
