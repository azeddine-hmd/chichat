"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "../molecules/primary-button";

export type SnackbarProps = {
  children?: React.ReactNode;
  errors?: string[];
  timeMs?: number;
} & React.ComponentProps<"div">;

export default function Snackbar({
  children,
  className,
  timeMs = 10_000,
  errors = [
    "username already exist! fweifjweoifj weifoj weofijweo fijwoefi jweiof j fwioefjwoeifj",
  ],
}: SnackbarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [test, setTest] = useState(true);
  const step = 50;

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(currentTime + step);
      // console.log("initial" + currentTime);
    }, step);
    setTest(false);
  }, []);

  useEffect(() => {
    if (currentTime > timeMs) {
    } else {
      setTimeout(() => {
        // console.log(((timeMs - currentTime) * step) / timeMs );
        const percent = Math.floor(((timeMs - currentTime) * 100) / timeMs);
        // console.log(`percent: ${percent}%`);

        setCurrentTime(currentTime + step);
        // console.log("what ?? value=" + currentTime);
      }, step);
    }
  }, [currentTime]);

  return (
    <div className="fixed left-0 right-0 top-0">
      <div
        className={twMerge(
          "min-h-10 relative flex flex-col items-center justify-center bg-red-500 p-4 text-xl font-medium text-white",
          className
        )}
      >
        <div className="flex -translate-x-[40px] flex-col items-start justify-center">
          {errors.map((error) => {
            return (
              <div key={error}>
                <span className="font-bold"></span>
                {error}
              </div>
            );
          })}
        </div>
        <PrimaryButton className="absolute bottom-2 right-8 top-[50%] h-fit w-fit -translate-y-1/2 border border-white text-white hover:bg-white/0 active:bg-white/5">
          Close
        </PrimaryButton>
      </div>
      <div className="h-1 w-full bg-white">
        <div className={`h-1 transition-all bg-red-400 duration-1000 delay-[10s] ${ test ? "w-[0%]" : "w-[100%]"} `}></div>
          <div
            className="h-1 bg-red-400 duration-100"
            style={{
              width: Math.floor(((timeMs - currentTime) * 100) / timeMs) + "%",
            }}
          ></div>
      </div>
    </div>
  );
}
