"use client";
// React
import { useEffect, useRef, useState } from "react";

// Third party components
import { Button } from "@/components/ui/button";

// Dependencies
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

// Server actions
import {
  createConversation,
  getUserConversations,
} from "@/lib/actions/conversation";
import { sendMessage } from "@/lib/actions/messages";

// Icons
import Message from "@/types/messages";
import { Loader2 } from "lucide-react";
import LoginModal from "../login";

export default function Chat({
  userId,
  isOpen,
  onOpenChange,
}: {
  userId: string | boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Hooks
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load conversation logic
  // If the conversation for this user exist, load it.
  // If does'nt exist, create new one.
  const loadConversation = async () => {
    try {
      const conversations = await getUserConversations(userId);

      let conversation = conversations[0];

      if (!conversation) {
        try {
          conversation = await createConversation(userId);
        } catch (error) {
          console.error("Failed to create conversation:", error);
          return;
        }
      }

      setConversationId(conversation.id);
      setMessages(conversation.messages);
    } catch (error) {
      toast.error("Please sign in first!", error);
    }
  };

  // UseEffects
  useEffect(() => {
    if (isOpen) {
      loadConversation();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send the message then load conversation and get messages
  const handleSend = async () => {
    if (!input.trim() || isSending || !conversationId) return;
    setIsSending(true);
    try {
      await sendMessage(input, userId, conversationId);
      setInput("");
      await loadConversation();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // If the enter key pressed, send the message
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return userId ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg flex flex-col h-[70vh] max-h-[600px] p-0 bg-background">
        <DialogHeader className="sticky top-0 z-10 bg-background px-6 pt-6 pb-2 border-b">
          <DialogTitle className="text-lg font-semibold">
            Chat with Admin
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-muted/40">
          {messages.length === 0 && !isSending && (
            <p className="text-center text-sm text-muted-foreground mt-10">
              No messages yet. Start the conversation!
            </p>
          )}
          <div className="flex flex-col gap-3">
            {messages
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender.isAdmin ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm
                      ${
                        msg.sender.isAdmin
                          ? "bg-primary/90 text-white rounded-bl-none"
                          : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-br-none"
                      }`}
                  >
                    <div className="text-xs font-medium mb-1 opacity-70">
                      {msg.sender.isAdmin ? "Admin" : msg.sender.name || "You"}
                    </div>
                    <div className="whitespace-pre-line break-words">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t bg-background px-4 py-3">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isSending || !conversationId}
              autoFocus
            />
            <Button
              type="submit"
              onClick={handleSend}
              disabled={!input.trim() || isSending || !conversationId}
              className="transition-colors"
            >
              {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSending ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <LoginModal />
  );
}
