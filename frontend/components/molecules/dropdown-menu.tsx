"use client";

import React, {
  ChangeEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import FieldInput from "../atoms/field-input";
import ArrowDownSvg from "@/svg/arrow-down";
import FloatingCard from "../atoms/floating-card";
import PrimaryButton from "./primary-button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

export type DropdownmenuProps = {
  placeholder?: string;
  items: Array<string>;
  onItemSelected?: (item: string) => void;
} & React.ComponentProps<"div">;

export default function DropdownMenu({
  className,
  placeholder = "",
  items,
  onItemSelected,
}: DropdownmenuProps) {
  const [filteredItems, setFilteredItems] = useState<Array<string>>(items);
  const [openMenu, setOpenMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightedItem, setHighlightedItem] = useState(0);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOpenMenu(value.length == 0 ? false : true);
    const results: Array<string> = [];
    items.forEach((item) => {
      if (item.toLowerCase().includes(value.toLowerCase())) results.push(item);
    });
    setFilteredItems(results);
  };

  const itemClicked = (event: MouseEvent<HTMLButtonElement>) => {
    const item = event.currentTarget.innerText;
    setOpenMenu(false);
    setFilteredItems(items);
    setHighlightedItem(0);
    if (inputRef && inputRef.current) {
      inputRef.current.value = item;
    }
    if (onItemSelected) onItemSelected(item);
  };

  useKeyboardShortcut({
    keys: ["ArrowUp"],
    callback: () => {
      if (highlightedItem == 0) setHighlightedItem(filteredItems.length - 1);
      else setHighlightedItem(highlightedItem - 1);
    },
  });

  useKeyboardShortcut({
    keys: ["ArrowDown"],
    callback: () => {
      if (highlightedItem == filteredItems.length - 1) setHighlightedItem(0);
      else setHighlightedItem(highlightedItem + 1);
    },
  });

  useKeyboardShortcut({
    keys: ["Enter"],
    callback: () => {
      if (openMenu && filteredItems.length > 0) {
        if (inputRef?.current) {
          if (filteredItems[highlightedItem] !== "undefined")
            inputRef.current.value = filteredItems[highlightedItem];
          else
            inputRef.current.value = filteredItems[0];
        }
        else {
          console.log(`inputRef is undefined!!`);
        }
        if (onItemSelected) onItemSelected(filteredItems[highlightedItem]);
        setOpenMenu(false);
        setFilteredItems(items);
        setHighlightedItem(0);
      }
    },
  });

  return (
    <div className="relative">
      <FieldInput
        className={twMerge(
          "text-md flex h-fit flex-shrink cursor-default justify-between border border-gray-850 bg-gray-850 p-2",
          className
        )}
        placeholder={placeholder}
        onChange={onFieldChange}
        inputRef={inputRef}
      />
      <ArrowDownSvg
        id="dropdown-arrow"
        className="absolute inset-0 left-[80%] top-[25%] z-10 m-1 -translate-y-[25%] cursor-pointer fill-muted text-foreground hover:fill-white"
        onClick={(e) => {
          setOpenMenu(!openMenu);
          inputRef.current?.focus();
        }}
      />
      {openMenu && (
        <FloatingCard className="h-fit" direction="top" showCard={setOpenMenu}>
          {filteredItems.length == 0 ? (
            <p className="p-2 text-sm text-muted">No results found</p>
          ) : (
            filteredItems.map((item, index) => {
              return (
                <PrimaryButton
                  key={item}
                  className="flex items-center justify-start p-2 hover:text-foreground"
                  hover={index == highlightedItem ? true : false}
                  onClick={itemClicked}
                >
                  {item}
                </PrimaryButton>
              );
            })
          )}
        </FloatingCard>
      )}
    </div>
  );
}
