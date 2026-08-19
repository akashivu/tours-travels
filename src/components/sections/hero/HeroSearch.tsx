"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const examples = [
  "Plan a honeymoon in Bali under ₹80,000...",
  "5-day family trip to Japan in cherry blossom season...",
  "Weekend getaway to Dubai for two...",
  "Adventure trip to Switzerland with hiking...",
];

const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query || isFocused) return;

    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prev) => (prev + 1) % examples.length
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [query, isFocused]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      /*
       * Send the user's trip request to the AI page.
       *
       * Example:
       * /ai?prompt=Plan%20a%20honeymoon%20in%20Bali
       */

      navigate(
        `/ai?prompt=${encodeURIComponent(query.trim())}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={() => inputRef.current?.focus()}
      className={`
        flex
        h-auto
        min-h-[74px]
        cursor-text
        flex-col
        items-stretch
        gap-2
        rounded-[28px]
        border
        bg-white
        p-2
        transition-all
        duration-300

        sm:h-[74px]
        sm:flex-row
        sm:items-center
        sm:gap-0
        sm:rounded-full
        sm:px-4

        ${
          isFocused
            ? "border-indigo-300 shadow-[0_0_0_4px_rgba(79,70,229,0.12)]"
            : "border-gray-200 hover:shadow-md"
        }
      `}
    >
      {/* Search Icon */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
        <Search size={20} />
      </div>

      {/* Input */}
      <div className="relative min-w-0 flex-1 px-2 sm:px-5">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Describe the trip you want to plan"
          className="
            w-full
            bg-transparent
            py-3
            text-base
            text-gray-900
            outline-none

            sm:py-0
            sm:text-lg
          "
        />

        {/* Animated Placeholder */}
        {!query && (
          <AnimatePresence mode="wait">
            <motion.span
              key={placeholderIndex}
              initial={{
                opacity: 0,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -4,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-2
                flex
                items-center
                truncate
                text-base
                text-gray-400

                sm:left-5
                sm:text-lg
              "
            >
              {examples[placeholderIndex]}
            </motion.span>
          </AnimatePresence>
        )}
      </div>

      {/* Plan with AI */}
      <motion.button
        type="submit"
        disabled={isSubmitting || !query.trim()}
        whileHover={{
          scale: query.trim() ? 1.03 : 1,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="
          flex
          w-full
          flex-shrink-0
          items-center
          justify-center
          gap-2
          rounded-full
          bg-black
          px-7
          py-3.5
          text-white
          transition

          disabled:cursor-not-allowed
          disabled:opacity-70

          sm:w-auto
          sm:py-4
        "
      >
        {isSubmitting ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <Sparkles size={18} />
        )}

        {isSubmitting
          ? "Planning..."
          : "Plan with AI"}
      </motion.button>
    </form>
  );
};

export default HeroSearch;