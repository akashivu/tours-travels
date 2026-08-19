import { Clock3, Plane, ArrowRight } from "lucide-react";

import type {
  FlightOption,
  FlightSearchResponse,
} from "./flight.types";

interface FlightResultsProps {
  data?: FlightSearchResponse;
  isLoading?: boolean;
  error?: string | null;
  onSelect?: (flight: FlightOption) => void;
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
  if (!minutes) {
    return null;
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
    return "Non-stop";
  }

  if (stops === 1) {
    return "1 stop";
  }

  return `${stops} stops`;
}

function FlightCard({
  flight,
  onSelect,
}: {
  flight: FlightOption;
  onSelect?: (flight: FlightOption) => void;
}) {
  const outbound = flight.outbound[0];

  if (!outbound) {
    return null;
  }

  const firstSegment = flight.outbound[0];
  const lastSegment =
    flight.outbound[flight.outbound.length - 1];

  return (
    <article
      className="
        group
        rounded-2xl
        border
        p-4
        transition
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.06)]
      "
      style={{
        background: "var(--ai-card)",
        borderColor: "var(--ai-border)",
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Airline */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {firstSegment.airline.logoUrl ? (
              <img
                src={firstSegment.airline.logoUrl}
                alt={firstSegment.airline.name}
                className="h-8 w-8 rounded-lg object-contain"
              />
            ) : (
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                "
                style={{
                  borderColor: "var(--ai-border)",
                  background: "var(--ai-soft)",
                  color: "var(--ai-ink)",
                }}
              >
                <Plane size={15} />
              </div>
            )}

            <div className="min-w-0">
              <p
                className="truncate text-sm font-medium"
                style={{
                  color: "var(--ai-ink)",
                }}
              >
                {firstSegment.airline.name}
              </p>

              <p
                className="mt-0.5 text-[11px]"
                style={{
                  color: "var(--ai-muted)",
                }}
              >
                {firstSegment.flightNumber ||
                  firstSegment.airline.code}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              className="text-base font-semibold"
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
              className="text-[11px]"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              total fare
            </p>
          </div>
        </div>

        {/* Route */}

        <div
          className="
            grid
            grid-cols-[1fr_auto_1fr]
            items-center
            gap-3
          "
        >
          <div>
            <p
              className="text-lg font-semibold tracking-tight"
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {firstSegment.origin.code}
            </p>

            <p
              className="mt-0.5 text-xs"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {formatTime(firstSegment.departure)}
            </p>
          </div>

          <div className="flex min-w-[90px] flex-col items-center">
            <span
              className="mb-1 text-[10px]"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {formatDuration(
                flight.totalDurationMinutes
              )}
            </span>

            <div className="flex w-full items-center gap-1.5">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    "var(--ai-border)",
                }}
              />

              <Plane
                size={13}
                strokeWidth={1.8}
                style={{
                  color: "var(--ai-muted)",
                }}
              />

              <div
                className="h-px flex-1"
                style={{
                  background:
                    "var(--ai-border)",
                }}
              />
            </div>

            <span
              className="mt-1 text-[10px]"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {getStopsLabel(firstSegment.stops)}
            </span>
          </div>

          <div className="text-right">
            <p
              className="text-lg font-semibold tracking-tight"
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {lastSegment.destination.code}
            </p>

            <p
              className="mt-0.5 text-xs"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {formatTime(lastSegment.arrival)}
            </p>
          </div>
        </div>

        {/* Details + action */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            pt-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
          style={{
            borderColor: "var(--ai-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <Clock3
              size={13}
              style={{
                color: "var(--ai-muted)",
              }}
            />

            <span
              className="text-xs"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {getStopsLabel(firstSegment.stops)}
            </span>

            {flight.refundable !== undefined && (
              <>
                <span
                  className="text-xs"
                  style={{
                    color: "var(--ai-border)",
                  }}
                >
                  •
                </span>

                <span
                  className="text-xs"
                  style={{
                    color: "var(--ai-muted)",
                  }}
                >
                  {flight.refundable
                    ? "Refundable"
                    : "Non-refundable"}
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect?.(flight)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-xs
              font-medium
              transition
              duration-200
              hover:translate-x-0.5
            "
            style={{
              background: "var(--ai-ink)",
              color: "var(--ai-canvas)",
            }}
          >
            View flight
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function FlightResults({
  data,
  isLoading = false,
  error = null,
  onSelect,
}: FlightResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        <div
          className="h-5 w-32 animate-pulse rounded"
          style={{
            background: "var(--ai-border)",
          }}
        />

        <div
          className="h-32 animate-pulse rounded-2xl"
          style={{
            background: "var(--ai-soft)",
          }}
        />

        <div
          className="h-32 animate-pulse rounded-2xl"
          style={{
            background: "var(--ai-soft)",
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="max-w-sm text-center">
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--ai-ink)",
            }}
          >
            We couldn't load flights
          </p>

          <p
            className="mt-1 text-xs leading-5"
            style={{
              color: "var(--ai-muted)",
            }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  if (data.results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="max-w-sm text-center">
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--ai-ink)",
            }}
          >
            No flights found
          </p>

          <p
            className="mt-1 text-xs leading-5"
            style={{
              color: "var(--ai-muted)",
            }}
          >
            Try changing your dates, route or cabin
            preference.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl p-5 sm:p-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {data.results.length}{" "}
              {data.results.length === 1
                ? "flight"
                : "flights"}
            </p>

            <p
              className="mt-1 text-xs"
              style={{
                color: "var(--ai-muted)",
              }}
            >
              Available options
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {data.results.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}