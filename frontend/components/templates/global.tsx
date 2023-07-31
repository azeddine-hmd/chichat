"use client";

import { authUser } from "@/network";
import React, { useEffect, useState } from "react";

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

const pathWhitelist = ["/login", "/register", "/auth/verify-email"];

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [onRender, setOnRender] = useState(false);

  useEffect(() => {
    (async () => {
      if (!pathWhitelist.some((path) => window.location.pathname.startsWith(path))) {
        console.log(window.location.pathname);
        const error = await authUser();
        error ? window.location.assign("/login") : setOnRender(true);
      } else {
        setOnRender(true);
      }
    })();
  }, []);

  return <>{onRender && <>{children}</>}</>;
}
