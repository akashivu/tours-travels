import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const places = [
  {
    name: "Grand Palace",
    category: "Culture",
    location: "Bangkok",
  },
  {
    name: "Wat Arun",
    category: "Landmark",
    location: "Bangkok",
  },
  {
    name: "Chatuchak Market",
    category: "Shopping",
    location: "Bangkok",
  },
  {
    name: "Chao Phraya River",
    category: "Experience",
    location: "Bangkok",
  },
];

export function PlaceResultsPreview() {
  return (
    <div
      className="
        ai-scroll
        min-h-0
        flex-1
        overflow-y-auto
        p-6
      "
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {places.map((place) => (
          <article
            key={place.name}
            className="
              group
              rounded-[18px]
              border
              p-5
              transition-all
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              background:
                "var(--ai-card)",
              borderColor:
                "var(--ai-border)",
              boxShadow:
                "var(--ai-shadow-sm)",
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-[10px]
                "
                style={{
                  background:
                    "var(--ai-card-soft)",
                  color:
                    "var(--ai-ink)",
                }}
              >
                <MapPin size={16} />
              </div>

              <ArrowUpRight
                size={15}
                className="
                  opacity-40
                  transition-all
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  group-hover:opacity-100
                "
                style={{
                  color:
                    "var(--ai-ink)",
                }}
              />
            </div>

            <p
              className="
                mt-5
                text-[13px]
                font-semibold
              "
              style={{
                color:
                  "var(--ai-ink)",
              }}
            >
              {place.name}
            </p>

            <p
              className="
                mt-1
                text-[10.5px]
              "
              style={{
                color:
                  "var(--ai-muted)",
              }}
            >
              {place.category}
            </p>

            <p
              className="
                mt-4
                text-[10px]
              "
              style={{
                color:
                  "var(--ai-muted)",
              }}
            >
              {place.location}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}