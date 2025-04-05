/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePostChatQuery } from "@/services";
import { useSearch } from "@tanstack/react-router";

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
      timestamp: new Date(new Date().getTime() - 15 * 60 * 1000),
    },
    // {
    //   content: "What are the weakness the candidate?",
    //   sender: "user",
    //   timestamp: new Date(new Date().getTime() - 12 * 60 * 1000),
    // },
    // {
    //   content:
    //     "While specific weaknesses aren't explicitly stated in performance data, competency matrix analysis suggests potential growth areas in Economic Thinking (weighing cost/value tradeoffs) and Handling Disagreement (fostering constructive conflict resolution).",
    //   sender: "ai",
    //   timestamp: new Date(new Date().getTime() - 11 * 60 * 1000),
    // },
    // {
    //   content: "What are the strength the candidate?",
    //   sender: "user",
    //   timestamp: new Date(new Date().getTime() - 9 * 60 * 1000),
    // },
    // {
    //   content:
    //     "Key strengths include Driving Alignment (effectively coordinating team responsibilities and maintaining clear communication for shared objectives) and Process Thinking (optimizing workflows through practices like PR review channels and coding standards documentation).",
    //   sender: "ai",
    //   timestamp: new Date(new Date().getTime() - 5 * 60 * 1000),
    // },
  ]);
  const [input, setInput] = useState("");
  const search = useSearch({ strict: false });

  const { mutateAsync, isPending } = usePostChatQuery();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    const res = await mutateAsync({
      email: (search as any).email,
      input: input,
    });
    // Simulate AI response
    console.log("🚀 ~ handleSubmit ~ res:", res);

    const aiResponse: Message = {
      content:
        res.response.answer ||
        "Im not sure about that information. I did not find any reference in the knowledge base?",
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    // setTimeout(() => {
    //   const aiResponse: Message = {
    //     content:
    //       "Im not sure about that information. I did not find any reference in the knowledge base?",
    //     sender: "ai",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, aiResponse]);
    // }, 1000);
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
              disabled={!!isPending}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              disabled={!!isPending}
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
