"use client";
// React built in hooks
import { useEffect, useRef, useState } from "react";
// Ant Design components
import { Button, Input } from "antd";
// Icons
import { Loader2, MessageSquare, Send, X } from "lucide-react";
// Redux for state management

// Types
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const ChatAssistant = ({ isOpen, setIsOpen }) => {
  // State to save message of the user
  const [messages, setMessages] = useState<Message[]>([]);
  // State to save the value of the input
  const [input, setInput] = useState("");
  // State to save the status of the loading
  const [loading, setLoading] = useState(false);
  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect for auto-scrolling
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle input submission with enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to post user message to AI assistant
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Get the API key from .env
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-distill-qwen-32b:free",
            messages: [
              {
                role: "system",
                content: "You're use full website support for real state and reserving house and hotels, the website name is pizza help user by his messages:",
              },
              ...messages.map(({ role, content }) => ({ role, content })),
              { role: "user", content: input },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "Error",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Function to format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-fade-in">
          <div className="w-[400px] rounded-2xl shadow-2xl overflow-hidden bg-white  border border-border ">
            {/* Chat Header */}
            <div className="p-4 flex justify-between items-center border-b border-border ">
              <h2 className="text-lg font-bold flex items-center gap-2 text-text ">
                <MessageSquare className="text-[#586CFF]" />
                Chat
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary "
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-[400px] overflow-y-auto space-y-4 bg-white ">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] ${
                      msg.role === "user"
                        ? "bg-[#586CFF] text-white"
                        : "bg-background-secondary dark:bg-surface-secondary-dark text-text  border border-border "
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.timestamp && (
                    <span className="text-xs mt-1 text-text-secondary ">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 flex gap-2 border-t border-border ">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--border)",
                }}
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                type="primary"
                style={{
                  backgroundColor: "#586CFF",
                  opacity: loading || !input.trim() ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.25s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export { ChatAssistant };
export default ChatAssistant;
