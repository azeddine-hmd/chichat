"use client";

import { authUser } from "@/network";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let pathWhitelist = ["/login", "/register", "/verify-email"];

if (process.env.NODE_ENV === "development") pathWhitelist.push("/test");

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [onRender, setOnRender] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {onRender && (
        <QueryClientProvider client={queryClient}>
          <div className="h-full w-full overflow-hidden">{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      )}
    </>
  );
}
