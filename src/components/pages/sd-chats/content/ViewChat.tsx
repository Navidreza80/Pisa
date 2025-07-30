"use client";

import formatToPersianDate from "@/utils/helper/format-date";
import { useRouter, useSearchParams } from "next/navigation";

const ViewChat = ({ chat }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRoom = searchParams.get("room");

  const isActive = currentRoom === chat.room;

  return (
    <div
      key={chat.id}
      onClick={() => router.push(`?room=${chat.room}`)}
      className={`cursor-pointer px-4 py-3 border-b transition-all duration-200 ${
        isActive
          ? "bg-blue-50 border-blue-100"
          : "border-gray-100 hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          {/* Sender Name (if available) */}
          {chat.sender?.fullName && (
            <p
              className={`truncate text-sm font-medium ${
                isActive ? "text-primary" : "text-text-secondary"
              }`}
            >
              {chat.sender.fullName}
            </p>
          )}

          {/* Message Preview */}
          <p
            className={`truncate text-sm ${
              isActive ? "text-primary" : "text-text-secondary"
            }`}
          >
            {chat.message}
          </p>
        </div>

        {/* Timestamp & Status Indicator */}
        <div className="flex flex-col items-end ml-2">
          <span
            className={`text-xs ${
              isActive ? "text-primary" : "text-text-secondary"
            }`}
          >
            {formatToPersianDate(chat.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewChat;
