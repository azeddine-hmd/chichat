"use client";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "@/config";
import { AxiosError } from "axios";

let pathWhitelist = ["/login", "/register", "/verify-email"];

if (process.env.NODE_ENV === "development") pathWhitelist.push("/test");

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

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
    onError: (err: AxiosError) => window.location.assign("/login"),
  });

  useEffect(() => {
    if (
      !pathWhitelist.some((path) => window.location.pathname.startsWith(path))
    ) {
      passMut.mutate();
    } else {
      setOnRender(true);
    }
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
