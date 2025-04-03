import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="row-span-full col-span-5 h-full relative p-0 order-last">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 fancy-scrollbar overflow-auto grow">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2.5 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user" ? "bg-indigo-100" : "bg-gray-200"
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
                    ? "bg-indigo-500 text-white rounded-s-xl rounded-ee-xl"
                    : "bg-gray-100 text-gray-900 rounded-e-xl rounded-es-xl"
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
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex gap-4 w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
