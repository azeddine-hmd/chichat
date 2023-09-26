"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-cover">
          <div
            className="fixed inset-0 h-screen w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/svg/orange-blob-bg.svg')" }}
          />
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
