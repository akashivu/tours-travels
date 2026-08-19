import {
  ArrowRight,
  Clock3,
  Plane,
} from "lucide-react";

import type {
  FlightOption,
} from "./flight.types";

interface FlightCardProps {
  flight: FlightOption;
  onBook?: (flight: FlightOption) => void;
}

export function FlightCard({
  flight,
  onBook,
}: FlightCardProps) {
  const firstSegment = flight.outbound[0];
  const lastSegment =
    flight.outbound[flight.outbound.length - 1];

  if (!firstSegment || !lastSegment) {
    return null;
  }

  return (
    <article
      className="
        rounded-[18px]
        border
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
      "
      style={{
        background: "var(--ai-card)",
        borderColor: "var(--ai-border)",
        boxShadow: "var(--ai-shadow-sm)",
      }}
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
        "
      >
        {/* Airline */}

        <div
          className="
            flex
            min-w-[145px]
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[10px]
            "
            style={{
              background: "var(--ai-card-soft)",
              color: "var(--ai-ink)",
            }}
          >
            {firstSegment.airline.logoUrl ? (
              <img
                src={firstSegment.airline.logoUrl}
                alt={firstSegment.airline.name}
                className="h-7 w-7 object-contain"
              />
            ) : (
              <Plane
                size={16}
                strokeWidth={1.8}
              />
            )}
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-[12px]
                font-semibold
              "
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {firstSegment.airline.name}
            </p>

            <p
              className="
                mt-0.5
                text-[9.5px]
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {firstSegment.flightNumber ||
                firstSegment.airline.code}
            </p>
          </div>
        </div>

        {/* Route */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            justify-center
            gap-4
          "
        >
          <AirportTime
            airport={firstSegment.origin.code}
            time={formatTime(firstSegment.departure)}
          />

          <div
            className="
              flex
              min-w-[90px]
              max-w-[180px]
              flex-1
              items-center
              gap-2
            "
          >
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
                shrink-0
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
                  color: "var(--ai-muted)",
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

          <AirportTime
            airport={lastSegment.destination.code}
            time={formatTime(lastSegment.arrival)}
          />
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
            color: "var(--ai-muted)",
          }}
        >
          <Clock3 size={12} />

          <span>
            {formatDuration(
              flight.totalDurationMinutes
            )}
          </span>

          <span>
            · {getStopsLabel(firstSegment.stops)}
          </span>
        </div>

        {/* Price */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            lg:min-w-[145px]
            lg:justify-end
          "
        >
          <div className="text-left lg:text-right">
            <p
              className="
                text-[16px]
                font-semibold
              "
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {flight.price.currency}{" "}
              {flight.price.amount.toLocaleString(
                "en-IN"
              )}
            </p>

            <p
              className="
                mt-0.5
                text-[9.5px]
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              per passenger
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBook?.(flight)}
            className="
              rounded-[10px]
              px-3.5
              py-2
              text-[10.5px]
              font-medium
              transition-opacity
              hover:opacity-85
            "
            style={{
              background: "var(--ai-ink)",
              color: "#ffffff",
            }}
          >
            View flight
          </button>
        </div>
      </div>
    </article>
  );
}

interface AirportTimeProps {
  airport: string;
  time: string;
}

function AirportTime({
  airport,
  time,
}: AirportTimeProps) {
  return (
    <div className="shrink-0 text-center">
      <p
        className="
          text-[17px]
          font-semibold
          tracking-[-0.02em]
        "
        style={{
          color: "var(--ai-ink)",
        }}
      >
        {airport}
      </p>

      <p
        className="
          mt-0.5
          text-[10px]
        "
        style={{
          color: "var(--ai-muted)",
        }}
      >
        {time}
      </p>
    </div>
  );
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDuration(minutes?: number) {
  if (minutes === undefined || minutes === null) {
    return "--";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getStopsLabel(stops: number) {
  if (stops === 0) {
    return "Direct";
  }

  if (stops === 1) {
    return "1 stop";
  }

  return `${stops} stops`;
}