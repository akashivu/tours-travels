import {
  ArrowRight,
  Compass,
  MapPin,
  Star,
} from "lucide-react";

import type {
  PlaceOption,
  PlaceSearchResponse,
} from "./place.types";

interface PlaceResultsProps {
  data?: PlaceSearchResponse;
  isLoading?: boolean;
  error?: string | null;
  onSelect?: (place: PlaceOption) => void;
}

function PlaceCard({
  place,
  onSelect,
}: {
  place: PlaceOption;
  onSelect?: (place: PlaceOption) => void;
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
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
      <div className="flex flex-col sm:flex-row">
        <div
          className="
            relative
            h-44
            shrink-0
            overflow-hidden
            sm:h-auto
            sm:w-[190px]
          "
          style={{
            background: "var(--ai-soft)",
          }}
        >
          {place.imageUrl ? (
            <img
              src={place.imageUrl}
              alt={place.name}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-[1.03]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                min-h-44
                items-center
                justify-center
              "
            >
              <Compass
                size={28}
                strokeWidth={1.5}
                style={{
                  color: "var(--ai-muted)",
                }}
              />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {place.category && (
                <p
                  className="
                    mb-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                  "
                  style={{
                    color: "var(--ai-muted)",
                  }}
                >
                  {place.category}
                </p>
              )}

              <h3
                className="
                  line-clamp-2
                  text-sm
                  font-semibold
                "
                style={{
                  color: "var(--ai-ink)",
                }}
              >
                {place.name}
              </h3>
            </div>

            {place.rating !== undefined && (
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1
                  rounded-lg
                  border
                  px-2
                  py-1
                "
                style={{
                  background: "var(--ai-soft)",
                  borderColor: "var(--ai-border)",
                  color: "var(--ai-ink)",
                }}
              >
                <Star
                  size={12}
                  fill="currentColor"
                />

                <span className="text-xs font-medium">
                  {place.rating}
                </span>
              </div>
            )}
          </div>

          {place.description && (
            <p
              className="
                mt-2
                line-clamp-2
                text-xs
                leading-5
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {place.description}
            </p>
          )}

          {(place.address || place.city) && (
            <div className="mt-3 flex items-start gap-1.5">
              <MapPin
                size={13}
                className="mt-0.5 shrink-0"
                style={{
                  color: "var(--ai-muted)",
                }}
              />

              <p
                className="
                  line-clamp-2
                  text-xs
                  leading-5
                "
                style={{
                  color: "var(--ai-muted)",
                }}
              >
                {place.address || place.city}
              </p>
            </div>
          )}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3
              border-t
              pt-3
            "
            style={{
              borderColor: "var(--ai-border)",
            }}
          >
            {place.reviewCount !== undefined ? (
              <span
                className="text-[11px]"
                style={{
                  color: "var(--ai-muted)",
                }}
              >
                {place.reviewCount.toLocaleString(
                  "en-IN"
                )}{" "}
                reviews
              </span>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => onSelect?.(place)}
              className="
                inline-flex
                items-center
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
              Explore
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PlaceResults({
  data,
  isLoading = false,
  error = null,
  onSelect,
}: PlaceResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        <div
          className="h-5 w-28 animate-pulse rounded"
          style={{
            background: "var(--ai-border)",
          }}
        />

        <div
          className="h-44 animate-pulse rounded-2xl"
          style={{
            background: "var(--ai-soft)",
          }}
        />

        <div
          className="h-44 animate-pulse rounded-2xl"
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
            We couldn't load places
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
            No places found
          </p>

          <p
            className="mt-1 text-xs leading-5"
            style={{
              color: "var(--ai-muted)",
            }}
          >
            Try a different destination or search
            with a broader description.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl p-5 sm:p-6">
        <div className="mb-4">
          <p
            className="text-sm font-semibold"
            style={{
              color: "var(--ai-ink)",
            }}
          >
            {data.results.length}{" "}
            {data.results.length === 1
              ? "place"
              : "places"}
          </p>

          <p
            className="mt-1 text-xs"
            style={{
              color: "var(--ai-muted)",
            }}
          >
            Places matching your request
          </p>
        </div>

        <div className="space-y-3">
          {data.results.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}