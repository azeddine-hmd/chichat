import Avatar from "@/components/atoms/avatar";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { useUserStore } from "@/stores/user-store";
import { SingleDm } from "@/types/single-dm";
import { differenceInMinutes, format, parseISO } from "date-fns";
import ChatBox from "@/components/organisms/chat/chat-box";
import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type ChatBoxListProps = {
  messages: Message[];
  singleDm?: SingleDm;
  onDelete?: (messageId: number) => void;
} & React.ComponentProps<"ul">;

export default function ChatBoxList({
  messages,
  singleDm,
  onDelete,
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

  const createMessageChatBox = (
    message: Message,
    index: number
  ): JSX.Element => {
    let messageUser: User | null = null;
    let haveDateSeparator = false;
    let shape: "FULL" | "SHORT" = "FULL";

    if (singleDm?.other.id == message.byId) {
      messageUser = singleDm.other;
    } else if (profile?.id == message.byId) {
      messageUser = profile;
    }

    if (index > 0) {
      // shape
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
      // date separator
      const day1 = format(parseISO(message.createdAt), "yyyy-MM-dd");
      const day2 = format(
        parseISO(messages[index - 1].createdAt),
        "yyyy-MM-dd"
      );
      if (day1 !== day2) {
        haveDateSeparator = true;
      }
    }

    if (index == 0) {
      haveDateSeparator = true;
    }

    return (
      <ChatBox
        key={message.id}
        messageId={message.id}
        time={message.createdAt}
        content={message.content}
        shape={shape}
        isImage={message.isImage}
        profile={messageUser!}
        haveDateSeparator={haveDateSeparator}
        onDelete={onDelete}
        onEditComplete={(newContent) => {
          window.clientSocket.emit("dm:single:updateMessage", singleDm?.id, message.id, newContent);
        }}
      />
    );
  };

  return (
    <ul className={cn("block pb-4", className)}>
      <div className="h-full overflow-x-hidden overflow-y-scroll">
        {messages.length <= 50 && (
          <div className="pl-4 mb-2 mt-2 flex flex-col gap-y-2">
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
        {messages.map((message, index) => createMessageChatBox(message, index))}
        <div ref={messagesEndRef} />
      </div>
    </ul>
  );
}
