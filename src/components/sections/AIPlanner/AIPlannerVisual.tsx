import { motion } from "framer-motion";

import PhoneMockup from "./PhoneMockup";

const AIPlannerVisual = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="flex items-center justify-center lg:justify-end"
    >
      <PhoneMockup />
    </motion.div>
  );
};

export default AIPlannerVisual;