import {
  ArrowRight,
  Clock,
} from "lucide-react";

import type {
  FlightResult,
} from "../../types/flight";

interface FlightCardProps {
  flight: FlightResult;
}

export default function FlightCard({
  flight,
}: FlightCardProps) {
  const handleBook = () => {
    if (!flight.bookingUrl) {
      return;
    }

    window.open(
      flight.bookingUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <article
      className="
        overflow-hidden
        rounded-[16px]
        border
        border-gray-200
        bg-white
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          p-5
          sm:p-6
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            {flight.logo ? (
              <img
                src={flight.logo}
                alt=""
                className="
                  h-9
                  w-9
                  object-contain
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-xs
                  font-semibold
                "
              >
                {flight.airlineCode ||
                  "FL"}
              </div>
            )}

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-950
                "
              >
                {flight.airline}
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-gray-400
                "
              >
                {flight.provider}
              </p>
            </div>
          </div>

          <div
            className="
              text-right
            "
          >
            <p
              className="
                text-lg
                font-semibold
                tracking-tight
                text-gray-950
              "
            >
              {flight.currency}{" "}
              {flight.price.toLocaleString()}
            </p>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              total price
            </p>
          </div>
        </div>

        {/* ROUTE */}

        <div
          className="
            mt-6
            grid
            grid-cols-[1fr_auto_1fr]
            items-center
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xl
                font-semibold
                tracking-tight
                text-gray-950
              "
            >
              {
                flight.segments[0]
                  ?.departureCode
              }
            </p>

            <p
              className="
                mt-1
                text-xs
                text-gray-500
              "
            >
              {
                flight.segments[0]
                  ?.departureTime
              }
            </p>
          </div>

          <div
            className="
              flex
              min-w-[120px]
              flex-col
              items-center
            "
          >
            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              {flight.totalDuration}
            </p>

            <div
              className="
                my-2
                flex
                w-full
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-gray-950
                "
              />

              <div
                className="
                  h-px
                  flex-1
                  bg-gray-300
                "
              />

              <ArrowRight
                size={15}
                strokeWidth={1.5}
              />
            </div>

            <p
              className="
                text-[11px]
                text-gray-400
              "
            >
              {flight.stops === 0
                ? "Non-stop"
                : `${flight.stops} stop${
                    flight.stops > 1
                      ? "s"
                      : ""
                  }`}
            </p>
          </div>

          <div
            className="
              text-right
            "
          >
            <p
              className="
                text-xl
                font-semibold
                tracking-tight
                text-gray-950
              "
            >
              {
                flight.segments[
                  flight.segments.length - 1
                ]?.arrivalCode
              }
            </p>

            <p
              className="
                mt-1
                text-xs
                text-gray-500
              "
            >
              {
                flight.segments[
                  flight.segments.length - 1
                ]?.arrivalTime
              }
            </p>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-gray-100
            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-500
            "
          >
            <Clock
              size={14}
              strokeWidth={1.7}
            />

            {flight.totalDuration}
          </div>

          <button
            type="button"
            onClick={handleBook}
            disabled={!flight.bookingUrl}
            className="
              flex
              items-center
              gap-2
              rounded-[9px]
              bg-gray-950
              px-5
              py-2.5
              text-xs
              font-medium
              text-white
              transition
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Book Flight

            <ArrowRight
              size={15}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>
    </article>
  );
}