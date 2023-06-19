import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import BaseTemplate from "@/components/templates/base-template";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Discord| Your Place To Talk and Hang Out",
  description:
    "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseTemplate >
          {children}
        </BaseTemplate>
      </body>
    </html>
  );
}
