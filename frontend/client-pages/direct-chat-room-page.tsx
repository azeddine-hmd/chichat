"use client";

import Avatar from "@/components/atoms/avatar";
import TopBar from "@/components/molecules/topbar";
import ChatBoxList from "@/components/organisms/chat/chat-box-list";
import ChatInputField from "@/components/organisms/chat/chat-input-field";
import { useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import useErrorEvent from "@/hooks/use-error-event";
import { useEvent } from "@/hooks/use-event";
import { Message } from "@/models/message";
import { useUserStore } from "@/stores/user-store";
import { ChatRoom } from "@/types/chat-room";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function DirectChatRoomPage({ id }: { id: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLElement | null>(null);

  const { setItem } = useActiveChannelItemContext();
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { friends } = useUserStore();

  const onMessageSent = (message: string) => {
    window.clientSocket.emit("chatroom:saveMessage", chatRoom?.id, message);
  };

  useEffect(() => {
    console.log("emitting to: chatroom:getChatRoom");
    window.clientSocket.emit("chatroom:getChatRoom", id);
    // eslint-disable-next-line
  }, []);

  useErrorEvent((error) => {
    if (typeof error === "string" && error === "chatroom not found")
      router.push("/channels/me");
  });

  useEvent("chatroom:getChatRoom", (...args: any[]) => {
    const chatRoom: ChatRoom = args[0];
    console.log("chatroom:getChatRoom", chatRoom);
    setChatRoom(chatRoom);
    setItem(chatRoom);
  });

  useEvent("chatroom:receivedMessage", (...args: any[]) => {
    const newMessage: Message = args[0];
    console.log("chatroom:receivedMessage", newMessage);
    console.log("before messages:", messages);
    setMessages((prevMessages: Message[]) => {
      return [...prevMessages, newMessage];
    });
  });

  useEffect(() => {
    if (!chatRoom) return;
    window.clientSocket
      .emitWithAck("chatroom:getMessages", chatRoom.id)
      .then((messages: Message[]) => {
        setMessages(messages);
      });
  }, [chatRoom]);

  useEvent("chatroom:deleteMessage", (...args: any[]) => {
    const messageId: number = args[0];
    const success: boolean = args[1];
    console.log("chatroom:deleteMessage", messageId, success);
    if (success) {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id != messageId)
      );
    }
  });

  useEvent("chatroom:updateMessage", (...args: any[]) => {
    const messageId = args[0];
    const updatedMessage: Message = args[1];
    console.log("chatroom:updateMessage", messageId, updatedMessage);
    setMessages((prevMessages) => {
      const indx = prevMessages.findIndex(
        (message) => message.id == updatedMessage.id
      );
      if (indx != -1) {
        console.log("message updated");
        const newMessages = [...prevMessages];
        newMessages[indx] = updatedMessage;
        return newMessages;
      } else {
        console.error("updated message of unknown message");
        return prevMessages;
      }
    });
  });

  return (
    <div className="flex h-full w-full flex-col">
      <TopBar>
        {chatRoom && (
          <>
            <Avatar
              status={chatRoom.users[1].status}
              imageSrc={chatRoom.users[1].avatar}
            />
            <h3 className="text-sm font-medium">
              {chatRoom.users[1].displayName}
            </h3>
          </>
        )}
      </TopBar>
      <main
        ref={containerRef}
        className="flex h-full flex-col justify-end overflow-y-hidden bg-gray-600 pb-4"
      >
        <ChatBoxList
          className="block h-full"
          messages={messages}
          chatRoom={chatRoom!}
          onDelete={(messageId) => {
            window.clientSocket.emitWithAck(
              "chatroom:deleteMessage",
              chatRoom?.id,
              messageId
            );
          }}
        />
        <ChatInputField
          placeholder={`Message @${chatRoom?.users[1].displayName}`}
          onMessageSent={onMessageSent}
          containerRef={containerRef}
          enableUploadButton
        />
      </main>
    </div>
  );
}
