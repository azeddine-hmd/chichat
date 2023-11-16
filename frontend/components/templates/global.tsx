"use client";

import { authUser } from "@/network";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

let pathWhitelist = ["/login", "/register", "/verify-email"];

if (process.env.NODE_ENV === "development") pathWhitelist.push("/test");

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [onRender, setOnRender] = useState(false);
  const ignore = useRef(false);

  useEffect(() => {
    if (ignore.current) return;
    (async () => {
      if (
        !pathWhitelist.some((path) => window.location.pathname.startsWith(path))
      ) {
        const error = await authUser();
        if (error) {
          console.log(`authUser error: ${error.message}`);
          window.location.assign("/login");
        }
        setOnRender(true);
        window.clientSocket = io(
          process.env.NEXT_PUBLIC_BACKEND_DOMAIN as string,
          {
            transports: ["websocket"],
            withCredentials: true,
          }
        );
      } else {
        setOnRender(true);
      }
    })();
    return () => {
      ignore.current = true;
    };
  }, []);

  return <>{onRender && <>{children}</>}</>;
}
