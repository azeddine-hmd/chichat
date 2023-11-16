import React, { useEffect, useRef } from "react";
import Hr from "../atoms/hr";
import FieldInput from "../atoms/field-input";
import PrimaryButton from "../molecules/primary-button";

export default function AddFriends() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <>
    <main className="flex w-full flex-col space-y-4 p-4 px-8">
      <h1 className="text-sm font-medium text-white">ADD FRIENDS</h1>
      <div className="relative h-fit w-full">
      <FieldInput 
        className="bg-gray-800 h-12 p-2 px-4 text-sm text-white rounded-lg focus:outline-1"
        placeholder="You can add friends with thier username."
        innerRef={inputRef}
      />
      <PrimaryButton className="absolute bg-primary text-sm text-white h-8 right-4 top-1/2 -translate-y-1/2" >
        Send Friend Request
      </PrimaryButton>
      </div>
    </main>
    <Hr className="w-full border-b border-separator-xlight" />
    </>
  );
}
