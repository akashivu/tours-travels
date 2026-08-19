import {
  CarTaxiFront,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { motion } from "framer-motion";

const CabCard = () => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Airport Transfer
          </p>

          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            Private Airport Pickup
          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-50 p-3">

          <CarTaxiFront
            size={22}
            className="text-emerald-600"
          />

        </div>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-gray-50 p-4">

          <Clock3
            size={18}
            className="mb-2 text-gray-600"
          />

          <p className="text-xs text-gray-500">
            Pickup
          </p>

          <h4 className="mt-1 font-semibold">
            06:30 PM
          </h4>

        </div>

        <div className="rounded-2xl bg-gray-50 p-4">

          <ShieldCheck
            size={18}
            className="mb-2 text-gray-600"
          />

          <p className="text-xs text-gray-500">
            Status
          </p>

          <h4 className="mt-1 font-semibold text-emerald-600">
            Confirmed
          </h4>

        </div>

      </div>

      <div className="mt-5 rounded-2xl bg-sky-50 p-4">

        <p className="text-sm font-semibold text-sky-700">
          Why AI selected this transfer
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          The pickup is synchronized with your flight arrival,
          includes free waiting time, and offers the fastest route
          to your hotel.
        </p>

      </div>

    </motion.div>
  );
};

export default CabCard;