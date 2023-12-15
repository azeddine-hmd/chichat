"use client";

import { BsPersonFill } from "react-icons/bs";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import IconButton from "./icon-button";

export default function DefaultContentChannel() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(0);

  function onClickFriends(_: MouseEvent<HTMLButtonElement>) {
    if (selectedItem != 0) {
      router.push("/app/channels/friends");
      setSelectedItem(0);
    }
  }

  return (
    <IconButton 
      className="h-[42px] w-full" onClick={onClickFriends}
      active={selectedItem == 0}
    >
      <div className="flex items-center justify-center space-x-2">
        <BsPersonFill size="22" />
        <div>Friends</div>
      </div>
    </IconButton>
  );
}
