import { useState } from "react";
import {
  Calendar,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import type {
  FlightSearchRequest,
} from "../../types/flight";

interface FlightSearchProps {
  onSearch: (
    request: FlightSearchRequest
  ) => void;

  loading?: boolean;
}

export default function FlightSearch({
  onSearch,
  loading = false,
}: FlightSearchProps) {
  const [tripType, setTripType] =
    useState<
      "roundtrip" | "oneway"
    >("roundtrip");

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [departureDate, setDepartureDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [adults, setAdults] =
    useState(1);

  const [children] = useState(0);

const [infants] = useState(0);

  const [cabinClass, setCabinClass] =
    useState<
      "economy" |
      "premium_economy" |
      "business" |
      "first"
    >("economy");

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (
      !origin.trim() ||
      !destination.trim()
    ) {
      return;
    }

    if (!departureDate) {
      return;
    }

    if (
      tripType === "roundtrip" &&
      !returnDate
    ) {
      return;
    }

    onSearch({
      origin,
      destination,
      departureDate,
      returnDate:
        tripType === "roundtrip"
          ? returnDate
          : undefined,
      adults,
      children,
      infants,
      tripType,
      cabinClass,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-[18px]
        border
        border-gray-200
        bg-white
        p-5
        shadow-[0_18px_50px_rgba(0,0,0,0.08)]
        sm:p-6
      "
    >
      {/* ============================================
          TRIP TYPE
      ============================================ */}

      <div
        className="
          flex
          items-center
          gap-6
          border-b
          border-gray-100
          pb-5
        "
      >
        <button
          type="button"
          onClick={() =>
            setTripType("roundtrip")
          }
          className={`
            text-sm
            font-medium
            transition
            ${
              tripType === "roundtrip"
                ? "text-gray-950"
                : "text-gray-400"
            }
          `}
        >
          Round trip
        </button>

        <button
          type="button"
          onClick={() =>
            setTripType("oneway")
          }
          className={`
            text-sm
            font-medium
            transition
            ${
              tripType === "oneway"
                ? "text-gray-950"
                : "text-gray-400"
            }
          `}
        >
          One way
        </button>
      </div>

      {/* ============================================
          SEARCH FIELDS
      ============================================ */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-3
          lg:grid-cols-[1fr_1fr_1fr_1fr]
        "
      >
        {/* FROM */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            From
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <MapPin
              size={18}
              strokeWidth={1.8}
            />

            <input
              value={origin}
              onChange={(event) =>
                setOrigin(
                  event.target.value
                )
              }
              placeholder="Bengaluru"
              className="
                w-full
                border-0
                bg-transparent
                text-sm
                font-medium
                text-gray-950
                outline-none
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* TO */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            To
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <MapPin
              size={18}
              strokeWidth={1.8}
            />

            <input
              value={destination}
              onChange={(event) =>
                setDestination(
                  event.target.value
                )
              }
              placeholder="Dubai"
              className="
                w-full
                border-0
                bg-transparent
                text-sm
                font-medium
                text-gray-950
                outline-none
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* DEPARTURE */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            Departure
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <Calendar
              size={18}
              strokeWidth={1.8}
            />

            <input
              type="date"
              value={departureDate}
              onChange={(event) =>
                setDepartureDate(
                  event.target.value
                )
              }
              className="
                w-full
                border-0
                bg-transparent
                text-sm
                font-medium
                text-gray-950
                outline-none
              "
            />
          </div>
        </div>

        {/* RETURN */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            Return
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <Calendar
              size={18}
              strokeWidth={1.8}
            />

            <input
              type="date"
              value={returnDate}
              disabled={
                tripType === "oneway"
              }
              onChange={(event) =>
                setReturnDate(
                  event.target.value
                )
              }
              className="
                w-full
                border-0
                bg-transparent
                text-sm
                font-medium
                text-gray-950
                outline-none
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            />
          </div>
        </div>
      </div>

      {/* ============================================
          PASSENGERS + CABIN
      ============================================ */}

      <div
        className="
          mt-3
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
      >
        {/* PASSENGERS */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            Travelers
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              gap-3
            "
          >
            <Users
              size={18}
              strokeWidth={1.8}
            />

            <div
              className="
                flex
                items-center
                gap-3
                text-sm
              "
            >
              <span>
                {adults} Adult
                {adults !== 1
                  ? "s"
                  : ""}
              </span>

              <button
                type="button"
                onClick={() =>
                  setAdults(
                    Math.max(
                      1,
                      adults - 1
                    )
                  )
                }
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                "
              >
                −
              </button>

              <button
                type="button"
                onClick={() =>
                  setAdults(
                    adults + 1
                  )
                }
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                "
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* CABIN */}

        <div
          className="
            rounded-[10px]
            border
            border-gray-200
            px-4
            py-3
          "
        >
          <label
            className="
              block
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-gray-400
            "
          >
            Cabin
          </label>

          <select
            value={cabinClass}
            onChange={(event) =>
              setCabinClass(
                event.target
                  .value as typeof cabinClass
              )
            }
            className="
              mt-2
              w-full
              border-0
              bg-transparent
              text-sm
              font-medium
              text-gray-950
              outline-none
            "
          >
            <option value="economy">
              Economy
            </option>

            <option value="premium_economy">
              Premium Economy
            </option>

            <option value="business">
              Business
            </option>

            <option value="first">
              First Class
            </option>
          </select>
        </div>
      </div>

      {/* ============================================
          SEARCH BUTTON
      ============================================ */}

      <button
        type="submit"
        disabled={loading}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-[10px]
          bg-gray-950
          px-6
          py-4
          text-sm
          font-medium
          text-white
          transition
          duration-300
          hover:bg-gray-800
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Search
          size={18}
          strokeWidth={1.8}
        />

        {loading
          ? "Searching flights..."
          : "Search Flights"}
      </button>
    </form>
  );
}