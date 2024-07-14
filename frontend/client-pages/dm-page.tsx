"use client";

import Avatar from "@/components/atoms/avatar";
import TopBar from "@/components/molecules/topbar";
import ChatBoxList from "@/components/organisms/chat/chat-box-list";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import useErrorEvent from "@/hooks/use-error-event";
import { useEvent } from "@/hooks/use-event";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { SingleDm } from "@/types/single-dm";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DmPage({ id }: { id: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);

  const { setItem } = useActiveChannelItemContext();
  const [singleDm, setSingleDm] = useState<SingleDm | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [other, setOther] = useState<User | null>(null);
  const { friends } = useUserStore();

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
    const found = friends.find((friend) => friend.id == dm.other.id)!;
    setOther(found);
    setSingleDm(dm);
    setItem(dm);
  });

  // Update `other` when `friends` changes
  useEffect(() => {
    if (other && friends) {
      const found = friends.find((friend) => friend.id === other.id);
      if (found) {
        setOther(found);
      }
    }

    // eslint-disable-next-line
  }, [friends]);

  useEvent("dm:single:receivedMessage", (...args: any[]) => {
    const newMessage: Message = args[0];
    console.log("socket:dm:single:receivedMessage", newMessage);
    console.log("before messages:", messages);
    setMessages((prevMessages: Message[]) => {
      return [...prevMessages, newMessage];
    });
  });

  useEffect(() => {
    if (!singleDm) return;
    window.clientSocket
      .emitWithAck("dm:single:getMessages", singleDm.id)
      .then((messages: Message[]) => {
        setMessages(messages);
      });
  }, [singleDm]);

  useEvent("dm:single:deleteMessage", (...args: any[]) => {
    const messageId: number = args[0];
    const success: boolean = args[1];
    console.log("socket:dm:single:deleteMessage", messageId, success);
    if (success) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id != messageId)
      );
    }
  });

  useEvent("dm:single:updateMessage", (...args: any[]) => {
    const messageId = args[0];
    const updatedMessage: Message = args[1];
    console.log("socket:dm:single:updateMessage", messageId, updatedMessage);
    setMessages((prevMessages) => {
      const indx = prevMessages.findIndex((message) => message.id == updatedMessage.id);
      if (indx != -1) {
        console.error("message updated");
        prevMessages[indx] = updatedMessage;
        return prevMessages;
      } else {
        console.error("updated message of unknown message");
        return prevMessages;
      }
    })
  });

  return (
    <div className="flex h-full w-full flex-col">
      <TopBar>
        {singleDm && other && (
          <>
            <Avatar status={other.status} imageSrc={other.avatar} />
            <h3 className="text-sm font-medium">{other.displayName}</h3>
          </>
        )}
      </TopBar>
      <main
        ref={containerRef}
        className="flex h-full flex-col justify-end overflow-y-scroll bg-gray-600 pb-4"
      >
        <ChatBoxList
          className="block h-full overflow-y-scroll"
          messages={messages}
          singleDm={singleDm!}
          onDelete={(messageId) => {
            window.clientSocket.emitWithAck("dm:single:deleteMessage", singleDm?.id, messageId);
          }}
        />
        <ChatInputField
          placeholder={`Message @${other?.displayName}`}
          onMessageSent={onMessageSent}
          containerRef={containerRef}
          enableUploadButton
        />
      </main>
    </div>
  );
}
