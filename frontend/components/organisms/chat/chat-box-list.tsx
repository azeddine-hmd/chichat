import Avatar from "@/components/atoms/avatar";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { SingleDm } from "@/types/single-dm";
import { differenceInMinutes, parseISO } from "date-fns";
import ChatBox from "@/components/organisms/chat/chat-box";
import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type ChatBoxListProps = {
  messages: Message[];
  singleDm?: SingleDm;
} & React.ComponentProps<"ul">;

export default function ChatBoxList({
  messages,
  singleDm,
  className,
}: ChatBoxListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { profile } = useUserStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ul className={cn("block overflow-y-scroll p-4 mt-2 mb-2", className)}>
      <div className="block overflow-y-scroll">
        {messages.length <= 50 && (
          <div className="mb-2 flex flex-col gap-y-2">
            {singleDm?.other && (
              <>
                <Avatar
                  resolution={{ height: 96, width: 96 }}
                  displayStatus={false}
                  status={singleDm.other.status}
                  imageSrc={singleDm.other.avatar}
                />
                <h3 className="text-2xl font-bold">
                  {singleDm.other.displayName}
                </h3>
                <h6 className="text-lg font-normal">
                  {singleDm.other.username}
                </h6>
                <p className="mb-4 mt-4 text-sm text-muted">
                  This is the beginning of your direct message history with{" "}
                  <span className="font-bold">
                    {singleDm.other.displayName}
                  </span>
                </p>
              </>
            )}
          </div>
        )}
        {messages.map((message, index) => {
          let messageUser: User | null = null;
          if (singleDm?.other.id == message.byId) messageUser = singleDm.other;
          else if (profile?.id == message.byId) messageUser = profile;
          let shape: "FULL" | "SHORT" = "FULL";
          if (index > 0) {
            if (messages[index - 1].byId != message.byId) {
              shape = "FULL";
            } else {
              const diffMinutes = differenceInMinutes(
                parseISO(message.createdAt),
                parseISO(messages[index - 1].createdAt)
              );
              if (diffMinutes > 10) {
                shape = "FULL";
              } else {
                shape = "SHORT";
              }
            }
          }
          message.createdAt;
          return (
            <li key={message.id} className="list-none">
              <ChatBox
                time={Date.now()}
                content={message.content}
                shape={shape}
                isImage={message.isImage}
                profile={messageUser!}
              />
            </li>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ul>
  );
}
