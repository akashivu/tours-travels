import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import Container from "../../ui/Container";
import Section from "../../ui/Section";

import FeatureCard from "./FeatureCard";
import { FEATURES } from "./whyChoose.constants";

const WhyChoose = () => {
  return (
    <Section className="relative overflow-hidden bg-[#F7F5EF] py-28">
      {/* Flight path texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 700">
          <path
            d="M-40 120 C 300 300, 500 40, 780 220 S 1200 480, 1480 260"
            fill="none"
            stroke="#16213A"
            strokeWidth="1"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#16213A]/15 bg-white px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16213A]/70 shadow-sm">
            <Sparkles size={14} className="text-[#FF5A36]" />
            Everything You Need
          </div>

          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-[#16213A] lg:text-5xl">
            Why travel with{" "}
            <span className="relative inline-block">
              Elixway
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 50 2, 150 2, 198 9"
                  fill="none"
                  stroke="#FF5A36"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4A5568]">
            Plan, compare and book every part of your journey through one
            intelligent travel platform, no juggling ten different apps.
          </p>

          {/* Passport stamp */}
          <div
            className="absolute -right-4 -top-6 hidden -rotate-12 rounded-full border-2 border-dashed border-[#16213A]/25 px-4 py-3 text-center font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.15em] text-[#16213A]/40 sm:block"
            aria-hidden="true"
          >
            Elixway
            <br />
            Verified
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                code={feature.code}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyChoose;