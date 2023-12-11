import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Hr from "../atoms/hr";
import FieldInput from "../atoms/field-input";
import PrimaryDotLoadingButton from "../molecules/primary-dot-loading-button";

export default function AddFriends() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  function onSendFriendRequestClicked(
    e: MouseEvent<HTMLButtonElement>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoadingState(true);
    setTimeout(() => { console.log('simulating network request'); setLoadingState(false); }, 5000);
  }

  return (
    <>
      <main className="flex w-full flex-col space-y-4 p-4 px-8">
        <h1 className="text-sm font-medium text-white">ADD FRIENDS</h1>
        <div className="relative h-fit w-full">
          <FieldInput
            className="h-12 rounded-lg bg-gray-800 p-2 px-4 text-sm text-white focus:outline-1"
            placeholder="You can add friends with thier username."
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            innerRef={inputRef}
          />
          <PrimaryDotLoadingButton
            disabled={inputText.length == 0}
            className="absolute right-4 top-1/2 h-8 -translate-y-1/2 bg-primary text-sm text-white"
            onButtonClicked={(e, setLoadingState) =>
              onSendFriendRequestClicked(e, setLoadingState)
            }
          >
            Send Friend Request
          </PrimaryDotLoadingButton>
        </div>
      </main>
      <Hr className="w-full border-b border-separator-xlight" />
    </>
  );
}
