"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "@/config";
import { connectSocket } from "@/config/socket-client";

let publicPages = ["/login", "/register", "/verify-email"];

type GlobalTemplateProps = {
  children?: React.ReactNode;
};

export default function GlobalTemplate({ children }: GlobalTemplateProps) {
  const [showPage, setShowPage] = useState(false);

  const passMut = useMutation({
    mutationFn: () => api.get("/api/auth/pass"),
    onSuccess: () => {
      const pathName: string = window.location.pathname;
      const isPublic = publicPages.some((page) => pathName === page);
      if (isPublic) {
        window.location.assign("/channels/friends");
      } else {
        connectSocket();
        setShowPage(true);
      }
    },
    onError: () => {
      const pathName: string = window.location.pathname;
      if (!publicPages.some((page) => pathName === page)) {
        window.location.assign("/login");
      } else {
        setShowPage(true);
      }
    },
  });

  useEffect(() => {
    // debugger
    passMut.mutate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {showPage && (
        <div className="h-full w-full overflow-hidden">{children}</div>
      )}
    </>
  );
}
