"use client"

import React, { createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Channelbar from "../organisms/channelbar";
import QuickSearch from "../organisms/quick-search";
import ServerSidebar from "../organisms/server-sidebar";

export const SearchDialogContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);

type BaseTemplateType = {
  children: React.ReactNode;
};

export default function BaseTemplate({ children }: BaseTemplateType) {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  return (
    <div>
      <SearchDialogContext.Provider value={setOpenSearchDialog}>
        <div className="flex">
          <ServerSidebar />
          <Channelbar />
          {children}
          <main className="w-32">
            <div className="h-full w-full bg-gray-700" />
          </main>
        </div>
        {openSearchDialog && <QuickSearch />}
      </SearchDialogContext.Provider>
    </div>
  );
}
