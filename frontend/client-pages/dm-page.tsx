"use client";

import Avatar from "@/components/atoms/avatar";
import FieldInput from "@/components/atoms/field-input";
import TopBar from "@/components/molecules/topbar";
import { useEvent } from "@/hooks/use-event";
import { SingleDm } from "@/types/single-dm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DmPage({ id }: { id: string }) {
  const [singleDm, setSingleDm] = useState<SingleDm | null>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const sendMessage = () => {
    console.log("sending message:", message);
    window.clientSocket.emit("dm:send:single:message", {
      dmId: singleDm?.id,
      message: message,
    }, ({ status }: { status: string }) => {
      if (status === "success") {
        setMessages((prev) => [...messages, message])
      }
    });
    setMessage("");
  }

  useEffect(() => {
    console.log("emitting to: dm:enter:single:once");
    window.clientSocket.emit("dm:enter:single:once", id);
    // eslint-disable-next-line
  }, []);

  useEvent("dm:enter:single:once", (...args: any[]) => {
    const dm: SingleDm = args[0];
    console.log("socket:dm:enter:single:once:", dm);
    setSingleDm(dm);
  });

  useEvent('error', (...args: any[]) => {
    console.log("socket error:", args);
    if (args[0] === "dm not found") {
      router.push("/channels/me");
    }
  });

  useEffect(() => {
    console.log("useEffect[singleDm]:", singleDm);
  }, [singleDm]);

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
      <main className="flex h-full flex-1 flex-col justify-between bg-gray-600 p-4">
        <div className="h-full bg-gray-600"></div>
        <div className="h-12 rounded-md bg-gray-500 p-2 text-center !border-[12px] !border-black shadow-black">
          {singleDm && (
            <FieldInput
              className="text-md p-2 text-white focus-visible:outline-none cursor-text"
              placeholder={`Message @${singleDm.other.displayName}`}
              onKeyDown={(e) => (e.key === "Enter") && sendMessage()}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          )}
        </div>
      </main>
    </div>
  );
}
