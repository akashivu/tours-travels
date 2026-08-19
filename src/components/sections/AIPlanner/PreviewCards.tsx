import { Plane, Hotel, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: Plane,
    title: "Flight Selected",
    subtitle: "Bengaluru → Tokyo",
    tag: "₹54,800",
  },
  {
    icon: Hotel,
    title: "Luxury Hotel",
    subtitle: "Shinjuku Grand Hotel",
    tag: "★★★★★",
  },
  {
    icon: CalendarDays,
    title: "6-Day Itinerary",
    subtitle: "18 experiences planned",
    tag: "Ready",
  },
];

const PreviewCards = () => {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Icon
                size={20}
                className="text-blue-600"
              />
            </div>

            <h4 className="mt-5 font-semibold text-gray-900">
              {card.title}
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              {card.subtitle}
            </p>

            <span className="mt-5 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {card.tag}
            </span>
          </motion.div>
        );
      })}

    </div>
  );
};

export default PreviewCards;