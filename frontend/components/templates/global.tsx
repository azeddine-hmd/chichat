"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "@/config";
import { connectSocket } from "@/config/socket-client";
import { usePathname } from "next/navigation";
import SplashScreen from "./splash-screen";

let publicPages = ["/login", "/register", "/verify-email"];

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [showPage, setShowPage] = useState(false);
  const pathname = usePathname();
  const isPublic = publicPages.some((page) => pathname.startsWith(page));

  const passMut = useMutation({
    mutationFn: () => api.get("/api/auth/pass"),
    onSuccess: async () => {
      if (isPublic) {
        window.location.assign("/channels/me");
      } else {
        await connectSocket({
          onReady: () => {
            setShowPage(true);
          },
          onDisconnect: () => setShowPage(false),
        });
      }
    },
    onError: () => {
      if (isPublic) {
        setShowPage(true);
      } else {
        window.location.assign("/login");
      }
    },
  });

  useEffect(() => {
    passMut.mutate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showPage && (
        <div
          className="h-full w-full overflow-hidden"
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {children}
        </div>
      )}
      {!showPage && !isPublic && <SplashScreen />}
    </>
  );
}
