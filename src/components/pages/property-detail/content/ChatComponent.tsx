"use client";

import Modal from "@/components/common/modal/modal";
import formatToPersianDate from "@/utils/helper/format-date";
import { getChatHistory, getRoomsUsers } from "@/utils/service/chats/get";
import sendMessage from "@/utils/service/chats/post";
import { getClientCookie } from "@/utils/service/storage/client-cookie";
import { getUserInfo } from "@/utils/service/user/get";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { MessageCircleMoreIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ChatComponent = ({
  sellerId,
  houseId,
}: {
  sellerId: string;
  houseId: string;
}) => {
  const [message, setMessage] = useState("");
  const token = getClientCookie("clientAccessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  const userId = decoded.id;
  const roomId = houseId + sellerId + userId;
  const getterId = sellerId;

  const { data: messages, refetch } = useQuery({
    queryKey: ["GET_MESSAGES"],
    queryFn: () => getChatHistory(`${roomId}`),
  });
  const { mutate: sendMessageAction, isPending } = useMutation({
    mutationKey: ["SEND_MESSAGE"],
    mutationFn: () =>
      sendMessage({
        getterId: getterId,
        message: message.trim(),
        room: roomId,
      }),
    onSuccess: () => refetch(),
  });
  const { data: seller } = useQuery({
    queryKey: ["FETCH_USER"],
    queryFn: () => getUserInfo(sellerId),
  });
  return (
    <Modal
      headerClassName="hidden"
      trigger={
        <span className="border-primary w-12 aspect-square border rounded-full h-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-300 active:scale-95">
          <MessageCircleMoreIcon className="text-primary" />
        </span>
      }
      className="h-[80vh] !p-0"
    >
      <div className="h-full w-full flex flex-col justify-start">
        <header className="h-[15%] bg-primary w-full gap-2 p-2 flex items-center">
          <Image
            src={seller?.user.profilePicture}
            alt="user image"
            width={64}
            height={64}
            className="w-[64px] h-[64px] rounded-full"
          />
          <div className="flex flex-col text-surface">
            <p>{seller?.user.fullName}</p>
            <p>{seller?.user.email}</p>
          </div>
        </header>
        <div className="flex-1 border p-2">
          {messages?.length > 0 ? (
            <div className="space-y-3">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col ${
                    userId === item.sender.id ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] lg:max-w-[70%] p-3 rounded-2xl ${
                      userId === item.sender.id
                        ? "bg-primary text-surface rounded-tr-none"
                        : "bg-border rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {item.sender.fullName}
                    </p>
                    <p className="text-base">{item.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatToPersianDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>پیامی وجود ندارد</p>
          )}
        </div>
        <footer className="w-full flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="flex-grow rounded-full border h-[35px]"
          />
          <button onClick={sendMessageAction}>
            {isPending ? "..." : "فرستادن"}
          </button>
        </footer>
      </div>
    </Modal>
  );
};
export default ChatComponent;
