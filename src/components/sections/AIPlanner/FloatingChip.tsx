import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingChipProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

const FloatingChip = ({
  icon,
  label,
  className = "",
}: FloatingChipProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl ${className}`}
    >
      {icon}

      <span className="text-sm font-semibold text-gray-800">
        {label}
      </span>
    </motion.div>
  );
};

export default FloatingChip;