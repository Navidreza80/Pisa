"use client";

import Modal from "@/components/common/modal/modal";
import formatToPersianDate from "@/utils/helper/format-date";
import { getChatHistory } from "@/utils/service/chats/get";
import sendMessage from "@/utils/service/chats/post";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { getUserInfo } from "@/utils/service/user/get";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { MessageCircleMoreIcon, SendHorizonalIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const ChatComponent = ({
  sellerId,
  houseId,
}: {
  sellerId: string;
  houseId: string;
}) => {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const token = getClientCookie("clientAccessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  const userId = decoded.id;
  const roomId = houseId + sellerId + userId;
  const getterId = sellerId;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data: messages, refetch } = useQuery({
    queryKey: ["GET_MESSAGES", roomId],
    queryFn: () => getChatHistory(`${roomId}`),
    refetchInterval: 5000,
    enabled: isModalOpen, // Only fetch when modal is open
  });

  const { mutate: sendMessageAction, isPending } = useMutation({
    mutationKey: ["SEND_MESSAGE"],
    mutationFn: () =>
      sendMessage({
        getterId: getterId,
        message: message.trim(),
        room: roomId,
      }),
    onSuccess: () => {
      refetch();
      setMessage("");
    },
  });

  const { data: seller } = useQuery({
    queryKey: ["FETCH_USER", sellerId],
    queryFn: () => getUserInfo(sellerId),
  });

  // Scroll to bottom when messages change or modal opens
  useEffect(() => {
    if (isModalOpen) {
      // Small timeout to ensure DOM is updated
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    return () => {
      setIsModalOpen(false);
    };
  }, [messages, isModalOpen]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && message.trim() && !isPending) {
      sendMessageAction();
    }
  };

  return (
    <Modal
      headerClassName="hidden"
      trigger={
        <span
          className="border-primary w-12 aspect-square border rounded-full h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          <MessageCircleMoreIcon className="text-primary" />
        </span>
      }
      className="h-[500px] !p-0 max-w-2xl w-full"
    >
      <div className="h-full w-full flex flex-col">
        {/* Header - fixed height */}
        <header className="h-16 bg-primary w-full gap-3 p-3 flex items-center shrink-0">
          <div className="relative w-10 h-10">
            <Image
              src={seller?.user.profilePicture || "/default-avatar.png"}
              alt="user image"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col text-surface">
            <p className="font-medium">{seller?.user.fullName}</p>
            <p className="text-xs opacity-80">{seller?.user.email}</p>
          </div>
        </header>

        {/* Chat Container - fixed height with scroll */}
        <div
          ref={messagesContainerRef}
          className="h-[400px] overflow-y-auto p-4 space-y-3 bg-gray-50"
        >
          {messages?.length > 0 ? (
            messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  userId === item.sender.id ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] lg:max-w-[70%] p-3 rounded-2xl ${
                    userId === item.sender.id
                      ? "bg-primary text-surface rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm font-medium">{item.sender.fullName}</p>
                  <p className="text-base">{item.message}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {formatToPersianDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">هیچ پیامی وجود ندارد</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer - fixed height */}
        <footer className="h-16 p-3 border-t bg-white shrink-0">
          <div className="flex gap-2 items-center h-full">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="پیام خود را بنویسید..."
              className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isPending}
            />
            <button
              onClick={() => message.trim() && sendMessageAction()}
              disabled={!message.trim() || isPending}
              className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? (
                <span className="animate-pulse">...</span>
              ) : (
                <SendHorizonalIcon size={20} />
              )}
            </button>
          </div>
        </footer>
      </div>
    </Modal>
  );
};

export default ChatComponent;
