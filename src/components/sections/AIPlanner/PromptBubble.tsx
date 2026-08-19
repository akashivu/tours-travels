import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const prompts = [
  "Plan a honeymoon in Bali under ₹80,000",
  "Find a luxury hotel in Dubai",
  "Book a 6-day Japan itinerary",
  "Weekend trip to Goa with friends",
  "Family vacation in Switzerland",
];

const PromptBubble = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">

        <User size={18} />

      </div>

      <div className="min-h-[72px] flex-1 rounded-3xl rounded-tr-lg bg-black px-5 py-4">

        <AnimatePresence mode="wait">

          <motion.p
            key={index}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.35,
            }}
            className="text-sm leading-7 text-white"
          >
            {prompts[index]}
          </motion.p>

        </AnimatePresence>

      </div>

    </div>
  );
};

export default PromptBubble;