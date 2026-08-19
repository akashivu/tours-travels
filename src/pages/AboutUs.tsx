import {
  ArrowUpRight,
  Compass,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const principles = [
  {
    number: "01",
    icon: Compass,
    title: "Simple by design",
    description:
      "We remove unnecessary complexity and make every step of the journey easier to understand.",
  },
  {
    number: "02",
    icon: Users,
    title: "Built around people",
    description:
      "Technology should adapt to people, not the other way around. Every experience starts with the user.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Intelligence that helps",
    description:
      "We use intelligent technology to make discovering, planning and experiencing travel more effortless.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Always moving forward",
    description:
      "We continuously improve how technology connects people with better experiences.",
  },
];

const stats = [
  {
    value: "01",
    label: "Intelligent platform",
  },
  {
    value: "∞",
    label: "Possibilities",
  },
  {
    value: "24/7",
    label: "Connected experiences",
  },
];

export default function AboutUs() {
  return (
    <main className="w-full bg-white text-neutral-950">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-32 lg:px-12 lg:pb-44 lg:pt-40">
          <div className="grid items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Heading */}
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-8 bg-neutral-900" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  About Elixway
                </span>
              </div>

              <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                A simpler way
                <br />
                to experience
                <br />
                the world.
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-md pb-2 lg:ml-auto">
              <p className="text-lg leading-8 text-neutral-600 sm:text-xl">
                Elixway is building a smarter way to discover, plan and
                experience travel — bringing intelligent technology and
                meaningful experiences together.
              </p>

              <div className="mt-10 flex items-center gap-3 text-sm font-medium text-neutral-950">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200">
                  ↓
                </span>

                <span>Discover our story</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal divider */}
        <div className="mx-auto max-w-7xl border-t border-neutral-200 px-6 sm:px-8 lg:px-12" />
      </section>

      {/* =====================================================
          STORY
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            {/* Label */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Our story
              </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl">
              <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Travel should feel exciting,
                <span className="text-neutral-400">
                  {" "}
                  not complicated.
                </span>
              </h2>

              <div className="mt-12 grid gap-8 text-base leading-8 text-neutral-600 sm:grid-cols-2 sm:gap-12">
                <p>
                  Elixway was created around a simple idea: technology should
                  make travel feel more natural. From discovering a destination
                  to making plans, every interaction should feel clear,
                  intuitive and useful.
                </p>

                <p>
                  We are combining modern digital experiences with intelligent
                  systems to create a platform that helps people move from
                  inspiration to experience with less friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRINCIPLES
      ====================================================== */}
      <section className="border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-40">
          <div className="mb-20 max-w-2xl">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
              What we believe
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Principles that shape
              <br />
              everything we build.
            </h2>
          </div>

          <div className="grid border-t border-neutral-200 sm:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.number}
                  className="group border-b border-neutral-200 py-10 sm:nth-[odd]:border-r sm:nth-[odd]:pr-10 lg:py-14 lg:pr-16"
                >
                  <div className="flex items-start justify-between gap-8">
                    <span className="text-xs font-medium text-neutral-400">
                      {principle.number}
                    </span>

                    <Icon
                      strokeWidth={1.5}
                      className="h-5 w-5 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neutral-950"
                    />
                  </div>

                  <h3 className="mt-12 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {principle.title}
                  </h3>

                  <p className="mt-5 max-w-md text-[15px] leading-7 text-neutral-500">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-40">
          <div className="grid gap-12 md:grid-cols-3 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-8 md:px-10 md:py-4 ${
                  index !== 0 ? "border-t md:border-l md:border-t-0" : ""
                } border-neutral-200`}
              >
                <div className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                  {stat.value}
                </div>

                <p className="mt-4 text-sm text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION
      ====================================================== */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-44 lg:px-12 lg:py-52">
          <div className="grid gap-16 lg:grid-cols-[0.5fr_1.5fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Our vision
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                Make every
                <br />
                journey feel
                <br />
                effortless.
              </h2>

              <p className="mt-12 max-w-xl text-base leading-8 text-neutral-400 sm:text-lg">
                We imagine a future where intelligent technology quietly works
                in the background, helping people spend less time figuring
                things out and more time enjoying where they are going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
          <div className="flex flex-col justify-between gap-12 border-b border-neutral-200 pb-16 sm:flex-row sm:items-end">
            <div>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                The next step
              </p>

              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                The journey starts here.
              </h2>
            </div>

            <button
              type="button"
              className="group inline-flex w-fit items-center gap-4 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800"
            >
              Explore Elixway

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}