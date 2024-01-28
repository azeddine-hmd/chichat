"use client";

import DotLoading from "@/components/atoms/dot-loading";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/axios";

type CodeAuthVerificationProps = {
  params: {
    code: string;
  };
};

export default function CodeAuthVerification({
  params: { code },
}: CodeAuthVerificationProps) {
  const verifyEmail = useMutation({
    mutationFn: (code: string) => {
      return api.post("/api/auth/email-verify", { code: code });
    },
    onSuccess: () => setTimeout(() => window.location.assign("/channels/me"), 2_000),
    onError: () => setTimeout(() => window.location.assign("/login"), 2_000),
  });

  useEffect(() => {
    verifyEmail.mutate(code);
    // eslint-disable-next-line
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          {verifyEmail.isPending ? (
            <>
              <div className="mb-4 text-lg font-semibold text-foreground">
                Validating Email
              </div>
              <DotLoading />
            </>
          ) : (
            <>
              {verifyEmail.isSuccess && (
                <div className="text-lg font-semibold text-white">
                  <span className="text-green-500">✓</span> Email validation
                  succeeded.
                </div>
              )}
              {verifyEmail.isError && (
                <div className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                  <BsXLg className="text-red-500" size="20" strokeWidth={1} />
                  Email Validation Failed! <br />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
