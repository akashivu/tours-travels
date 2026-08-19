import { MapPin, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

import type { PlaceData } from "./AIResponse";

interface PlaceCardsProps {
  places: PlaceData[];
}

export function PlaceCards({ places }: PlaceCardsProps) {
  const [expanded, setExpanded] = useState(false);

  const visiblePlaces = expanded ? places : places.slice(0, 2);

  return (
    <section className="mt-10 w-full max-w-[760px]">
      <div className="mb-5">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "#8A8A84" }}
        >
          Places worth exploring
        </p>

        <h2
          className="mt-1.5 text-[20px] font-semibold leading-[1.35] tracking-[-0.02em]"
          style={{ color: "#171717" }}
        >
          A few highlights for your trip
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visiblePlaces.map((place) => (
          <article
            key={place.id}
            className="overflow-hidden rounded-[16px] border bg-white"
            style={{ borderColor: "#E9E9E6" }}
          >
            {place.image ? (
              <div className="h-[150px] w-full overflow-hidden bg-[#F1F1EE]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-[150px] w-full items-center justify-center bg-[#F1F1EE]">
                <MapPin
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: "#9A9A94" }}
                />
              </div>
            )}

            <div className="p-4">
              <h3
                className="text-[15px] font-semibold leading-[1.4]"
                style={{ color: "#202020" }}
              >
                {place.name}
              </h3>

              {place.location && (
                <p
                  className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-[1.5]"
                  style={{ color: "#777770" }}
                >
                  <MapPin size={13} className="mt-[2px] shrink-0" />
                  {place.location}
                </p>
              )}

              {(place.rating !== undefined || place.duration) && (
                <div className="mt-2.5 flex items-center gap-3 text-[12px]">
                  {place.rating !== undefined && (
                    <span
                      className="flex items-center gap-1 font-medium"
                      style={{ color: "#333333" }}
                    >
                      <Star size={12} fill="currentColor" />
                      {place.rating}
                    </span>
                  )}

                  {place.duration && (
                    <span style={{ color: "#777770" }}>
                      {place.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {places.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-[#2563EB]"
          style={{ color: "#333333" }}
        >
          {expanded ? "Show fewer places" : "See more places"}
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </section>
  );
}

export default PlaceCards;