import {
  Plane,
  Hotel,
  Car,
  MapPinned,
} from "lucide-react";

import { motion } from "framer-motion";

const journey = [
  {
    icon: Plane,
    title: "Flight",
    value: "Bengaluru → Tokyo",
  },
  {
    icon: Car,
    title: "Airport Pickup",
    value: "Private Cab",
  },
  {
    icon: Hotel,
    title: "Hotel",
    value: "Shinjuku Grand",
  },
  {
    icon: MapPinned,
    title: "Itinerary",
    value: "6 Days Planned",
  },
];

const JourneyTimeline = () => {
  return (
    <div className="mt-6">

      <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Journey Overview
      </h4>

      <div className="space-y-4">

        {journey.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
              className="flex items-start gap-4"
            >

              <div className="flex flex-col items-center">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">

                  <Icon
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                {index !== journey.length - 1 && (
                  <div className="mt-2 h-8 w-px bg-gray-200" />
                )}

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h5 className="font-semibold text-gray-900">
                  {item.value}
                </h5>

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
};

export default JourneyTimeline;