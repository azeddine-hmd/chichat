"use client";

import DotLoading from "@/components/atoms/dot-loading";
import { useEffect, useState } from "react";

type CodeAuthVerificationProps = {
  params: {
    code: string;
  };
};

async function checkValidationCode(code: string) {
  const data = {
    code: code,
  };
  console.log(
    `url: ${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/email-verify`
  );
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_DOMAIN + "/api/auth/email-verify/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );
  return res.ok ? true : false;
}

export default function CodeAuthVerification({
  params: { code },
}: CodeAuthVerificationProps) {
  const [onValidating, setOnValidating] = useState(true);
  const [validationStatus, setValidationStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const isVerified = await checkValidationCode(code);
      setTimeout(() => {
        setOnValidating(false);
        setTimeout(() => {
          window.location.assign("/login");
        }, 2000);
      }, 1000);
    })();
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center">
      {onValidating ? (
        <>
          <div className="mb-4 text-2xl font-semibold text-foreground">
            Validating Email
          </div>
          <DotLoading />
        </>
      ) : (
        <>
          {validationStatus ? (
            <div className="text-2xl font-semibold text-white">
              <span className="text-2xl text-green-500">✓</span> Email
              validation succeeded.
            </div>
          ) : (
            <div className="text-2xl font-semibold text-white">
              <span className="text-4xl text-red-500">x</span> Email Validation
              Failed!{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
}
