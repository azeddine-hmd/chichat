import LoginWallpaperSvg from "@/svg/login-wallpaper";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <LoginWallpaperSvg className="fixed inset-0 -z-10 h-full w-full" />
      <div className="flex h-full w-full items-center justify-center">
        <div className="mb-10 rounded-md bg-gray-600 p-8 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
