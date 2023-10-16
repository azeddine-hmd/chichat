"use client";

import { motion } from "framer-motion";
import { BsMailbox } from "react-icons/bs";

export default function SendEmail() {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-2xl">
        <div className="flex w-[500px] flex-col items-center justify-center text-muted">
          <BsMailbox size="128" />
          <div className="text-center text-2xl text-muted">
            We have sent an <span className="font-bold">email</span> containing
            a verification code link. Kindly check your{" "}
            <span className="font-bold">inbox</span> to proceed with the account{" "}
            <span className="font-bold">activation</span> process.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
