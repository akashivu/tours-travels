import Section from "../../ui/Section";
import Container from "../../ui/Container";

import FlightCard from "./FlightCard";
import { FLIGHTS } from "./flights.constants";

const AIFlights = () => {
  return (
    <Section className="overflow-hidden bg-[#f8f8f7] py-20 lg:py-24">
      <Container>

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

          <div className="max-w-xl">

            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
              AI Flights
            </p>

            <h2 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-gray-950 sm:text-5xl">
              Get there without
              <br />
              the guesswork
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500">
              Compare routes, timings and prices
              and choose the flight that fits your
              journey.
            </p>

          </div>

          {/* Search summary */}

          <div className="rounded-[18px] border border-gray-200 bg-white px-5 py-4 shadow-[0_6px_25px_rgba(0,0,0,0.04)]">

            <div className="flex items-center gap-5">

              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                  From
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-950">
                  Bengaluru
                </p>

                <p className="text-[10px] text-gray-400">
                  BLR
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500">
                →
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                  To
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-950">
                  Dubai
                </p>

                <p className="text-[10px] text-gray-400">
                  DXB
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            AI PROMPT
        ========================================== */}

        <div className="mt-10 flex flex-col gap-4 rounded-[22px] border border-gray-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm text-white">
              ✦
            </span>

            <p className="text-sm text-gray-700">
              Find the best flight from Bengaluru
              to Dubai under ₹20,000
            </p>

          </div>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-gray-950 px-5 text-xs font-medium text-white transition hover:bg-gray-800"
          >
            Search flights

            <span>→</span>
          </button>

        </div>

        {/* =========================================
            FLIGHT RESULTS
        ========================================== */}

        <div className="mt-5 space-y-3">

          {FLIGHTS.map(
            (flight, index) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={index}
              />
            ),
          )}

        </div>

        {/* =========================================
            FOOTER
        ========================================== */}

        <div className="mt-6 flex items-center justify-between">

          <p className="text-xs text-gray-400">
            Showing flights that match your
            preferences
          </p>

          <button
            type="button"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-950"
          >
            View all flights

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>

      </Container>
    </Section>
  );
};

export default AIFlights;