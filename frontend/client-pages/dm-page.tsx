"use client";

import Avatar from "@/components/atoms/avatar";
import TopBar from "@/components/molecules/topbar";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import useErrorEvent from "@/hooks/use-error-event";
import { useEvent } from "@/hooks/use-event";
import { SingleDm } from "@/types/single-dm";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DmPage({ id }: { id: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);

  const { setItem } = useActiveChannelItemContext();
  const [singleDm, setSingleDm] = useState<SingleDm | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log("emitting to: dm:single:getDm");
    window.clientSocket.emit("dm:single:getDm", id);
    // eslint-disable-next-line
  }, []);

  useErrorEvent((error) => {
    if (typeof error === "string" && error === "dm not found")
      router.push("/channels/me");
  });

  useEvent("dm:single:getDm", (...args: any[]) => {
    const dm: SingleDm = args[0];
    console.log("socket:dm:single:getDm", dm);
    setSingleDm(dm);
    setItem(dm);
  });

  const onMessageSent = (message: string) => {
    window.clientSocket.emit("dm:single:saveMessage", singleDm?.id, message);
  };

  useEvent("dm:single:saveMessage", (...args: any[]) => {
    if (args[0] == "success") {
      const message = args[1];
      console.log("messaged saved:", message);
      setMessages((prev) => [...prev, message]);
    } else {
      console.error("message field to save");
    }
  });

  useEffect(() => {
    if (!singleDm) return;
    window.clientSocket.emit("dm:single:getMessages", singleDm.id);
  }, [singleDm]);

  useEffect(() => { console.log("messages:", JSON.stringify(messages)) }, [messages]);

  useEvent("dm:single:getMessages", (...args: any[]) => {
    console.log("got messages:", JSON.stringify(args[0]));
    setMessages(args[0]);
  });


  return (
    <div className="flex h-screen w-full flex-col">
      <TopBar>
        {singleDm && (
          <>
            <Avatar
              status={singleDm.other.status}
              imageSrc={singleDm.other.avatar}
            />
            <h3 className="text-sm font-medium">
              {singleDm.other.displayName}
            </h3>
          </>
        )}
      </TopBar>
      <main
        ref={containerRef}
        className="flex h-full flex-1 flex-col justify-between bg-gray-600 p-4"
      >
        <div className="h-full bg-gray-600"></div>
        <ChatInputField
          placeholder={`Message @${singleDm?.other.displayName}`}
          onMessageSent={onMessageSent}
          containerRef={containerRef}
        />
      </main>
    </div>
  );
}
