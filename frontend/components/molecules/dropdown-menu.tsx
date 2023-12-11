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
import { useField } from "formik";

type FloatingMenuCardProps = {
  open: Dispatch<SetStateAction<boolean>>;
  setInputKeyPress: Dispatch<SetStateAction<string>>;
  inputkeyPress: string;
  items: Array<string>;
  onItemSelected: (item: string) => void;
};

function FloatingMenu<T>({
  open,
  setInputKeyPress,
  inputkeyPress,
  items,
  onItemSelected,
}: FloatingMenuCardProps) {
  const [highlightedItem, setHighlightedItem] = useState(0);

  function fireItemSelection(index?: number) {
    const itemIndex = index ? index : highlightedItem;
    if (items.length > 0) {
      if (items[itemIndex] !== undefined) {
        onItemSelected(items[itemIndex]);
      } else {
        onItemSelected("");
      }
      setHighlightedItem(0);
    }
  }

  useEffect(() => {
    if (inputkeyPress === "ArrowDown") {
      if (highlightedItem == items.length - 1) setHighlightedItem(0);
      else setHighlightedItem(highlightedItem + 1);
      setInputKeyPress('');
    } else if (inputkeyPress === "ArrowUp") {
      if (highlightedItem == 0) setHighlightedItem(items.length - 1);
      else setHighlightedItem(highlightedItem - 1);
      setInputKeyPress('');
    } else if (inputkeyPress === "Enter") {
      fireItemSelection();
      setInputKeyPress('');
    }
  }, [inputkeyPress, fireItemSelection, highlightedItem, items.length, setInputKeyPress]);

  return (
    <FloatingCard 
      className="h-fit" 
      direction="top" 
      showCard={open}
    >
      {items.length == 0 ? (
        <p className="p-2 text-sm text-muted">No results found</p>
      ) : (
        items.map((item, index) => {
          return (
            <PrimaryButton
              key={item}
              className="w-full flex items-center justify-start p-2 hover:text-foreground"
              hover={index == highlightedItem ? true : false}
              onClick={(e) => fireItemSelection(index)}
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
  fieldName: string;
  setFieldValue: any;
} & React.ComponentProps<"input">;

export default function DropdownMenu({
  className,
  placeholder = "",
  items,
  fieldName,
  onChange,
  value,
  setFieldValue,
  ...restProps
}: DropdownmenuProps) {
  const [filteredItems, setFilteredItems] = useState<Array<string>>(items);
  const [openMenu, setOpenMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputkeyPress, setInputKeyPress] = useState('');

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    const value = inputRef.current?.value;
    if (value) {
      const results: Array<string> = [];
      items.forEach((item) => {
        if (item.toLowerCase().includes(value.toLowerCase())) results.push(item);
      });
      setFilteredItems(results);
      setOpenMenu(value?.length == 0 ? false : true); 
    }  else {
      setFilteredItems(items);
    }
  };

  function onItemSelected(item: string) {
    setFieldValue(fieldName, item, true);
    setOpenMenu(false);
    setFilteredItems(items);
    const nextElement = inputRef.current?.parentElement?.nextElementSibling?.firstChild;
    if (nextElement && nextElement instanceof HTMLInputElement) {
      nextElement.focus();
    }
  }

  return (
    <div className="relative">
      <FieldInput
        className={twMerge(
          "text-md flex h-fit flex-shrink cursor-default justify-between border border-gray-850 bg-gray-850 p-2",
          className
        )}
        onChange={onFieldChange}
        value={value}
        placeholder={placeholder}
        name={fieldName}
        autoComplete="off"
        onKeyDown={(e) => setInputKeyPress(e.key)}
        innerRef={inputRef}
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
        <FloatingMenu
          onItemSelected={(item) => onItemSelected(item)}
          open={setOpenMenu}
          setInputKeyPress={setInputKeyPress}
          inputkeyPress={inputkeyPress}
          items={filteredItems}
        />
      )}
    </div>
  );
}
