import { Plane, Hotel, Car, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Plane,
    title: "Best Flight",
    subtitle: "Bengaluru → Tokyo",
    value: "₹54,800",
  },
  {
    icon: Hotel,
    title: "Recommended Hotel",
    subtitle: "Shinjuku Grand Hotel",
    value: "★★★★★",
  },
  {
    icon: Car,
    title: "Airport Transfer",
    subtitle: "Private Cab",
    value: "Included",
  },
  {
    icon: CalendarDays,
    title: "Itinerary",
    subtitle: "6 Days • 18 Places",
    value: "Ready",
  },
];

const TripSummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-6 space-y-3"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Icon
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h4 className="font-semibold text-gray-900">
                  {card.subtitle}
                </h4>

              </div>

            </div>

            <span className="font-semibold text-gray-900">
              {card.value}
            </span>

          </div>
        );
      })}
    </motion.div>
  );
};

export default TripSummary;