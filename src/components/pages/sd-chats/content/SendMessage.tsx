"use client";
import sendMessage from "@/utils/service/chats/post";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import SendIcon from "@/assets/icons/send.png";
import Image from "next/image";

const SendMessage = ({ roomId, getterId }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: sendRealtimeMessage, isPending } = useMutation({
    mutationKey: ["SEND_MESSAGE"],
    mutationFn: () =>
      sendMessage({ getterId, message: message.trim(), room: roomId }),
    onSuccess: () => {
      setMessage("");
      router.refresh();
    },
  });

  // Auto-focus input when room changes
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [roomId]);

  // Send message on Enter key (but allow Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isPending && message.trim()) {
      e.preventDefault();
      sendRealtimeMessage();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2">
        {/* Message Input */}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="پیام خود را بنویسید..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
        />

        {/* Send Button (or Microphone for Voice) */}
        {message.trim() && (
          <button
            disabled={isPending}
            onClick={() => sendRealtimeMessage()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <ClipLoader color="white" />
            ) : (
              <Image src={SendIcon} alt="Send" width={16} height={16} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SendMessage;
