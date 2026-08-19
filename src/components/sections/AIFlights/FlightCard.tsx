import FlightTimeline from "./FlightTimeline";
import type { Flight } from "./flights.constants";

interface FlightCardProps {
  flight: Flight;
  index: number;
}

const FlightCard = ({
  flight,
  index,
}: FlightCardProps) => {
  return (
    <article
      className="ai-flight-card rounded-[22px] border border-gray-200 bg-white p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_14px_35px_rgba(0,0,0,0.06)]"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center gap-5">

        {/* Airline */}

        <div className="flex w-[115px] shrink-0 items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-xs font-semibold text-white">
            {flight.airlineCode}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-950">
              {flight.airline}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              {flight.date}
            </p>
          </div>

        </div>

        {/* Route */}

        <FlightTimeline
          departure={flight.departure}
          arrival={flight.arrival}
          duration={flight.duration}
          stops={flight.stops}
        />

        {/* Price */}

        <div className="w-[105px] shrink-0 text-right">

          <p className="text-lg font-semibold tracking-[-0.03em] text-gray-950">
            {flight.price}
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400">
            per passenger
          </p>

        </div>

        {/* Select */}

        <button
          type="button"
          className="flex h-10 shrink-0 items-center justify-center rounded-full bg-gray-950 px-4 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          Select
        </button>

      </div>
    </article>
  );
};

export default FlightCard;