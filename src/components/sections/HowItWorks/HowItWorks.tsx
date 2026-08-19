import Section from "../../ui/Section";
import Container from "../../ui/Container";

import HowItWorksStep from "./HowItWorksStep";
import { HOW_IT_WORKS_STEPS } from "./howItWorks.constants";

const HowItWorks = () => {
  return (
    <Section className="overflow-hidden bg-white py-20 lg:py-24">
      <Container>
        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
            How Elixway works
          </p>

          <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-5xl">
            From an idea to
            <br />
            your entire journey.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-500">
            Discover a destination, let AI plan the
            details, and bring everything together
            when you're ready to travel.
          </p>
        </div>

        {/* Steps */}

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {HOW_IT_WORKS_STEPS.map(
            (step, index) => (
              <HowItWorksStep
                key={step.number}
                step={step}
                index={index}
              />
            ),
          )}
        </div>

        {/* Journey line */}

        <div className="mt-14 hidden items-center justify-center md:flex">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Discover</span>

            <span className="h-px w-12 bg-gray-300" />

            <span>Plan</span>

            <span className="h-px w-12 bg-gray-300" />

            <span>Book</span>

            <span className="h-px w-12 bg-gray-300" />

            <span className="font-medium text-gray-950">
              Travel
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HowItWorks;