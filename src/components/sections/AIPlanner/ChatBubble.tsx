import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  type: "user" | "assistant";
  text: string;
}

const ChatBubble = ({
  type,
  text,
}: ChatBubbleProps) => {
  const isUser = type === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] items-start gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-gray-900 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        {/* Message */}

        <div
          className={`rounded-3xl px-5 py-4 shadow-sm ${
            isUser
              ? "rounded-tr-lg bg-gray-900 text-white"
              : "rounded-tl-lg border border-gray-200 bg-gray-50 text-gray-800"
          }`}
        >
          <p className="text-[15px] leading-7">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;