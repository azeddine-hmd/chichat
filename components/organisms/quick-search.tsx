"use client";

import { ChangeEvent, useState } from "react";
import SearchField from "../molecules/search-field";
import SearchResult from "../molecules/search-result";
import Dialog from "../molecules/dialog";

export default function QuickSearch() {
  const [searchText, setSearchText] = useState("");

  const onSearchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Dialog>
      <nav className="flex h-fit w-fit flex-col items-center justify-center p-5">
        {/* search head */}
        <h1 className="p-2 text-lg font-medium text-white">
          {searchText.length === 0
            ? "Search for channels or DMs"
            : "Select a result and press Enter to jump to it"}
        </h1>

        <SearchField onTextChanged={(e) => onSearchTextChanged(e)} />

        {/* search result */}
        <div className="h-[365px] w-[570px] rounded-lg bg-gray-600">
          <SearchResult searchText={searchText} />
        </div>
      </nav>
    </Dialog>
  );
}
