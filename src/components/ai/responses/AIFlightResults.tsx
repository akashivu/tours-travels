import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  AIFlightSearchRequest,
} from "../../../types/ai";

import {
  openAIFlightSearch,
} from "../../../services/aiFlightSearchService";

interface AIFlightResultsProps {
  request: AIFlightSearchRequest;
}

export default function AIFlightResults({
  request,
}: AIFlightResultsProps) {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Resolve airports and build the flight results URL.
      const url = await openAIFlightSearch(request);

      // Navigate inside the React application.
      navigate(url);
    } catch (err) {
      setLoading(false);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to prepare flight search.",
      );
    }
  };

  return (
    <div
      className="
        mt-4
        w-full
        rounded-2xl
        border
        border-[#e4e7ec]
        bg-white
        p-5
      "
    >
      <div>
        <p className="text-sm font-semibold text-[#101828]">
          Flight search ready
        </p>

        <p className="mt-1 text-xs text-[#667085]">
          I found the details for your flight search.
        </p>
      </div>

      <div
        className="
          mt-4
          rounded-xl
          border
          border-[#eaecf0]
          bg-[#f9fafb]
          p-4
        "
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
              From
            </p>

            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {request.origin}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
              To
            </p>

            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {request.destination}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
              Departure
            </p>

            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {request.departure_date}
            </p>
          </div>

          {request.return_date && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
                Return
              </p>

              <p className="mt-1 text-sm font-semibold text-[#101828]">
                {request.return_date}
              </p>
            </div>
          )}

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
              Passengers
            </p>

            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {request.passengers ?? 1}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#667085]">
              Trip
            </p>

            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {request.trip_type === "roundtrip"
                ? "Round trip"
                : "One way"}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-[#fecdca]
            bg-[#fef3f2]
            px-3
            py-2.5
            text-xs
            text-[#b42318]
          "
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSearch}
        disabled={loading}
        className="
          mt-4
          w-full
          rounded-xl
          bg-black
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[#222222]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Preparing search..."
          : "Search flights"}
      </button>
    </div>
  );
}