"use client";

import { BsPerson, BsPersonFill } from "react-icons/bs";
import PrimaryButton from "./primary-button";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
    <PrimaryButton 
      className="h-[42px] w-full" onClick={onClickFriends}
      active={selectedItem == 0}
    >
      <div className="flex items-center justify-center space-x-2">
        <BsPersonFill size="22" />
        <div>Friends</div>
      </div>
    </PrimaryButton>
  );
}
