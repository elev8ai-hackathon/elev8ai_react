import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const RightSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        content: "I understand your message. How can I help you further?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };
  return (
    <div className="grid grid-rows-[auto_1fr_auto] row-span-2 col-span-5 h-full relative p-0">
      <h3 className="text-purple-800 font-bold text-xl mb-2">
        Performance Metrics
      </h3>
      <Card className=" fancy-scrollbar overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2.5 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user" ? "bg-indigo-100" : "bg-white"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-5 h-5 text-indigo-600" />
                ) : (
                  <Bot className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div
                className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
                  message.sender === "user"
                    ? "bg-indigo-600 text-white rounded-s-xl rounded-ee-xl"
                    : "bg-white text-gray-900 rounded-e-xl rounded-es-xl"
                }`}
              >
                <p className="text-sm font-normal">{message.content}</p>
                <span
                  className={`text-xs ${
                    message.sender === "user"
                      ? "text-indigo-200"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="pt-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
