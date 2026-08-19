import type { HowItWorksStep as Step } from "./howItWorks.constants";

interface HowItWorksStepProps {
  step: Step;
  index: number;
}

const HowItWorksStep = ({
  step,
  index,
}: HowItWorksStepProps) => {
  return (
    <article
      className="how-it-works-step group relative opacity-0"
      style={{
        animationDelay: `${index * 140}ms`,
      }}
    >
      {/* Number */}

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-[0.16em] text-gray-400">
          {step.number}
        </span>

        <span className="text-[10px] font-medium tracking-[0.18em] text-gray-400">
          {step.label}
        </span>
      </div>

      {/* Line */}

      <div className="mt-5 h-px w-full bg-gray-200 transition-colors duration-500 group-hover:bg-gray-950" />

      {/* Content */}

      <div className="pt-6">
        <h3 className="max-w-[260px] text-xl font-semibold leading-tight tracking-[-0.03em] text-gray-950">
          {step.title}
        </h3>

        <p className="mt-4 max-w-[300px] text-sm leading-6 text-gray-500">
          {step.description}
        </p>
      </div>
    </article>
  );
};

export default HowItWorksStep;