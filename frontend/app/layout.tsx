import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { GlobalTemplateConfig } from "@/components/templates/global";

export const metadata = {
  title: "ChiChat | Chat and Hang Out With Friends",
  description:
    "ChaChat talk over voice, video, and text. Talk, chat, hang out, and join many friends and communities.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <GlobalTemplateConfig>{children}</GlobalTemplateConfig>
      </body>
    </html>
  );
}
