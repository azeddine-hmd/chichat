import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Discord| Your Place To Talk and Hang Out",
  description:
    "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
