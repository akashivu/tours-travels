import { motion } from "framer-motion";

import FlightCard from "./FlightCard";
import CabCard from "./CabCard";
import { FLIGHTS } from "./flights.constants";

const AIFlightsVisual = () => {
  const featuredFlight = FLIGHTS[0];

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
    >
      <div className="overflow-hidden rounded-[36px] border border-gray-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <p className="text-sm font-medium text-gray-500">
              AI Flight Assistant
            </p>

            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              Complete Journey
            </h3>
          </div>

          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Optimized Route
          </div>

        </div>

        <div className="space-y-6 p-6">

          {/* Featured Flight */}

          <FlightCard
            flight={featuredFlight}
            index={0}
          />

          {/* Airport Transfer */}

          <CabCard />

        </div>
      </div>
    </motion.div>
  );
};

export default AIFlightsVisual;