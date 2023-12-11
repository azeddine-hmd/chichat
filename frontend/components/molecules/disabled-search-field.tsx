"use client";

import React, { MouseEvent, useContext } from "react";
import { twMerge } from "tailwind-merge";
import Field from "../atoms/field";
import { GlobalContext } from "@/app/global-context";

export type DisabledSearchFieldType = React.ComponentProps<"div">;

export default function DisabledSearchField({
  className,
}: DisabledSearchFieldType) {
  const searchPopup = useContext(GlobalContext)!!.searchPopup;

  const clickHandler = (_: MouseEvent<HTMLDivElement>) => {
    searchPopup.set(true);
  };

  return (
    <div className={twMerge("h-fit w-full", className)}>
      <div className="bg-gray flex h-12 w-full items-center justify-center p-3 px-[10px] text-white shadow-2xl">
        <Field onClick={clickHandler} >
          <div className="text-muted-field">Find or start a conversation</div>
        </Field>
      </div>
    </div>
  );
}
