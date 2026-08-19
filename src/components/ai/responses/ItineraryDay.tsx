import { MapPin } from "lucide-react";

import type {
  ItineraryDayData,
  PlaceData,
} from "./AIResponse";

interface Props {
  data: ItineraryDayData;
}

export function ItineraryDay({ data }: Props) {
  return (
    <article
      className="w-full py-5 first:pt-2"
      style={{
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* DAY */}
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em]"
          style={{ color: "#777777" }}
        >
          Day {data.day}
        </span>

        <span
          className="h-px flex-1"
          style={{ backgroundColor: "#E6E6E6" }}
        />
      </div>

      {/* DAY TITLE */}
      <h3
        className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.025em]"
        style={{ color: "#171717" }}
      >
        {data.title}
      </h3>

      {data.subtitle && (
        <p
          className="mt-1.5 max-w-[780px] text-[14px] leading-[1.65]"
          style={{ color: "#666666" }}
        >
          {data.subtitle}
        </p>
      )}

      {/* ITINERARY */}
      {data.items?.length > 0 && (
        <div className="mt-5 max-w-[800px]">
          {data.items.map((item, index) => {
            const normalizedTitle = item.title
              .trim()
              .toLowerCase();

            const isCategory =
              normalizedTitle === "food recommendations" ||
              normalizedTitle === "food recommendation" ||
              normalizedTitle === "local tips" ||
              normalizedTitle === "local tip";

            return (
              <div
                key={`${data.day}-${index}-${item.title}`}
                className={
                  isCategory
                    ? "mb-3 last:mb-0"
                    : "mb-2.5 last:mb-0"
                }
              >
                {isCategory ? (
                  <>
                    <p
                      className="text-[13px] font-semibold leading-[1.6]"
                      style={{ color: "#303030" }}
                    >
                      {item.title}
                    </p>

                    {item.description && (
                      <p
                        className="mt-0.5 text-[14px] leading-[1.7]"
                        style={{ color: "#666666" }}
                      >
                        {item.description}
                      </p>
                    )}
                  </>
                ) : (
                  <p
                    className="text-[14.5px] leading-[1.7] tracking-[-0.005em]"
                    style={{ color: "#292929" }}
                  >
                    {item.time && (
                      <span
                        className="font-medium uppercase tracking-[0.04em]"
                        style={{ color: "#444444" }}
                      >
                        {item.time}
                        <span
                          className="mx-1.5 font-normal"
                          style={{ color: "#9A9A9A" }}
                        >
                          —
                        </span>
                      </span>
                    )}

                    <span>{item.title}</span>

                    {item.description && (
                      <>
                        {" "}
                        <span style={{ color: "#5F5F5F" }}>
                          {item.description}
                        </span>
                      </>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PLACES */}
      {data.places && data.places.length > 0 && (
        <div className="mt-5 w-full">
          <p
            className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.13em]"
            style={{ color: "#888888" }}
          >
            Places to explore
          </p>

          {/* Horizontal row on every screen */}
          <div
            className="
              flex
              w-full
              gap-3
              overflow-x-auto
              pb-1
              scrollbar-none
              sm:grid
              sm:grid-cols-3
              sm:overflow-visible
            "
          >
            {data.places.map((place) => (
              <PlaceImage
                key={place.id}
                place={place}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   PLACE IMAGE
   Image + name only
========================================================= */

function PlaceImage({
  place,
}: {
  place: PlaceData;
}) {
  return (
    <div
      className="
        w-[190px]
        shrink-0
        sm:w-full
      "
    >
      <div
        className="
          aspect-[4/3]
          w-full
          overflow-hidden
          rounded-[14px]
          bg-[#F1F1EF]
        "
      >
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              hover:scale-[1.02]
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MapPin
              size={20}
              strokeWidth={1.5}
              style={{ color: "#9A9A94" }}
            />
          </div>
        )}
      </div>

      <p
        className="
          mt-2
          truncate
          text-[13px]
          font-medium
          leading-[1.4]
        "
        style={{ color: "#242424" }}
        title={place.name}
      >
        {place.name}
      </p>
    </div>
  );
}

export default ItineraryDay;