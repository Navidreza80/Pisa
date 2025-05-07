"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { getConversations } from "@/lib/actions/conversation";
import { sendMessage } from "@/lib/actions/messages";

interface Message {
  id: string;
  content: string;
  sender: { id: string; name: string | null; isAdmin: boolean };
  createdAt: Date;
}

interface Conversation {
  id: string;
  participants: { id: string; name: string; email: string }[];
  messages: Message[];
}

export default function AdminChatInterface({
  initialConversations,
}: {
  initialConversations: Conversation[];
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversationId) return;
    
    setIsSending(true);
    try {
      const adminId = "4";
      
      await sendMessage(message, adminId, activeConversationId);
      
      const updatedConversations = await getConversations();
      setConversations(updatedConversations);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-180px)] border rounded-lg overflow-hidden">
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold">All Conversations</h2>
        </div>
        <div className="divide-y">
          {conversations.map((conversation) => {
            const user = conversation.participants.find((p) => !p.isAdmin);
            return (
              <button
                key={conversation.id}
                className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                  activeConversationId === conversation.id ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <div className="font-medium">
                  {user?.name || user?.email || "Unknown User"}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {conversation.messages[0]?.content || "No messages yet"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b">
              <h2 className="font-semibold">
                Chat with{" "}
                {activeConversation.participants
                  .filter((p) => !p.isAdmin)
                  .map((p) => p.name || p.email)
                  .join(", ")}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender.isAdmin ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      msg.sender.isAdmin
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <div className="font-medium">
                      {msg.sender.isAdmin ? "You" : msg.sender.name || "User"}
                    </div>
                    <p>{msg.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSending}
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">
              Select a conversation from the sidebar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}