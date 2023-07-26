"use client";

import { useEffect } from "react";

type CodeAuthVerificationProps = {
  params: {
    code: string;
  };
};

async function checkValidationCode(code: string) {
  const data = {
    code: code,
  };
  console.log(`url: ${process.env.BACKEND_DOMAIN}/auth/email-verify`);
  const res = await fetch(process.env.BACKEND_DOMAIN + "/auth/email-verify/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.ok ? true : false;
}

export default async function CodeAuthVerification({
  params,
}: CodeAuthVerificationProps) {
  // const verified = await checkValidationCode(params.code);
  useEffect(async () => {
    console.log('verfied successfully');
  }, [])

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-600 p-8 shadow-lg text-white">
      <div>My Code: {params.code}</div>
      <div></div>
    </div>
  );
}
