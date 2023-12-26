import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Hr from "../atoms/hr";
import FieldInput from "../atoms/field-input";
import PrimaryLoadingButton from "../molecules/primary-dot-loading-button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config";
import { delay } from "@/lib/delay";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";

export default function AddFriends() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inputText, setInputText] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { pendingFR, setPendingFR } = useUserStore();

  const sendFriendReqMut = useMutation({
    mutationFn: async (username: string) => {
      await delay(1_000);
      return await api.post<User>(`/api/users/friends/send/${username}`);
    },
    onSuccess: (response) => {
      const user = response.data;
      if (pendingFR && !pendingFR?.some((profile) => profile.id === user.id))
        setPendingFR([...pendingFR, { ...user, isSentFR: true }]);
      setIsError(false);
      setIsSuccess(true);
    },
    onError: () => {
      setIsSuccess(false);
      setIsError(true);
    },
  });

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  function sendFriendRequest() {
    sendFriendReqMut.mutate(inputText);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
    setIsError(false);
  }

  function handleInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key=== "Enter") {
      buttonRef?.current?.click();
    }
  }

  return (
    <>
      <main className="flex w-full flex-col p-4 px-8">
        <h1 className="text-sm font-medium text-white">ADD FRIENDS</h1>
        <div className="relative mt-4 h-fit w-full">
          <FieldInput
            className="h-12 rounded-lg bg-gray-800 p-2 px-4 text-sm text-white"
            placeholder="You can add friends with thier username."
            onChange={handleInputChange}
            value={inputText}
            innerRef={inputRef}
            isError={isError}
            isSuccess={isSuccess}
            onKeyDown={handleInputKey}
          />
          <PrimaryLoadingButton
            disabled={inputText.length == 0 || sendFriendReqMut.isPending}
            className="absolute right-4 top-1/2 h-8 w-40 -translate-y-1/2 rounded-sm bg-primary text-xs font-medium text-white"
            onClick={() => sendFriendRequest()}
            onLoading={sendFriendReqMut.isPending}
            innerRef={buttonRef}
          >
            Send Friend Request
          </PrimaryLoadingButton>
        </div>
        <div className="ml-2 mt-2 text-sm font-light">
          {isError && (
            <div className="text-red-400">
              {"Hm, didn't work. Double check that the username is correct"}
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500">
              {"Success! Your friend request to "}
              <span className="font-bold">{inputText}</span>
              {" was sent."}
            </div>
          )}
        </div>
      </main>
      <Hr className="w-full border-b border-separator-xlight" />
    </>
  );
}
