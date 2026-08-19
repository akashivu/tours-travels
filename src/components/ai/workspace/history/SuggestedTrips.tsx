import {
  ArrowUpRight,
} from "lucide-react";

interface SuggestedTripsProps {
  onSelect?: (prompt: string) => void;
}

const suggestions = [
  {
    id: "thailand",
    title:
      "Plan a 5-day trip from Bengaluru to Thailand",
    prompt:
      "Plan a 5-day trip from Bengaluru to Thailand",
  },
  {
    id: "dubai-flight",
    title:
      "Find a flight from Bengaluru to Dubai",
    prompt:
      "Find a flight from Bengaluru to Dubai",
  },
  {
    id: "nearby-hotels",
    title:
      "Find the best hotels near me",
    prompt:
      "Find the best hotels near my current location",
  },
  {
    id: "explore",
    title:
      "Where should I travel next?",
    prompt:
      "Suggest destinations I should explore next",
  },
];

export function SuggestedTrips({
  onSelect,
}: SuggestedTripsProps) {
  return (
    <section className="w-full mt-25">
      {/* =====================================================
          INTRO
      ====================================================== */}

      <div className="mb-6 text-center">
        <p
          className="
            text-[14px]
            font-medium
            uppercase
            tracking-[0.16em]
          "
          style={{
            color: "var(--ai-accent)",
          }}
        >
          Elixway AI
        </p>

        <h2
          className="
            mt-2
            text-[35px]
            font-semibold
            tracking-[-0.025em]
          "
          style={{
            color: "var(--ai-ink)",
          }}
        >
          Where will we take you?
        </h2>

        <p
          className="
            mx-auto
            mt-1.5
            max-w-[430px]
            text-[14px]
            leading-[1.7]
          "
          style={{
            color: "var(--ai-muted)",
          }}
        >
          Tell Elixway what you're looking for
          and we'll help plan the journey.
        </p>
      </div>

      {/* =====================================================
          SUGGESTIONS
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[560px]
          flex-col
          gap-1.5
        "
      >
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            onClick={() =>
              onSelect?.(suggestion.prompt)
            }
            className="
              group
              flex
              items-center
              gap-3
              rounded-[var(--ai-radius-sm)]
              border
              px-4
              py-3
              text-left
              transition-all
              duration-200
            "
            style={{
              background: "var(--ai-card)",
              borderColor: "var(--ai-border)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                "var(--ai-border-strong)";
              event.currentTarget.style.background =
                "var(--ai-card-soft)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                "var(--ai-border)";
              event.currentTarget.style.background =
                "var(--ai-card)";
            }}
          >
            <span
              className="
                flex-1
                text-[14.5px]
                font-medium
                leading-[1.4]
              "
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {suggestion.title}
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.9}
              className="
                shrink-0
                opacity-40
                transition-all
                duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:opacity-100
              "
              style={{
                color: "var(--ai-ink-soft)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}