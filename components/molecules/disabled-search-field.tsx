import React, { MouseEvent, useContext } from "react";
import { twMerge } from "tailwind-merge";
import Field from "../atoms/field";
import { SearchDialogContext } from "../templates/base-template";

export type DisabledSearchFieldType = React.ComponentProps<"div">;

export default function DisabledSearchField({
  className,
}: DisabledSearchFieldType) {
  const setOpenedSearchDialog = useContext(SearchDialogContext);

  const clickHandler = (_: MouseEvent<HTMLButtonElement>) => {
    if (setOpenedSearchDialog) setOpenedSearchDialog(true);
  };

  return (
    <div className={twMerge("h-full w-full", className)}>
      <div className="bg-gray flex h-12 w-full items-center justify-center p-3 px-[10px] text-white shadow-2xl">
        <Field onClick={clickHandler} >
          <div className="text-muted-field">Find or start a conversation</div>
        </Field>
      </div>
      <div className="h-2 border-b-gray-500 bg-gray-700 shadow-none" />
    </div>
  );
}
