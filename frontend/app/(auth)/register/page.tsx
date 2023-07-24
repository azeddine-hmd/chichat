"use client";

import FieldInput from "@/components/atoms/field-input";
import Label from "@/components/atoms/label";
import Dropdownmenu from "@/components/molecules/dropdown-menu";
import PrimaryButton from "@/components/molecules/primary-button";
import Link from "next/link";
import React, { MouseEvent } from "react";

export default function Login() {
  const continueOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    window.location.href = "/";
  };

  return (
    <div className="flex h-fit w-[480px] flex-col items-center rounded-md bg-gray-600 p-8 shadow-lg">
      <h1 className="text-2xl font-semibold text-white/90">
        Create an account
      </h1>
      <div className="mt-5 h-full w-full">
        <Label>Display Name</Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
        ></FieldInput>
        <Label>USERNAME</Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
        ></FieldInput>
        <Label>PASSWORD</Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
          type="password"
        ></FieldInput>
        <Label>EMAIL</Label>
        <FieldInput
          className="text-md mb-5 h-10 w-full bg-gray-850 p-2 text-foreground"
          placeholder=""
        ></FieldInput>
        <Label>DATE OF BIRTH</Label>
        <div className="flex w-full flex-nowrap justify-start gap-2">
          <Dropdownmenu
            className="max-w-[145px]"
            placeholder="Month"
            items={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
          <Dropdownmenu
            className="max-w-[145px]"
            placeholder="Day"
            items={Array.from({ length: 31 }, (_, index) => String(index + 1))}
          />
          <Dropdownmenu
            className="max-w-[145px]"
            placeholder="Year"
            items={Array.from({ length: 40 }, (_, index) =>
              String(2020 - index)
            )}
          />
        </div>
        <PrimaryButton
          className="text-md mt-5 flex h-[44px] items-center justify-center bg-primary font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/80 hover:transition-all hover:duration-300 active:bg-primary/60 "
          onClick={continueOnClick}
        >
          Continue
        </PrimaryButton>
        <div className="mt-4">
          <Link href="/login" className="text-sm text-link">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
