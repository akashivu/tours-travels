import {
  ArrowRight,
  Building2,
  Car,
  MessageCircle,
  Plane,
  Sparkles,
} from "lucide-react";

interface ElixwayServicesProps {
  onPlanWithAI?: () => void;
  onAskAI?: () => void;
  onTravelServices?: () => void;
}

export default function ElixwayServices({
  onPlanWithAI,
  onAskAI,
  onTravelServices,
}: ElixwayServicesProps) {
  return (
    <section
      className="
        w-full
        bg-[#f5f8fb]
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
      "
    >
      <div className="mx-auto w-full max-w-[1180px]">

        {/* Section Header */}

        <div className="mb-8">
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#2563eb]
            "
          >
            Explore Elixway
          </p>

          <h2
            className="
              mt-2
              text-[26px]
              font-semibold
              tracking-[-0.03em]
              text-[#172033]
              sm:text-[30px]
            "
          >
            Everything you need for your journey
          </h2>

          <p
            className="
              mt-2
              max-w-[620px]
              text-[13px]
              leading-5
              text-[#667085]
              sm:text-[14px]
            "
          >
            Plan your trip with AI, get travel assistance,
            or book everything from flights and
            cabs in one place.
          </p>
        </div>


        {/* Service Cards */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >

          {/* Plan With AI */}

          <button
            type="button"
            onClick={onPlanWithAI}
            className="
              group
              rounded-[20px]
              border
              border-[#d9e6f7]
              bg-[#f8fbff]
              p-6
              text-left
              shadow-[0_6px_22px_rgba(15,23,42,0.04)]
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-[#bcd3f5]
              hover:shadow-[0_14px_32px_rgba(37,99,235,0.10)]
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-[12px]
                bg-[#2563eb]
                text-white
              "
            >
              <Sparkles
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <p
              className="
                mt-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#2563eb]
              "
            >
              AI Trip Planner
            </p>

            <h3
              className="
                mt-1.5
                text-[20px]
                font-semibold
                tracking-[-0.02em]
                text-[#172033]
              "
            >
              Plan with AI
            </h3>

            <p
              className="
                mt-3
                text-[13px]
                leading-5
                text-[#667085]
              "
            >
              Create a personalized itinerary with
              places, activities, stays, transport
              and budget recommendations.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-[13px]
                font-semibold
                text-[#2563eb]
              "
            >
              Start planning

              <ArrowRight
                size={16}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </div>
          </button>


          {/* Ask AI */}

          <button
            type="button"
            onClick={onAskAI}
            className="
              group
              rounded-[20px]
              border
              border-[#e4e7ec]
              bg-white
              p-6
              text-left
              shadow-[0_6px_22px_rgba(15,23,42,0.04)]
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-[#cfd7e3]
              hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-[12px]
                bg-[#f1f5f9]
                text-[#172033]
              "
            >
              <MessageCircle
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <p
              className="
                mt-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#667085]
              "
            >
              Travel Assistant
            </p>

            <h3
              className="
                mt-1.5
                text-[20px]
                font-semibold
                tracking-[-0.02em]
                text-[#172033]
              "
            >
              Ask AI
            </h3>

            <p
              className="
                mt-3
                text-[13px]
                leading-5
                text-[#667085]
              "
            >
              Ask questions, discover places, get
              recommendations and get help with
              your travel decisions.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-[13px]
                font-semibold
                text-[#172033]
              "
            >
              Ask Elixway AI

              <ArrowRight
                size={16}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </div>
          </button>


          {/* Flights Hotels Cabs */}

          <button
            type="button"
            onClick={onTravelServices}
            className="
              group
              rounded-[20px]
              border
              border-[#e4e7ec]
              bg-white
              p-6
              text-left
              shadow-[0_6px_22px_rgba(15,23,42,0.04)]
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-[#cfd7e3]
              hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]
            "
          >
            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#f1f5f9]
                  text-[#172033]
                "
              >
                <Plane
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#f1f5f9]
                  text-[#172033]
                "
              >
                <Building2
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#f1f5f9]
                  text-[#172033]
                "
              >
                <Car
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

            </div>

            <p
              className="
                mt-5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#667085]
              "
            >
              Travel Services
            </p>

            <h3
              className="
                mt-1.5
                text-[20px]
                font-semibold
                tracking-[-0.02em]
                text-[#172033]
              "
            >
              Flights, Hotels & Cabs
            </h3>

            <p
              className="
                mt-3
                text-[13px]
                leading-5
                text-[#667085]
              "
            >
              From air to ground, keep your journey
              connected with flights, stays and
              reliable ground mobility in one place.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-[13px]
                font-semibold
                text-[#172033]
              "
            >
              Explore services

              <ArrowRight
                size={16}
                strokeWidth={1.9}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
}