"use client";

import { motion, type Variants } from "framer-motion";


import HeroSearch from "./HeroSearch";
import PopularSearches from "./PopularSearches";
import useTypewriter from "./useTypewriter";

const taglines = [
  "Plan with AI.",
  "Plan in seconds.",
  
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroContent = () => {
  const typed = useTypewriter(taglines);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="max-w-2xl space-y-8"
    >
      {/* Badge */}
      

      <div className="space-y-4">
        <motion.h1
          variants={item}
          className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-gray-900 lg:text-7xl"
        >
          Travel smarter.
          <br />
          <span className="inline-flex items-baseline text-indigo-600">
            {typed || "\u00A0"}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[2px] bg-indigo-600 align-middle"
          />
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-lg leading-8 text-gray-600"
        >
          One intelligent assistant for flights, hotels, cabs and
          personalized itineraries.
        </motion.p>
      </div>

      <motion.div variants={item}>
        <HeroSearch />
      </motion.div>

      <motion.div variants={item}>
        <PopularSearches />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;