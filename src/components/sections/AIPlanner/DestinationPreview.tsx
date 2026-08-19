import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

import japan from "../../../assets/images/destinations/japan.jpg";

const DestinationPreview = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: 0.5,
      }}
      className="mt-8 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-lg"
    >
      <img
        src={japan}
        alt="Japan"
        className="h-52 w-full object-cover"
      />

      <div className="space-y-5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-semibold text-gray-900">
              Tokyo, Japan
            </h3>

            <div className="mt-2 flex items-center gap-2 text-gray-500">

              <MapPin size={16} />

              <span className="text-sm">
                Personalized AI Journey
              </span>

            </div>

          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1">

            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-semibold">
              4.9
            </span>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-2xl bg-gray-50 p-4 text-center">

            <p className="text-xs text-gray-500">
              Duration
            </p>

            <h4 className="mt-2 font-semibold">
              6 Days
            </h4>

          </div>

          <div className="rounded-2xl bg-gray-50 p-4 text-center">

            <p className="text-xs text-gray-500">
              Places
            </p>

            <h4 className="mt-2 font-semibold">
              18
            </h4>

          </div>

          <div className="rounded-2xl bg-gray-50 p-4 text-center">

            <p className="text-xs text-gray-500">
              Budget
            </p>

            <h4 className="mt-2 font-semibold">
              ₹1.5L
            </h4>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default DestinationPreview;