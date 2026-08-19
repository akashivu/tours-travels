import { motion } from "framer-motion";

import type { DestinationCardProps } from "./hero.types";

const heights = {
  small: "h-[180px]",
  medium: "h-[260px]",
  large: "h-[340px]",
};

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.35 }}
      className={`group relative overflow-hidden rounded-[32px] bg-white ${
        heights[destination.size]
      }`}
    >
      <img
        src={destination.image}
        alt={destination.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

    
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-4 left-4 translate-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {destination.title}
      </span>
    </motion.div>
  );
};

export default DestinationCard;