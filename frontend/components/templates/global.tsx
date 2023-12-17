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
      connectSocket();
      setShowPage(true);
    },
    onError: () => window.location.assign("/login"),
  });

  useEffect(() => {
    const pathName = window.location.pathname;
    if (!publicPages.some((page) => pathName.startsWith(page))) {
      passMut.mutate();
    } else {
      setShowPage(true);
    }
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
