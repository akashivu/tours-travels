import { motion } from "framer-motion";

const logos = [
  "Google",
  "Booking.com",
  "Tripadvisor",
  "Airbnb",
  "Skyscanner",
  "MakeMyTrip",
];

const LogoStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-16"
    >
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
        Trusted Technology & Travel Partners
      </p>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <motion.div
            key={logo}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            className="flex h-20 items-center justify-center rounded-2xl border border-gray-200 bg-white text-lg font-semibold text-gray-400 shadow-sm transition-all duration-300 hover:border-gray-300 hover:text-gray-900 hover:shadow-lg"
          >
            {logo}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LogoStrip;