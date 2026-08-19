import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Section from "../../ui/Section";
import Container from "../../ui/Container";

import HeroContent from "./HeroContent";
import HeroGallery from "./HeroGallery";

const Hero = () => {
  return (
    <Section className="relative min-h-screen overflow-hidden bg-[#FAFAF9] !py-0">

      {/* Background */}
      <div className="absolute inset-0 -z-30 bg-[#FAFAF9]" />

      {/* Single accent glow — large + faint so it reads as atmosphere,
          not a shape. One color only; no second competing glow. */}
      <div className="absolute -left-40 top-0 -z-20 h-[650px] w-[650px] rounded-full bg-indigo-100/60 blur-[200px]" />

      <Container className="relative z-10 flex min-h-screen items-center pt-20 lg:pt-5">

        <div className="grid w-full items-center gap-20 lg:grid-cols-[65%_35%]">

          {/* Left Content — HeroContent handles its own entrance animation */}
          <HeroContent />

          {/* Right Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
            className="flex justify-end"
          >
            <HeroGallery />
          </motion.div>

        </div>

      </Container>

      {/* Scroll Indicator — appears once, no infinite loop.
          A continuous bounce running forever fights a minimalist page. */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            Scroll
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white">
            <ChevronDown size={18} className="text-gray-700" />
          </div>

        </div>
      </motion.div>

    </Section>
  );
};

export default Hero;