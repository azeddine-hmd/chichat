import LoginWallpaperSvg from "@/svg/login-wallpaper";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <LoginWallpaperSvg className="w-full h-full fixed inset-0 -z-10" />
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
