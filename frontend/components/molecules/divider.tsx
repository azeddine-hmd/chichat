import React from "react";
import Hr, { HrProps } from "../atoms/hr";
import { twJoin } from "tailwind-merge";

export type DividerProps = {
} & HrProps;

export default function Divider({ className }: DividerProps) {
  return <Hr className={twJoin("mb-2 w-8", className)} ></Hr>;
}
