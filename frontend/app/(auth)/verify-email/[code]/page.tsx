"use client";

import DotLoading from "@/components/atoms/dot-loading";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsX, BsXLg } from "react-icons/bs";


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
    `url: ${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/email-verify`,
    `data: ${JSON.stringify(data)}`
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
  const ignore = useRef(false);

  useEffect(() => {
    if (ignore.current) return;
    console.log("verification on progress...");
    (async () => {
      const isVerified = await checkValidationCode(code);
      if (isVerified) {
        setTimeout(() => {
          setValidationStatus(true);
          setOnValidating(false);
          setTimeout(() => {
            console.log("going to channels/friends");
            window.location.assign("/channels/friends")
          }, 2000);
        }, 1000);
      } else {
        setTimeout(() => {
          setValidationStatus(false);
          setOnValidating(false);
          setTimeout(() => {
            console.log("going to login");
            window.location.assign("/login");
          }, 2000);
        }, 1000);
      }
    })();
    return () => {
      ignore.current = true;
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          {onValidating ? (
            <>
              <div className="mb-4 text-lg font-semibold text-foreground">
                Validating Email
              </div>
              <DotLoading />
            </>
          ) : (
            <>
              {validationStatus ? (
                <div className="text-lg font-semibold text-white">
                  <span className="text-green-500">✓</span> Email
                  validation succeeded.
                </div>
              ) : (
                <div className="font-semibold text-white flex justify-center items-center gap-2 text-lg">
                  <BsXLg className="text-red-500" size="20" strokeWidth={1} />
                  Email Validation Failed!{" "}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
