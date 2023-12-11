import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { Channel } from "@/models/channel";
import { User } from "@/models/user";
import Button from "../atoms/button";
import React from "react";

type ItemProps = {
  item: Channel | User;
  highlight?: boolean;
  setHighlightedItem: Dispatch<SetStateAction<number>>;
  index: number;
};

function Item({
  item,
  highlight = false,
  setHighlightedItem,
  index,
}: ItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlight && ref.current)
      ref.current.scrollIntoView({ block: "nearest" });
  }, [highlight, ref, index]);

  return (
    <div ref={ref}>
      <Button
        className={twJoin(
          "flex w-full justify-start rounded-sm pl-3",
          highlight && "bg-gray-300/10"
        )}
        onMouseOver={(event: MouseEvent<HTMLButtonElement>) => {
          setHighlightedItem(index);
        }}
      >
        {item instanceof Channel 
          && <p>#&nbsp;&nbsp;{item.name}</p>
        }
        {item instanceof User 
          && <p>user dm info</p>
        }
      </Button>
    </div>
  );
}

function InitialResults() {
  const [highlightedItem, setHighlightedItem] = useState(0);
  const [prevChannels, setPrevChannels] = useState<Array<Channel>>([
    new Channel({ id: 0, name: "general" }),
    new Channel({ id: 1, name: "announcement" }),
    new Channel({ id: 3, name: "lost-found3" }),
    new Channel({ id: 4, name: "lost-found4" }),
    new Channel({ id: 5, name: "lost-found5" }),
    new Channel({ id: 6, name: "lost-found6" }),
  ]);
  const [prevUsers, setPrevUsers] = useState<Array<User>>([
    new User({
      id: 0,
      username: "faysal#444",
      displayName: "fbouibao",
      avatar: "",
      status: "online",
    }),
    new User({ id: 1, username: "Fati#32", displayName: "Fati", avatar: "", status: "online" }),
    new User({ id: 2, username: "John#13", displayName: "John", avatar: "", status: "online" }),
    new User({ id: 3, username: "John2#14", displayName: "John2", avatar: "", status: "online" }),
    new User({ id: 4, username: "John3#15", displayName: "John3", avatar: "", status: "online" }),
    new User({ id: 5, username: "John4#16", displayName: "John4", avatar: "", status: "online" }),
  ]);

  const maxLen = prevChannels.length + prevUsers.length;

  useKeyboardShortcut({
    keys: ["ArrowUp"],
    callback: (_) => {
      if (highlightedItem == 0) setHighlightedItem(maxLen - 1);
      else setHighlightedItem(highlightedItem - 1);
    },
  }, true);

  useKeyboardShortcut({
    keys: ["ArrowDown"],
    callback: (_) => {
      if (highlightedItem == maxLen - 1) setHighlightedItem(0);
      else setHighlightedItem(highlightedItem + 1);
    },
  }, true);

  return (
    <>
      <div className="ml-2 mr-auto mt-4 text-xs font-semibold text-muted">
        PREVIOUS CHANNELS
      </div>
      <div className="mt-2 h-fit w-full overflow-y-auto">
        {prevChannels.map((channel, index) => {
          return highlightedItem == index ? (
            <Item
              key={channel.id}
              item={channel}
              index={index}
              setHighlightedItem={setHighlightedItem}
              highlight
            />
          ) : (
            <Item
              key={channel.id}
              item={channel}
              index={index}
              setHighlightedItem={setHighlightedItem}
            />
          );
        })}
      </div>
      <div className="ml-2 mr-auto mt-4 text-xs font-semibold text-muted">
        PREVIOUS DMs
      </div>
      <div className="mt-2 h-fit w-full overflow-y-auto">
        {prevUsers.map((user, i) => {
          const index = prevChannels.length + i;
          return highlightedItem == index ? (
            <Item
              key={user.id}
              item={user}
              index={index}
              setHighlightedItem={setHighlightedItem}
              highlight
            />
          ) : (
            <Item
              key={user.id}
              item={user}
              index={index}
              setHighlightedItem={setHighlightedItem}
            />
          );
        })}
      </div>
    </>
  );
}

type HotResultType = {
  text: string;
};

function HotResult({ text }: HotResultType) {
  const [highlightedItem, setHighlightedItem] = useState(0);

  const filterResults = (input: string, results: Array<Channel | User>) => {
    let newResults: Array<Channel | User> = []
    results.forEach((result) => {
      let target = "";
      if (result instanceof Channel)
        target = result.name
      if (result instanceof User)
        target = result.displayName

      if (target.toLowerCase().includes(input.toLowerCase()))
        newResults.push(result);
    })
    return newResults;
  }
  const [results, setResults] = useState<Array<Channel | User>>(filterResults(text, [
    new Channel({id: 0, name: "general"}),
    new Channel({id: 1, name: "announcement"}),
    new Channel({id: 3, name: "lost-found3"}),
    new User({id: 0, username: "faysal#444", displayName: "fbouibao", avatar: "", status: "online"}),
    new User({id: 1, username: "Fati#32", displayName: "Fati", avatar: "", status: "online"}),
    new User({id: 2, username: "John#13", displayName: "John", avatar: "", status: "online"}),
  ]));

  useKeyboardShortcut({
    keys: ["ArrowUp"],
    callback: (_) => {
      if (highlightedItem == 0) setHighlightedItem(results.length - 1);
      else setHighlightedItem(highlightedItem - 1);
    },
  }, true);

  useKeyboardShortcut({
    keys: ["ArrowDown"],
    callback: (_) => {
      if (highlightedItem == results.length - 1) setHighlightedItem(0);
      else setHighlightedItem(highlightedItem + 1);
    },
  }, true);


  return (
    <>
      <div className="mt-2 h-fit w-full overflow-y-auto">
        {results.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              setHighlightedItem={setHighlightedItem}
              highlight={highlightedItem === index}
            />
          )
        )}
      </div>
    </>
  );
}

export type SearchResultProps = {
  searchText: string;
};

export default function SearchResult({ searchText }: SearchResultProps) {
  const initialResults = searchText.length === 0;
  return (
    <div className="flex h-[250px] w-full flex-col items-center justify-start pb-2 pl-5 pr-5 pt-5">
      {initialResults 
        ? <InitialResults /> 
        : <HotResult text={searchText} />
      }
    </div>
  );
}
