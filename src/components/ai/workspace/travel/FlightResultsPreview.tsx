import {
  ArrowRight,
  Clock3,
  Plane,
} from "lucide-react";

const flights = [
  {
    airline: "IndiGo",
    from: "BLR",
    to: "BKK",
    departure: "06:15",
    arrival: "11:45",
    duration: "4h 00m",
    price: "₹8,420",
  },
  {
    airline: "Air India",
    from: "BLR",
    to: "BKK",
    departure: "09:30",
    arrival: "15:10",
    duration: "4h 10m",
    price: "₹9,180",
  },
  {
    airline: "Thai Airways",
    from: "BLR",
    to: "BKK",
    departure: "23:45",
    arrival: "05:20",
    duration: "4h 05m",
    price: "₹10,250",
  },
];

export function FlightResultsPreview() {
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
      <div className="mx-auto max-w-[850px] space-y-3">
        {flights.map((flight) => (
          <article
            key={`${flight.airline}-${flight.departure}`}
            className="
              rounded-[18px]
              border
              p-4
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
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              {/* Airline */}

              <div
                className="
                  flex
                  min-w-[140px]
                  items-center
                  gap-3
                "
              >
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
                  <Plane size={16} />
                </div>

                <div>
                  <p
                    className="
                      text-[12px]
                      font-semibold
                    "
                    style={{
                      color:
                        "var(--ai-ink)",
                    }}
                  >
                    {flight.airline}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9.5px]
                    "
                    style={{
                      color:
                        "var(--ai-muted)",
                    }}
                  >
                    Economy
                  </p>
                </div>
              </div>

              {/* Route */}

              <div className="flex flex-1 items-center justify-center gap-4">
                <div className="text-center">
                  <p
                    className="
                      text-[17px]
                      font-semibold
                    "
                    style={{
                      color:
                        "var(--ai-ink)",
                    }}
                  >
                    {flight.from}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                    "
                    style={{
                      color:
                        "var(--ai-muted)",
                    }}
                  >
                    {flight.departure}
                  </p>
                </div>

                <div className="flex flex-1 max-w-[150px] items-center gap-2">
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "var(--ai-border-strong)",
                    }}
                  />

                  <div
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                    "
                    style={{
                      background:
                        "var(--ai-card-soft)",
                    }}
                  >
                    <ArrowRight
                      size={11}
                      style={{
                        color:
                          "var(--ai-muted)",
                      }}
                    />
                  </div>

                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        "var(--ai-border-strong)",
                    }}
                  />
                </div>

                <div className="text-center">
                  <p
                    className="
                      text-[17px]
                      font-semibold
                    "
                    style={{
                      color:
                        "var(--ai-ink)",
                    }}
                  >
                    {flight.to}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                    "
                    style={{
                      color:
                        "var(--ai-muted)",
                    }}
                  >
                    {flight.arrival}
                  </p>
                </div>
              </div>

              {/* Duration */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-[10px]
                "
                style={{
                  color:
                    "var(--ai-muted)",
                }}
              >
                <Clock3 size={12} />

                {flight.duration}
              </div>

              {/* Price */}

              <div className="text-right">
                <p
                  className="
                    text-[16px]
                    font-semibold
                  "
                  style={{
                    color:
                      "var(--ai-ink)",
                  }}
                >
                  {flight.price}
                </p>

                <button
                  type="button"
                  className="
                    mt-1.5
                    text-[10px]
                    font-medium
                    underline
                    underline-offset-2
                  "
                  style={{
                    color:
                      "var(--ai-ink-soft)",
                  }}
                >
                  View flight
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}