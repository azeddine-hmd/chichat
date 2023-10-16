"use client";

import { authUser } from "@/network";
import React, { useEffect, useState } from "react";

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

const pathWhitelist = [
  "/login",
  "/register",
  "/verify-email",
  "/test"
]; // TODO: remove test path

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [onRender, setOnRender] = useState(false);

  useEffect(() => {
    (async () => {
      if (!pathWhitelist.some((path) => window.location.pathname.startsWith(path))) {
        const error = await authUser();
        error ? window.location.assign("/login") : setOnRender(true);
      } else {
        setOnRender(true);
      }
    })();
  }, []);

  return <>{onRender && <>{children}</>}</>;
}
