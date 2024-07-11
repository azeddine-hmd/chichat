import FieldInputArea from "@/components/atoms/field-input-area";
import Popover from "@/components/molecules/popover";
import PopoverButton from "@/components/molecules/popover-button";
import MenuPopoverContainer from "@/components/molecules/popover-content/menu-popover-container";
import { BsPlusCircleFill, BsUpload } from "react-icons/bs";
import React, { useState, useLayoutEffect, useRef, RefObject, useEffect } from "react";
import useResizeObserver from "use-resize-observer";
import { cn } from "@/lib/cn";

type ChatInputFieldProps = {
  placeholder: string;
  onMessageSent: (message: string) => void;
  containerRef?: RefObject<HTMLElement | undefined>;
} & React.ComponentProps<"div">;

export default function ChatInputField({
  placeholder,
  onMessageSent,
  containerRef,
  className,
  ...restProps
}: ChatInputFieldProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref, height } = useResizeObserver<HTMLElement>();
  const lastHeightRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!containerRef?.current) return;
    ref(containerRef.current);
    console.log("ref observer have been set!", containerRef);
  }, [containerRef, ref]);

  useEffect(() => {
    if (!textareaRef.current || !containerRef?.current || !height) return;
    // console.log("container height changed to:", height);


    const textarea = textareaRef.current;
    const textareaHeight = parseInt(textarea.style.height);
    const lastHeight = lastHeightRef.current;

    if (height != 0 && textareaHeight > height / 2) {
      console.log("textarea height above half of container height");
      // if (lastHeightRef)
      lastHeightRef.current = textareaHeight;
      // textarea.style.height = textarea.scrollHeight + "px";
      const rows = (height / 2) / 36;
      console.log("rows to have is:", rows);
      textarea.style.height = rows * 36 + "px";
    } else {
      textarea.style.height = "auto";
    }

    // eslint-disable-next-line
  }, [height]);

  useLayoutEffect(() => {
    if (!textareaRef.current || !containerRef?.current) return;
    const textarea = textareaRef.current;
    if (
      containerRef.current &&
      textarea.scrollHeight < containerRef.current.scrollHeight / 2
    ) {
      textarea.style.height = "0";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    // console.log("input height:", textareaRef.current.style.height);
    // console.log("main height:", containerRef.current?.scrollHeight);
    // eslint-disable-next-line
  }, [message]);



  return (
    <div className={cn("gap-2 rounded-md border border-black border-opacity-10 bg-gray-500 p-2 mr-4 text-center", className)} {...restProps}>
      <div className="flex">
        <Popover>
          <Popover.Trigger asChild>
            <div className="group mx-2 mt-[0.4rem]">
              <BsPlusCircleFill className="h-6 w-6 cursor-pointer text-gray-400 group-hover:text-white" />
            </div>
          </Popover.Trigger>
          <Popover.Content
            side="top"
            sideOffset={16}
            align="start"
            alignOffset={-8}
          >
            <MenuPopoverContainer className="shadow-blackd shadow-md">
              <PopoverButton className="flex items-center justify-start gap-4 py-4 font-normal text-muted">
                <BsUpload className="h-4 w-4" />
                Upload a file
              </PopoverButton>
            </MenuPopoverContainer>
          </Popover.Content>
        </Popover>
        <FieldInputArea
          className="h-[36px] cursor-text flex-wrap p-2 text-sm text-white placeholder-gray-400/60 focus-visible:outline-none"
          placeholder={placeholder}
          style={{ resize: "none", scrollbarWidth: "none" }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && !e.shiftKey) {
              e.preventDefault();
            }
            const msg = message.trim();
            if (e.key === "Enter" && !e.shiftKey && msg.trim().length !== 0) {
              onMessageSent(msg);
              setMessage("");
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          innerRef={textareaRef}
          maxLength={5000}
        />
      </div>
    </div>
  );
}
