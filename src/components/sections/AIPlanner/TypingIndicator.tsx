import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const dotVariants = {
  animate: {
    y: [0, -4, 0],
  },
};

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
        <Bot size={18} />
      </div>

      {/* Bubble */}

      <div className="rounded-3xl rounded-tl-lg border border-gray-200 bg-gray-50 px-5 py-4">

        <p className="mb-3 text-sm font-medium text-gray-500">
          Elixway AI is planning...
        </p>

        <div className="flex gap-2">

          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              variants={dotVariants}
              animate="animate"
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="h-2.5 w-2.5 rounded-full bg-blue-500"
            />
          ))}

        </div>

      </div>

    </motion.div>
  );
};

export default TypingIndicator;