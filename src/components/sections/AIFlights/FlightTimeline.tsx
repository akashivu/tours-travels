interface FlightTimelineProps {
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
}

const FlightTimeline = ({
  departure,
  arrival,
  duration,
  stops,
}: FlightTimelineProps) => {
  return (
    <div className="min-w-0 flex-1">

      <div className="flex items-center gap-3">

        {/* Departure */}

        <div className="w-[52px] shrink-0">
          <p className="text-lg font-semibold tracking-[-0.03em] text-gray-950">
            {departure}
          </p>
        </div>

        {/* Timeline */}

        <div className="flex min-w-[100px] flex-1 items-center gap-2">

          <span className="h-2 w-2 shrink-0 rounded-full bg-gray-950" />

          <div className="relative h-px flex-1 bg-gray-300">

            <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-950">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 13L21 7L16 12L21 17L3 13Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>

          <span className="h-2 w-2 shrink-0 rounded-full bg-gray-950" />

        </div>

        {/* Arrival */}

        <div className="w-[52px] shrink-0 text-right">
          <p className="text-lg font-semibold tracking-[-0.03em] text-gray-950">
            {arrival}
          </p>
        </div>

      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400">

        <span>{duration}</span>

        <span>·</span>

        <span>{stops}</span>

      </div>

    </div>
  );
};

export default FlightTimeline;