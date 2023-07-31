"use client";

import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import FieldInput from "../atoms/field-input";
import ArrowDownSvg from "@/svg/arrow-down";
import FloatingCard from "../atoms/floating-card";
import PrimaryButton from "./primary-button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";

type FloatingMenuCardProps = {
  open: Dispatch<SetStateAction<boolean>>;
  items: Array<string>;
  onItemSelected: (item: string) => void;
};

function FloatingMenuCard({
  open,
  items,
  onItemSelected,
}: FloatingMenuCardProps) {
  const [highlightedItem, setHighlightedItem] = useState(0);

  useEffect(() => {
    console.log("creatign open menu...");
    return () => {
      console.log("destroying open menu...");
    };
  }, []);

  useKeyboardShortcut({
    keys: ["ArrowUp"],
    callback: (_) => {
      if (highlightedItem == 0) setHighlightedItem(items.length - 1);
      else setHighlightedItem(highlightedItem - 1);
    },
  });

  useKeyboardShortcut({
    keys: ["ArrowDown"],
    callback: (_) => {
      if (highlightedItem == items.length - 1) setHighlightedItem(0);
      else setHighlightedItem(highlightedItem + 1);
    },
  });

  function fireItemSelection() {
    console.log("fireItemSelection: called");
    if (items.length > 0) {
      if (items[highlightedItem] !== undefined) {
        onItemSelected(items[highlightedItem]);
      } else {
        onItemSelected("");
      }
      setHighlightedItem(0);
    }
  }

  useKeyboardShortcut({
    keys: ["Enter"],
    callback: (_) => {
      console.log("inside evil enter");
      fireItemSelection();
    },
  });

  function onItemClicked(event: MouseEvent<HTMLButtonElement>) {
    fireItemSelection();
  }

  return (
    <FloatingCard className="h-fit" direction="top" showCard={open}>
      {items.length == 0 ? (
        <p className="p-2 text-sm text-muted">No results found</p>
      ) : (
        items.map((item, index) => {
          return (
            <PrimaryButton
              key={item}
              className="flex items-center justify-start p-2 hover:text-foreground"
              hover={index == highlightedItem ? true : false}
              onClick={onItemClicked}
            >
              {item}
            </PrimaryButton>
          );
        })
      )}
    </FloatingCard>
  );
}

export type DropdownmenuProps = {
  placeholder?: string;
  items: Array<string>;
  fieldName?: string;
} & React.ComponentProps<"input">;

export default function DropdownMenu({
  className,
  placeholder = "",
  items,
  fieldName,
  onChange,
  value,
  ...restProps
}: DropdownmenuProps) {
  const [filteredItems, setFilteredItems] = useState<Array<string>>(items);
  const [openMenu, setOpenMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setOpenMenu(value.length == 0 ? false : true);
    const results: Array<string> = [];
    items.forEach((item) => {
      if (item.toLowerCase().includes(value.toLowerCase())) results.push(item);
    });
    setFilteredItems(results);
  };

  function onItemSelected(item: string) {
    setOpenMenu(false);
    setFilteredItems(items);
    setInputValue(item);
  }

  return (
    <div className="relative">
      <FieldInput
        className={twMerge(
          "text-md flex h-fit flex-shrink cursor-default justify-between border border-gray-850 bg-gray-850 p-2",
          className
        )}
        placeholder={placeholder}
        onChange={(event) => {
          if (onChange) onChange(event);
          onFieldChange(event);
        }}
        name={fieldName}
        value={inputValue}
        autoComplete="off"
        {...restProps}
      />
      <ArrowDownSvg
        id="dropdown-arrow"
        className="absolute inset-0 left-[80%] top-[25%] z-10 m-1 -translate-y-[25%] cursor-pointer fill-muted text-foreground hover:fill-white"
        onClick={(_) => {
          setOpenMenu(!openMenu);
          inputRef.current?.focus();
        }}
      />
      {openMenu && (
        <FloatingMenuCard
          onItemSelected={(item) => onItemSelected(item)}
          open={setOpenMenu}
          items={filteredItems}
        />
      )}
    </div>
  );
}
