import {
  ArrowUpRight,
  MapPin,
  Star,
  Building2,
} from "lucide-react";

import type { HotelOption } from "./hotel.types";

interface HotelCardProps {
  hotel: HotelOption;
  onBook?: (hotel: HotelOption) => void;
}

export function HotelCard({
  hotel,
  onBook,
}: HotelCardProps) {
  const rating = hotel.rating?.value;
  const reviewCount = hotel.rating?.reviewCount;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[18px]
        border
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
      {/* IMAGE */}

      <div
        className="
          relative
          h-[180px]
          overflow-hidden
        "
      >
        {hotel.imageUrl ? (
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.025]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
            style={{
              background: "var(--ai-card-soft)",
              color: "var(--ai-muted)",
            }}
          >
            <Building2
              size={28}
              strokeWidth={1.5}
            />
          </div>
        )}

        {/* Rating */}

        {rating !== undefined && (
          <div
            className="
              absolute
              left-3
              top-3
              flex
              items-center
              gap-1
              rounded-full
              px-2.5
              py-1.5
              text-[10px]
              font-medium
            "
            style={{
              background:
                "rgba(255,255,255,0.94)",
              color: "var(--ai-ink)",
            }}
          >
            <Star
              size={11}
              fill="currentColor"
              strokeWidth={1.5}
            />

            <span>
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[13px]
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
                  text-[9px]
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

            {/* Location */}

            {(hotel.location.city ||
              hotel.location.address) && (
              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-1
                  text-[10.5px]
                "
                style={{
                  color: "var(--ai-muted)",
                }}
              >
                <MapPin size={12} />

                <span className="truncate">
                  {hotel.location.address ||
                    hotel.location.city}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}

        {reviewCount !== undefined && (
          <div
            className="
              mt-3
              text-[10px]
            "
            style={{
              color: "var(--ai-muted)",
            }}
          >
            {reviewCount.toLocaleString(
              "en-IN"
            )}{" "}
            reviews
          </div>
        )}

        {/* Amenities */}

        {hotel.amenities &&
          hotel.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hotel.amenities
                .slice(0, 3)
                .map((amenity: string) => (
                  <span
                    key={amenity}
                    className="
                      rounded-full
                      px-2
                      py-1
                      text-[9px]
                    "
                    style={{
                      background:
                        "var(--ai-card-soft)",
                      color:
                        "var(--ai-muted)",
                    }}
                  >
                    {amenity}
                  </span>
                ))}
            </div>
          )}

        {/* PRICE */}

        <div
          className="
            mt-4
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div>
            {hotel.price ? (
              <>
                <span
                  className="
                    text-[16px]
                    font-semibold
                  "
                  style={{
                    color: "var(--ai-ink)",
                  }}
                >
                  {hotel.price.currency}{" "}
                  {hotel.price.amount.toLocaleString(
                    "en-IN"
                  )}
                </span>

                {hotel.price.period && (
                  <span
                    className="
                      ml-1
                      text-[9.5px]
                    "
                    style={{
                      color: "var(--ai-muted)",
                    }}
                  >
                    per {hotel.price.period}
                  </span>
                )}
              </>
            ) : (
              <span
                className="text-[10px]"
                style={{
                  color: "var(--ai-muted)",
                }}
              >
                Price available after selection
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              onBook?.(hotel)
            }
            className="
              flex
              items-center
              gap-1.5
              rounded-[10px]
              px-3
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
            View

            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </article>
  );
}