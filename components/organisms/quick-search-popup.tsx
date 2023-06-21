"use client";

import { ChangeEvent, useContext, useState } from "react";
import SearchField from "../molecules/search-field";
import SearchResult from "../molecules/search-result";
import Popup from "../molecules/popup";
import { GlobalContext } from "@/client-context/global";

export default function QuickSearchPopup() {
  const searchPopup = useContext(GlobalContext)!!.searchPopup;
  const [searchText, setSearchText] = useState("");

  const onSearchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Popup
      onClick={(e) => searchPopup.set(false)}
      className="bg-black/80 backdrop-blur-[1px]"
    >
      <nav onClick={e => e.stopPropagation() } className="flex h-fit w-fit flex-col items-center justify-center">
        {/* search head */}
        <div className="overflow-hidden">
          <h1 className="box-content p-2 text-lg font-medium text-white">
            {searchText.length === 0 ? (
              <p>Search for channels or DMs</p>
            ) : (
              <p>Select a result and press Enter to jump to it</p>
            )}
          </h1>
        </div>

        <div className="h-[365px] w-[570px] rounded-lg bg-gray-600 p-5 pb-0">
          <SearchField onTextChanged={(e) => onSearchTextChanged(e)} />
          <SearchResult searchText={searchText} />
        </div>
      </nav>
    </Popup>
  );
}
