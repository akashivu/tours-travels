import {
  ArrowUpRight,
  Plane,
  Sparkles,
} from "lucide-react";

interface ElixwayServicesProps {
  onPlanWithAI?: () => void;
  onAskAI?: () => void;
  onExploreServices?: () => void;
}

const services = [
  {
    id: "plan",
    title: "Plan with AI",
    description:
      "Turn a travel idea into a personalized journey with an itinerary that fits your time, budget and preferences.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85",
    icon: Sparkles,
    action: "Start planning",
    onClickKey: "plan",
  },
  {
    id: "ask",
    title: "Ask Elixway",
    description:
      "Get clear answers about destinations, flights, hotels, travel policies and everything you need to know.",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=85",
    icon: Sparkles,
    action: "Ask Elixway",
    onClickKey: "ask",
  },
  {
    id: "services",
    title: "From ground to air",
    description:
      "Keep your journey connected with flights, stays and ground transportation through one travel platform.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    icon: Plane,
    action: "Explore services",
    onClickKey: "services",
  },
];

export default function ElixwayServices({
  onPlanWithAI,
  onAskAI,
  onExploreServices,
}: ElixwayServicesProps) {
  const handleClick = (key: string) => {
    if (key === "plan") {
      onPlanWithAI?.();
    }

    if (key === "ask") {
      onAskAI?.();
    }

    if (key === "services") {
      onExploreServices?.();
    }
  };

  return (
    <section
      className="
        w-full
        bg-white
        px-5
        py-10
        sm:px-8
        sm:py-14
        lg:px-12
      "
      style={{
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <div className="mx-auto w-full max-w-[1180px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-6">

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#667085]
            "
          >
            Explore Elixway
          </p>

          <h2
            className="
              mt-1.5
              text-[25px]
              font-semibold
              leading-[1.15]
              tracking-[-0.03em]
              text-[#172033]
              sm:text-[28px]
            "
            style={{
              fontFamily: '"Sora", "Inter", sans-serif',
            }}
          >
            Everything you need for your journey
          </h2>

        </div>


        {/* =====================================================
            CARDS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleClick(service.onClickKey)}
                className="
                  group
                  relative
                  h-[220px]
                  w-full
                  overflow-hidden
                  rounded-[18px]
                  bg-[#eef2f6]
                  text-left
                  focus:outline-none
                "
              >
                {/* Image */}

                <img
                  src={service.image}
                  alt=""
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.05]
                  "
                />

                {/* Scrim for text legibility */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/85
                    via-black/25
                    to-black/5
                  "
                />

                {/* Icon badge */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    text-white
                    ring-1
                    ring-inset
                    ring-white/25
                    backdrop-blur-sm
                  "
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Text on image */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    px-5
                    pb-5
                  "
                >
                  <h3
                    className="
                      text-[19px]
                      font-semibold
                      leading-[1.2]
                      tracking-[-0.02em]
                      text-white
                    "
                    style={{
                      fontFamily: '"Sora", "Inter", sans-serif',
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-[300px]
                      text-[12.5px]
                      font-normal
                      leading-[1.55]
                      tracking-[-0.005em]
                      text-white/75
                    "
                  >
                    {service.description}
                  </p>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-1.5
                      text-[12px]
                      font-semibold
                      text-white
                    "
                  >
                    {service.action}

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.9}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </div>
                </div>

              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}