import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const results = [
  "Best flights found",
  "Hotel matched to your preferences",
  "Personalized itinerary created",
];

const ResultChecklist = () => {
  return (
    <div className="space-y-2">

      {results.map((item, index) => (

        <motion.div
          key={item}
          initial={{
            opacity: 0,
            x: -12,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.8 + index * 0.25,
            duration: 0.35,
          }}
          className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2"
        >

          <CheckCircle2
            size={16}
            className="shrink-0 text-emerald-600"
          />

          <span className="text-xs font-medium leading-5 text-gray-700">
            {item}
          </span>

        </motion.div>

      ))}

      <motion.button
        initial={{
          opacity: 0,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 1.8,
        }}
        className="mt-3 w-full rounded-xl bg-black py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800"
      >
        View Trip →
      </motion.button>

    </div>
  );
};

export default ResultChecklist;