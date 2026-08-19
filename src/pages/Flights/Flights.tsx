import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FlightSearch from "./FlightSearch";
import FlightResults from "./FlightResults";

import {
  flightService,
} from "../../services/flightService";

import type {
  FlightResult,
  FlightSearchRequest,
} from "../../types/flight";

export default function Flights() {
  const navigate = useNavigate();

  const [flights, setFlights] =
    useState<FlightResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const handleSearch = async (
    request: FlightSearchRequest
  ) => {
    setLoading(true);
    setSearched(true);

    try {
      const results =
        await flightService.searchFlights(
          request
        );

      setFlights(results);
    } catch (error) {
      console.error(
        "Flight search failed:",
        error
      );

      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f7f5]
        pb-20
      "
    >
      {/* HEADER */}

      <section
        className="
          border-b
          border-gray-200
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1180px]
            px-5
            pb-12
            pt-28
            sm:px-6
            lg:px-8
          "
        >
          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="
              flex
              items-center
              gap-2
              text-xs
              font-medium
              text-gray-500
              transition
              hover:text-gray-950
            "
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.8}
            />

            Back
          </button>

          <p
            className="
              mt-10
              text-[11px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            Elixway Flights
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-semibold
              tracking-[-0.045em]
              text-gray-950
              sm:text-5xl
            "
          >
            Find your next flight.
          </h1>

          <p
            className="
              mt-4
              max-w-[600px]
              text-sm
              leading-6
              text-gray-500
              sm:text-base
            "
          >
            Compare available flight
            options and choose the
            journey that works best
            for you.
          </p>

          {/* SEARCH */}

          <div className="mt-8">
            <FlightSearch
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        </div>
      </section>

      {/* RESULTS */}

      {searched && (
        <section
          className="
            mx-auto
            max-w-[900px]
            px-5
            pt-10
            sm:px-6
            lg:px-8
          "
        >
          {loading ? (
            <div
              className="
                rounded-[16px]
                border
                border-gray-200
                bg-white
                px-6
                py-20
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  h-7
                  w-7
                  animate-spin
                  rounded-full
                  border-2
                  border-gray-200
                  border-t-gray-950
                "
              />

              <p
                className="
                  mt-4
                  text-sm
                  text-gray-500
                "
              >
                Finding the best
                flights...
              </p>
            </div>
          ) : (
            <FlightResults
              flights={flights}
            />
          )}
        </section>
      )}
    </main>
  );
}