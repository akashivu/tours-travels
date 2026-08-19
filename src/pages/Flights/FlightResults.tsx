import {
  ArrowRight,
  Clock,
  Plane,
} from "lucide-react";

import type { FlightResult } from "../../types/flight";

type FlightResultsProps = {
  flights: FlightResult[];
};

export default function FlightResults({
  flights,
}: FlightResultsProps) {
  if (!flights.length) {
    return (
      <div
        className="
          mt-6
          rounded-[12px]
          border
          border-gray-200
          bg-gray-50
          p-8
          text-center
        "
      >
        <Plane
          size={28}
          className="mx-auto text-gray-400"
        />

        <p
          className="
            mt-3
            text-sm
            font-medium
            text-gray-950
          "
        >
          No flights found
        </p>

        <p
          className="
            mt-1
            text-xs
            text-gray-500
          "
        >
          Try changing your dates or destination.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h3
            className="
              text-base
              font-semibold
              tracking-tight
              text-gray-950
            "
          >
            Available flights
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-gray-500
            "
          >
            Compare available options
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-gray-100
            px-3
            py-1
            text-xs
            font-medium
            text-gray-600
          "
        >
          {flights.length} flights
        </span>
      </div>

      {flights.map((flight) => {
        const departureSegment = flight.segments[0];
        const arrivalSegment =
          flight.segments[flight.segments.length - 1];

        return (
          <div
            key={flight.id}
            className="
              rounded-[12px]
              border
              border-gray-200
              bg-white
              p-5
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-gray-300
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]
            "
          >
            <div
              className="
                grid
                gap-5
                lg:grid-cols-[180px_1fr_170px]
                lg:items-center
              "
            >
              {/* Airline */}

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[10px]
                    bg-gray-100
                  "
                >
                  {flight.logo ? (
                    <img
                      src={flight.logo}
                      alt={flight.airline}
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <Plane
                      size={20}
                      strokeWidth={1.8}
                    />
                  )}
                </div>

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

                  {flight.airlineCode && (
                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-gray-500
                      "
                    >
                      {flight.airlineCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Journey */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  {/* Departure */}

                  <div>
                    <p
                      className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-950
                      "
                    >
                      {departureSegment?.departureTime ?? "--"}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-medium
                        text-gray-500
                      "
                    >
                      {departureSegment?.departureCode ?? "--"}
                    </p>
                  </div>

                  {/* Journey Line */}

                  <div
                    className="
                      flex
                      min-w-[90px]
                      flex-1
                      items-center
                      gap-2
                    "
                  >
                    <div
                      className="
                        h-px
                        flex-1
                        bg-gray-200
                      "
                    />

                    <Clock
                      size={14}
                      className="
                        shrink-0
                        text-gray-400
                      "
                    />

                    <div
                      className="
                        h-px
                        flex-1
                        bg-gray-200
                      "
                    />
                  </div>

                  {/* Arrival */}

                  <div>
                    <p
                      className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-gray-950
                      "
                    >
                      {arrivalSegment?.arrivalTime ?? "--"}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-medium
                        text-gray-500
                      "
                    >
                      {arrivalSegment?.arrivalCode ?? "--"}
                    </p>
                  </div>
                </div>

                {/* Flight Details */}

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    text-xs
                    text-gray-500
                  "
                >
                  <span>
                    {flight.totalDuration}
                  </span>

                  <span>•</span>

                  <span>
                    {flight.stops === 0
                      ? "Non-stop"
                      : `${flight.stops} stop${
                          flight.stops > 1 ? "s" : ""
                        }`}
                  </span>
                </div>
              </div>

              {/* Price */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  lg:flex-col
                  lg:items-end
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
                    {flight.currency}{" "}
                    {flight.price.toLocaleString("en-IN")}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-gray-400
                    "
                  >
                    per traveler
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (flight.bookingUrl) {
                      window.location.href =
                        flight.bookingUrl;
                    }
                  }}
                  disabled={!flight.bookingUrl}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-gray-950
                    px-5
                    py-2.5
                    text-xs
                    font-medium
                    text-white
                    transition
                    duration-300
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Book

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}