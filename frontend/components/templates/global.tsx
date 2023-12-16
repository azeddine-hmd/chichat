"use client";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api } from "@/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let pathWhitelist = ["/login", "/register", "/verify-email"];

if (process.env.NODE_ENV === "development") pathWhitelist.push("/test");

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export function GlobalTemplateConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalTemplate>{children}</GlobalTemplate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [onRender, setOnRender] = useState(false);

  const passMut = useMutation({
    mutationFn: () => api.get("/api/auth/pass"),
    onSuccess: () => {
      setOnRender(true);
      window.clientSocket = io(
        process.env.NEXT_PUBLIC_BACKEND_DOMAIN as string,
        {
          transports: ["websocket"],
          withCredentials: true,
        }
      );
    },
    onError: () => window.location.assign("/login"),
  });

  const pathName = window.location.pathname;

  useEffect(() => {
    if (!pathWhitelist.some((path) => pathName.startsWith(path))) {
      passMut.mutate();
    } else {
      setOnRender(true);
    }
  }, [passMut, pathName]);

  return (
    <>
      {onRender && (
        <div className="h-full w-full overflow-hidden">{children}</div>
      )}
    </>
  );
}
