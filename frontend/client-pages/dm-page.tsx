"use client";

import Avatar from "@/components/atoms/avatar";
import TopBar from "@/components/molecules/topbar";
import ChatBoxList from "@/components/organisms/chat/chat-box-list";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import useErrorEvent from "@/hooks/use-error-event";
import { useEvent } from "@/hooks/use-event";
import { Message } from "@/models/message";
import { SingleDm } from "@/types/single-dm";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DmPage({ id }: { id: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);

  const { setItem } = useActiveChannelItemContext();
  const [singleDm, setSingleDm] = useState<SingleDm | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const onMessageSent = (message: string) => {
    window.clientSocket.emit("dm:single:saveMessage", singleDm?.id, message);
  };

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

  useEvent("dm:single:receivedMessage", (...args: any[]) => {
    const newMessage: Message = args[0];
    console.log("socket:dm:single:receivedMessage", newMessage);
    console.log("before messages:", messages);
    setMessages((prevMessages: Message[]) => { return [...prevMessages, newMessage]});
  });

  useEffect(() => {
    if (!singleDm) return;
    window.clientSocket
      .emitWithAck("dm:single:getMessages", singleDm.id)
      .then((messages: Message[]) => {
        setMessages(messages);
      });
  }, [singleDm]);

  return (
    <div className="flex h-full w-full flex-col">
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
        className="flex h-full flex-col justify-end overflow-y-scroll bg-gray-600 pl-4 pb-4"
      >
        <ChatBoxList
          className="block overflow-y-scroll h-full"
          messages={messages}
          singleDm={singleDm!}
        />
        <ChatInputField
          placeholder={`Message @${singleDm?.other.displayName}`}
          onMessageSent={onMessageSent}
          containerRef={containerRef}
        />
      </main>
    </div>
  )
}
