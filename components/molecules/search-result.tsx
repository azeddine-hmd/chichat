import { useState } from "react";
import { twJoin } from "tailwind-merge";
import Button, { ButtonProps } from "../atoms/button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { Channel } from "@/types/channel";
import { User } from "@/types/user";

type ItemProps = {
  item: Channel | User;
  highlight?: boolean;
};

function Item({ item, highlight = false }: ItemProps) {
  return (
    <Button
      key={item.id}
      className={twJoin("flex w-full justify-start rounded-sm pl-3", (highlight && "bg-gray-300/10"))} >
      {(item instanceof Channel) && `#&nbsp;&nbsp;${item.name}`}
      {(item instanceof User) && `#&nbsp;&nbsp;${item.displayName}`}
    </Button>
  );
}

export type SearchResultProps = {
  searchText: string;
};

export default function SearchResult({ searchText }: SearchResultProps) {
  const [prevChannels, setPrevChannels] = useState<Array<Channel>>([
    {id: 0, name: "general"},
    {id: 1, name: "announcement"},
  ]);
  const [prevUsers, setPrevUsers] = useState<Array<User>>([
    {id:0, username: "faysal#444", displayName: "fbouibao", avatar: ""},
    {id:1, username: "Fati#32", displayName: "Fati", avatar: ""},
    {id:2, username: "FireSparkWee#8888", displayName: "FireSparkWee", avatar: ""},
  ]);
  const [onHover, setOnHover] = useState(false);
  const initialResults = searchText.length === 0;

  useKeyboardShortcut({
    keys: ["ArrowDown"],
    callback: () => { },
  });

  useKeyboardShortcut({
    keys: ["ArrowUp"],
    callback: () => { },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-start pb-2 pl-5 pr-5 pt-5">

      {initialResults &&
        <div className="h-full w-full">
          <div className="ml-2 mr-auto mt-4 text-xs font-semibold text-muted">
            PREVIOUS CHANNELS
          </div>
          <div className="mt-2 h-fit w-full overflow-y-scroll">
            {prevChannels.map((channel) => <Item key={channel.id} item={channel} /> )}
          </div>
          <div className="ml-2 mr-auto mt-4 text-xs font-semibold text-muted">
            PREVIOUS DMs
          </div>
          <div className="mt-2 h-fit w-full overflow-y-scroll">
            {prevUsers.map((user) => <Item key={user.id} item={user} /> )}
          </div>

        </div>
      }
    </div>
  );
}
