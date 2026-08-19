import {
  ArrowRight,
  Building2,
  MapPin,
  Star,
} from "lucide-react";

import type {
  HotelOption,
  HotelSearchResponse,
} from "./hotel.types";

interface HotelResultsProps {
  data?: HotelSearchResponse;
  isLoading?: boolean;
  error?: string | null;
  onSelect?: (hotel: HotelOption) => void;
}

function formatPrice(
  amount: number,
  currency: string
) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString(
      "en-IN"
    )}`;
  }
}

function HotelCard({
  hotel,
  onSelect,
}: {
  hotel: HotelOption;
  onSelect?: (hotel: HotelOption) => void;
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
        {/* Hotel image */}

        <div
          className="
            relative
            h-48
            shrink-0
            overflow-hidden
            sm:h-auto
            sm:w-[210px]
          "
          style={{
            background: "var(--ai-soft)",
          }}
        >
          {hotel.imageUrl ? (
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-[1.03]
              "
              loading="lazy"
            />
          ) : (
            <div
              className="
                flex
                h-full
                min-h-48
                items-center
                justify-center
              "
            >
              <Building2
                size={28}
                strokeWidth={1.5}
                style={{
                  color: "var(--ai-muted)",
                }}
              />
            </div>
          )}
        </div>

        {/* Hotel information */}

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
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
                {hotel.name}
              </h3>

              {hotel.propertyType && (
                <p
                  className="
                    mt-1
                    text-[11px]
                    uppercase
                    tracking-wide
                  "
                  style={{
                    color: "var(--ai-muted)",
                  }}
                >
                  {hotel.propertyType}
                </p>
              )}
            </div>

            {hotel.rating?.value !== undefined && (
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
                  borderColor: "var(--ai-border)",
                  background: "var(--ai-soft)",
                }}
              >
                <Star
                  size={12}
                  fill="currentColor"
                  style={{
                    color: "var(--ai-ink)",
                  }}
                />

                <span
                  className="
                    text-xs
                    font-medium
                  "
                  style={{
                    color: "var(--ai-ink)",
                  }}
                >
                  {hotel.rating.value}
                </span>
              </div>
            )}
          </div>

          {/* Location */}

          {(hotel.location.city ||
            hotel.location.address) && (
            <div
              className="
                mt-3
                flex
                items-start
                gap-1.5
              "
            >
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
                {hotel.location.address ||
                  hotel.location.city}
              </p>
            </div>
          )}

          {/* Amenities */}

          {hotel.amenities &&
            hotel.amenities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {hotel.amenities
                  .slice(0, 3)
                  .map((amenity) => (
                    <span
                      key={amenity}
                      className="
                        rounded-full
                        border
                        px-2
                        py-1
                        text-[10px]
                      "
                      style={{
                        borderColor:
                          "var(--ai-border)",
                        color:
                          "var(--ai-muted)",
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
              </div>
            )}

          {/* Bottom section */}

          <div
            className="
              mt-4
              flex
              flex-col
              gap-3
              border-t
              pt-3
              sm:mt-auto
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
            style={{
              borderColor: "var(--ai-border)",
            }}
          >
            <div>
              {hotel.price ? (
                <>
                  <p
                    className="
                      text-base
                      font-semibold
                    "
                    style={{
                      color: "var(--ai-ink)",
                    }}
                  >
                    {formatPrice(
                      hotel.price.amount,
                      hotel.price.currency
                    )}
                  </p>

                  {hotel.price.period && (
                    <p
                      className="
                        mt-0.5
                        text-[11px]
                      "
                      style={{
                        color: "var(--ai-muted)",
                      }}
                    >
                      per{" "}
                      {hotel.price.period}
                    </p>
                  )}
                </>
              ) : (
                <p
                  className="text-xs"
                  style={{
                    color: "var(--ai-muted)",
                  }}
                >
                  Price available after selection
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                onSelect?.(hotel)
              }
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
              View hotel
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HotelResults({
  data,
  isLoading = false,
  error = null,
  onSelect,
}: HotelResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 p-5">
        <div
          className="
            h-5
            w-32
            animate-pulse
            rounded
          "
          style={{
            background:
              "var(--ai-border)",
          }}
        />

        <div
          className="
            h-48
            animate-pulse
            rounded-2xl
          "
          style={{
            background:
              "var(--ai-soft)",
          }}
        />

        <div
          className="
            h-48
            animate-pulse
            rounded-2xl
          "
          style={{
            background:
              "var(--ai-soft)",
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          p-6
        "
      >
        <div className="max-w-sm text-center">
          <p
            className="
              text-sm
              font-medium
            "
            style={{
              color: "var(--ai-ink)",
            }}
          >
            We couldn't load hotels
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
            "
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
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          p-6
        "
      >
        <div className="max-w-sm text-center">
          <p
            className="
              text-sm
              font-medium
            "
            style={{
              color: "var(--ai-ink)",
            }}
          >
            No hotels found
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
            "
            style={{
              color: "var(--ai-muted)",
            }}
          >
            Try another destination or adjust
            your dates and guest count.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          p-5
          sm:p-6
        "
      >
        <div
          className="
            mb-4
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold
              "
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {data.results.length}{" "}
              {data.results.length === 1
                ? "hotel"
                : "hotels"}
            </p>

            <p
              className="
                mt-1
                text-xs
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              Available options
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {data.results.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}