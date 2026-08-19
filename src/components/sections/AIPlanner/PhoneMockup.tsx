import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  Bot,
} from "lucide-react";

import PromptBubble from "./PromptBubble";
import ResultChecklist from "./ResultChecklist";
import TypingIndicator from "./TypingIndicator";

const PhoneMockup = () => {
  return (
    <div className="relative flex justify-center">

      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        animate={{
          y: [0, -8, 0],
          rotate: [-1.5, 0, -1.5],
        }}
        className="w-[275px] lg:w-[290px]"
      >
        <div className="relative overflow-hidden rounded-[48px] border-[7px] border-[#1C1C1E] bg-white shadow-[0_35px_90px_rgba(0,0,0,0.18)]">

          {/* Screen Reflection */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />

          {/* Status Bar */}

          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-gray-900">

            <span>9:41</span>

            <div className="flex items-center gap-2">

              <span>5G</span>

              <span>100%</span>

            </div>

          </div>

          {/* Dynamic Island */}

          <div className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

          {/* Header */}

          <div className="mt-5 flex items-center justify-between px-5">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">

                <Sparkles size={16} />

              </div>

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Elixway AI
                </h3>

                <p className="text-[11px] text-gray-500">
                  Planning your trip...
                </p>

              </div>

            </div>

            <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
              Online
            </span>

          </div>

          {/* Chat */}

          <div className="space-y-3 px-5 py-5">

            <PromptBubble />

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">

                <Bot
                  size={15}
                  className="text-blue-600"
                />

              </div>

              <TypingIndicator />

            </div>

            <ResultChecklist />

          </div>

          {/* Bottom */}

          <div className="border-t border-gray-100 p-3">

            <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2">

              <input
                readOnly
                value="Ask Elixway..."
                className="flex-1 bg-transparent text-xs text-gray-500 outline-none"
              />

              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition hover:scale-105">

                <Send size={14} />

              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default PhoneMockup;