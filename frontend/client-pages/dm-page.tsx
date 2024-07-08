"use client";

import Avatar from "@/components/atoms/avatar";
import TopBar from "@/components/molecules/topbar";
import ChatBox from "@/components/organisms/chat/chat-box";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import useErrorEvent from "@/hooks/use-error-event";
import { useEvent } from "@/hooks/use-event";
import { useUserStore } from "@/stores/user-store";
import { SingleDm } from "@/types/single-dm";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";

export default function DmPage({ id }: { id: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {profile} = useUserStore();

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

  useEffect(() => {
    console.log("messages:", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEvent("dm:single:getMessages", (...args: any[]) => {
    console.log("got messages:", JSON.stringify(args[0]));
    setMessages(args[0]);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const { height: wrapperChatBoxHeight, ref: wrapperChatBoxRef } =
    useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    console.log("chat box wrapper height changed to:", wrapperChatBoxHeight);
    // scrollToBottom();
  }, [wrapperChatBoxHeight]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
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
        className="flex h-full flex-1 flex-col justify-between overflow-hidden  bg-gray-600"
      >
        <ul className="flex-shrink-1 h-full overflow-y-scroll bg-gray-600 p-4">
          {messages.length <= 50 && (
            <div className="mb-2 gap-y-2 flex flex-col">
              {singleDm?.other &&(
                <>
                <Avatar resolution={{ height: 96, width: 96 }} displayStatus={false} status={singleDm.other.status} imageSrc={singleDm.other.avatar} />
                  <h3 className="text-2xl font-bold">{singleDm.other.displayName}</h3>
                  <h6 className="text-lg font-normal">{singleDm.other.username}</h6>
                  <p className="text-muted text-sm mt-4 mb-4">This is the beginning of your direct message history with <span className="font-bold">{singleDm.other.displayName}</span></p>
                </>
              )}
            </div>
          )}
          {messages.map((message, index) => (
            <li key={index} className="list-none">
              <ChatBox
                time={Date.now()}
                content={
                  index == 4
                    ? "https://media.discordapp.net/attachments/1202990919020969987/1259713195296428142/bitches.jpg?ex=668caed6&is=668b5d56&hm=543b98bcae366c89c6436ad1f6139fafdf3d92507fa8b101fb46697acc85a554&=&format=webp"
                    : message
                }
                shape={index == 0 ? "FULL" : "BASIC"}
                isImage={index == 4 ? true : undefined}
              />
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
        <div className="flex-grow p-4" ref={wrapperChatBoxRef}>
          <ChatInputField
            placeholder={`Message @${singleDm?.other.displayName}`}
            onMessageSent={onMessageSent}
            containerRef={containerRef}
          />
        </div>
      </main>
    </div>
  );
}
