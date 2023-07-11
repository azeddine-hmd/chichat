import Field from "@/components/atoms/field";
import FieldInput from "@/components/atoms/field-input";
import ArrowDownSvg from "@/svg/arrow-down";
import React from "react";
import {
  BsArrowBarDown,
  BsArrowDown,
  BsArrowDownCircle,
  BsArrowDownShort,
  BsArrowDownSquare,
  BsFileArrowDown,
} from "react-icons/bs";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 w-full text-xs font-semibold text-muted">
      {children}
    </div>
  );
}

export default function Login() {
  return (
    <div className="flex h-[602px] w-[480px] flex-col items-center rounded-md bg-gray-600 p-8 shadow-lg">
      <h1 className="text-2xl font-semibold text-white/90">
        Create an account
      </h1>
      <div className="mt-5 h-full w-full">
        <Label>EMAIL</Label>
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
        <Label>DATE OF BIRTH</Label>
        <div className="flex flex-nowrap justify-start gap-2 w-full">
          <FieldInput className="h-10 max-w-[145px] flex justify-between flex-shrink border border-gray-850" placeholder={""}>
            <div className="m-1" >Month</div>
            <ArrowDownSvg className="text-foreground m-1" />
          </FieldInput>
        </div>
      </div>
    </div>
  );
}
