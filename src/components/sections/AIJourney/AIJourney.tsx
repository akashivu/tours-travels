import { motion } from "framer-motion";
import { Plane, Sparkles } from "lucide-react";

import Container from "../../ui/Container";
import Section from "../../ui/Section";

import JourneyStep from "./JourneyStep";
import { JOURNEY_STEPS } from "./journey.constants";

const AIJourney = () => {
  return (
    <Section className="relative overflow-hidden bg-[#F7F5EF] py-32">
      {/* Flight path texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <path
            d="M-50 780 C 260 620, 420 900, 720 640 S 1180 220, 1490 320"
            fill="none"
            stroke="#16213A"
            strokeWidth="1"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#16213A]/15 bg-white px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16213A]/70 shadow-sm">
            <Sparkles size={14} className="text-[#FF5A36]" />
            AI Itinerary Engine
          </div>

          <h2 className="mt-8 font-display text-4xl font-bold tracking-tight text-[#16213A] lg:text-6xl">
            Plan your entire journey
            <br />
            <span className="relative inline-block">
              with one conversation
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 80 2, 220 2, 298 9"
                  fill="none"
                  stroke="#FF5A36"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4A5568]">
            Tell Elixway where you want to go. The AI drafts flights, stays,
            transport and a day-by-day plan, all cleared for booking.
          </p>
        </motion.div>

        {/* Boarding Pass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-16 flex max-w-4xl overflow-hidden rounded-[28px] border border-[#16213A]/10 bg-white shadow-xl"
        >
          {/* Perforated stub */}
          <div className="relative hidden w-20 shrink-0 flex-col items-center justify-center border-r border-dashed border-[#16213A]/20 bg-[#16213A] sm:flex">
            <span className="rotate-180 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 [writing-mode:vertical-rl]">
              Boarding Pass
            </span>
            <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F7F5EF]" />
          </div>

          <div className="flex-1 p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-dashed border-[#16213A]/15 pb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#4A5568]">
              <div>
                <p className="text-[#16213A]/50">Passenger</p>
                <p className="mt-1 text-sm font-semibold text-[#16213A]">You</p>
              </div>
              <div>
                <p className="text-[#16213A]/50">Route</p>
                <p className="mt-1 text-sm font-semibold text-[#16213A]">Home → Bali</p>
              </div>
              <div>
                <p className="text-[#16213A]/50">Budget</p>
                <p className="mt-1 text-sm font-semibold text-[#16213A]">₹80,000</p>
              </div>
              <div>
                <p className="text-[#16213A]/50">Class</p>
                <p className="mt-1 text-sm font-semibold text-[#FF5A36]">AI Concierge</p>
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#16213A]/40">
              Notes to Elixway
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[#16213A] lg:text-2xl">
              "Plan a 5-day honeymoon in Bali under ₹80,000 with a private pool villa."
            </h3>

            <div className="mt-8 flex items-center gap-3 border-t border-dashed border-[#16213A]/15 pt-5">
              <div className="flex gap-[3px]" aria-hidden="true">
                {[3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1].map((w, i) => (
                  <span key={i} className="block h-6 bg-[#16213A]/70" style={{ width: `${w}px` }} />
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#16213A]/50">
                Scan to begin
              </span>
            </div>
          </div>
        </motion.div>

        {/* Manifest / Timeline */}
        <div className="relative mx-auto mt-24 max-w-3xl">
          <div className="absolute left-6 top-3 hidden h-[calc(100%-24px)] w-px border-l border-dashed border-[#16213A]/25 lg:block" />

          <motion.div
            initial={{ y: 0 }}
            whileInView={{ y: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="absolute left-6 top-0 hidden -translate-x-1/2 text-[#FF5A36] lg:block"
          >
            <Plane size={18} className="rotate-90" />
          </motion.div>

          <div className="space-y-4">
            {JOURNEY_STEPS.map((step, index) => (
              <JourneyStep
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                code={step.code}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AIJourney;