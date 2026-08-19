import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface JourneyStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
  index: number;
}

const JourneyStep = ({
  icon: Icon,
  title,
  description,
  code,
  index,
}: JourneyStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 6 }}
      className="group relative flex items-start gap-5 rounded-2xl border border-[#16213A]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#16213A]/20 hover:shadow-lg lg:pl-6"
    >
      <span className="absolute left-6 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F7F5EF] bg-[#16213A] lg:block" />

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16213A] text-white transition-colors duration-300 group-hover:bg-[#FF5A36]">
        <Icon size={20} />
      </div>

      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16213A]/40">
          {code}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-[#16213A]">
          {title}
        </h3>
        <p className="mt-1.5 leading-6 text-[#4A5568]">{description}</p>
      </div>
    </motion.div>
  );
};

export default JourneyStep;