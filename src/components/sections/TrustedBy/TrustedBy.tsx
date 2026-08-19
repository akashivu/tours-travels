import { motion } from "framer-motion";
import { Star } from "lucide-react";

import Container from "../../ui/Container";
import Section from "../../ui/Section";

import StatsCard from "./StatsCard";
import LogoStrip from "./LogoStrip";
import { STATS } from "./trusted.constants";

const TrustedBy = () => {
  return (
    <Section className="relative overflow-hidden py-28">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-100 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-100 blur-[160px]" />

      </div>

      <Container>

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Trusted by travelers
            <br />
            across India.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thousands of travelers rely on Elixway to discover
            destinations, compare prices, and plan unforgettable
            journeys with AI.
          </p>

          {/* Rating */}

          <div className="mt-8 flex items-center justify-center gap-2">

            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={20}
                fill="#FACC15"
                color="#FACC15"
              />
            ))}

            <span className="ml-3 text-lg font-semibold text-gray-800">
              4.9 Average Rating
            </span>

          </div>

        </motion.div>

        {/* Stats */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {STATS.map((stat) => (
            <StatsCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}

        </div>

        {/* Logo Strip */}

        <LogoStrip />

      </Container>

    </Section>
  );
};

export default TrustedBy;