import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
}

const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-2xl"
    >
      <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">
        {value}
      </h3>

      <p className="mt-3 text-base leading-7 text-gray-500">
        {label}
      </p>
    </motion.div>
  );
};

export default StatsCard;