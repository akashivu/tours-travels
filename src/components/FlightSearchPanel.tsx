import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  searchAirportsLive,
  type Airport,
} from "../services/airportService";

type TripType = "oneway" | "roundtrip";

type FlightSearchData = {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  tripType: TripType;
};

type FlightSearchPanelProps = {
  isLoggedIn?: boolean;
  onSearch?: (
    data: FlightSearchData
  ) => void | Promise<void>;
  onSignIn?: () => void;
};

type DatePickerMode =
  | "departure"
  | "return";

type PassengerType =
  | "adults"
  | "children"
  | "infants";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

/* =========================================================
   DATE HELPERS
========================================================= */

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dateToISO(date: Date) {
  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
}

function parseISODate(value: string) {
  if (!value) {
    return null;
  }

  const [year, month, day] =
    value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(
    year,
    month - 1,
    day
  );
}

function formatDisplayDate(
  value: string
) {
  const date = parseISODate(value);

  if (!date) {
    return "";
  }

  return `${pad(
    date.getDate()
  )} ${MONTHS[date.getMonth()].slice(
    0,
    3
  )} ${date.getFullYear()}`;
}

function formatTravelpayoutsDate(
  value: string
) {
  const date = parseISODate(value);

  if (!date) {
    return "";
  }

  return `${pad(
    date.getDate()
  )}${pad(date.getMonth() + 1)}`;
}

function isBeforeDate(
  first: Date,
  second: Date
) {
  const a = new Date(first);
  const b = new Date(second);

  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);

  return a.getTime() < b.getTime();
}

function getCalendarDays(
  year: number,
  month: number
) {
  const firstDay =
    new Date(year, month, 1).getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const days: Array<
    Date | null
  > = [];

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    days.push(
      new Date(year, month, day)
    );
  }

  return days;
}

/* =========================================================
   TRAVELPAYOUTS SEARCH CODE
========================================================= */

function buildFlightSearchCode({
  from,
  to,
  departureDate,
  returnDate,
  passengers,
  tripType,
}: {
  from: Airport;
  to: Airport;
  departureDate: string;
  returnDate: string;
  passengers: number;
  tripType: TripType;
}) {
  const departure =
    formatTravelpayoutsDate(
      departureDate
    );

  let code =
    `${from.code}${departure}${to.code}`;

  if (
    tripType === "roundtrip" &&
    returnDate
  ) {
    const returnCode =
      formatTravelpayoutsDate(
        returnDate
      );

    code +=
      `${returnCode}${from.code}`;
  }

  code += String(passengers);

  return code;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FlightSearchPanel({
  isLoggedIn: _isLoggedIn,
  onSearch,
  onSignIn: _onSignIn,
}: FlightSearchPanelProps) {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const today = useMemo(
    () => new Date(),
    []
  );

  /* =======================================================
     AIRPORT STATE
  ======================================================= */

  const [from, setFrom] =
    useState<Airport | null>(null);

  const [to, setTo] =
    useState<Airport | null>(null);

  const [fromText, setFromText] =
    useState("");

  const [toText, setToText] =
    useState("");

  const [fromOpen, setFromOpen] =
    useState(false);

  const [toOpen, setToOpen] =
    useState(false);

  const [fromLoading, setFromLoading] =
    useState(false);

  const [toLoading, setToLoading] =
    useState(false);

  const [fromSuggestions, setFromSuggestions] =
    useState<Airport[]>([]);

  const [toSuggestions, setToSuggestions] =
    useState<Airport[]>([]);

  const fromSearchController =
    useRef<AbortController | null>(
      null
    );

  const toSearchController =
    useRef<AbortController | null>(
      null
    );

  /* =======================================================
     TRIP STATE
  ======================================================= */

  const [tripType, setTripType] =
    useState<TripType>("roundtrip");

  /* =======================================================
     DATE STATE
  ======================================================= */

  const [departureDate, setDepartureDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [datePickerOpen, setDatePickerOpen] =
    useState(false);

  const [datePickerMode, setDatePickerMode] =
    useState<DatePickerMode>(
      "departure"
    );

  const [calendarMonth, setCalendarMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  /* =======================================================
     PASSENGER STATE
  ======================================================= */

  const [adults, setAdults] =
    useState(1);

  const [children, setChildren] =
    useState(0);

  const [infants, setInfants] =
    useState(0);

  const [passengerOpen, setPassengerOpen] =
    useState(false);

  /* =======================================================
     ERROR
  ======================================================= */

  const [error, setError] =
    useState("");

  /* =======================================================
     POPUP REF
  ======================================================= */

  const popupRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     CALENDAR
  ======================================================= */

  const calendarDays =
    getCalendarDays(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth()
    );

  /* =======================================================
     TOTAL PASSENGERS
  ======================================================= */

  const totalPassengers =
    adults +
    children +
    infants;

  const passengerLabel =
    totalPassengers === 1
      ? "1 Passenger"
      : `${totalPassengers} Passengers`;

  /* =======================================================
     OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        popupRef.current &&
        !popupRef.current.contains(target)
      ) {
        setFromOpen(false);
        setToOpen(false);
        setDatePickerOpen(false);
        setPassengerOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     CLEANUP ABORT CONTROLLERS
  ======================================================= */

  useEffect(() => {
    return () => {
      fromSearchController.current?.abort();
      toSearchController.current?.abort();
    };
  }, []);

  /* =======================================================
     LIVE AIRPORT SEARCH
  ======================================================= */

  const searchAirportSuggestions = async (
    value: string,
    type: "from" | "to"
  ) => {
    const query = value.trim();

    const controller =
      new AbortController();

    if (type === "from") {
      fromSearchController.current?.abort();

      fromSearchController.current =
        controller;

      if (query.length < 2) {
        setFromSuggestions([]);
        setFromLoading(false);
        return;
      }

      setFromLoading(true);
    } else {
      toSearchController.current?.abort();

      toSearchController.current =
        controller;

      if (query.length < 2) {
        setToSuggestions([]);
        setToLoading(false);
        return;
      }

      setToLoading(true);
    }

    try {
      const results =
        await searchAirportsLive(
          query,
          controller.signal
        );

      if (type === "from") {
        setFromSuggestions(results);
      } else {
        setToSuggestions(results);
      }
    } catch (searchError) {
      if (
        searchError instanceof
          DOMException &&
        searchError.name ===
          "AbortError"
      ) {
        return;
      }

      console.error(
        "[Elixway] Airport autocomplete error:",
        searchError
      );

      if (type === "from") {
        setFromSuggestions([]);
      } else {
        setToSuggestions([]);
      }
    } finally {
      if (!controller.signal.aborted) {
        if (type === "from") {
          setFromLoading(false);
        } else {
          setToLoading(false);
        }
      }
    }
  };

  /* =======================================================
     SELECT FROM
  ======================================================= */

  const selectFrom = (
    airport: Airport
  ) => {
    setFrom(airport);

    setFromText(
      airport.type === "airport"
        ? `${airport.city} (${airport.code})`
        : `${airport.city} (${airport.code})`
    );

    setFromOpen(false);
    setFromSuggestions([]);
    setError("");
  };

  /* =======================================================
     SELECT TO
  ======================================================= */

  const selectTo = (
    airport: Airport
  ) => {
    setTo(airport);

    setToText(
      airport.type === "airport"
        ? `${airport.city} (${airport.code})`
        : `${airport.city} (${airport.code})`
    );

    setToOpen(false);
    setToSuggestions([]);
    setError("");
  };

  /* =======================================================
     SWAP
  ======================================================= */

  const handleSwap = () => {
    const oldFrom = from;
    const oldTo = to;

    setFrom(oldTo);
    setTo(oldFrom);

    setFromText(
      oldTo
        ? `${oldTo.city} (${oldTo.code})`
        : ""
    );

    setToText(
      oldFrom
        ? `${oldFrom.city} (${oldFrom.code})`
        : ""
    );

    setError("");
  };

  /* =======================================================
     TRIP TYPE
  ======================================================= */

  const handleTripTypeChange = (
    type: TripType
  ) => {
    setTripType(type);

    if (type === "oneway") {
      setReturnDate("");
    }

    setError("");
  };

  /* =======================================================
     OPEN DATE PICKER
  ======================================================= */

  const openDatePicker = (
    mode: DatePickerMode
  ) => {
    setDatePickerMode(mode);

    setFromOpen(false);
    setToOpen(false);
    setPassengerOpen(false);
    setError("");

    const selected =
      mode === "departure"
        ? departureDate
        : returnDate;

    const selectedDate =
      parseISODate(selected);

    if (selectedDate) {
      setCalendarMonth(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        )
      );
    } else if (
      mode === "return" &&
      departureDate
    ) {
      const departure =
        parseISODate(departureDate);

      if (departure) {
        setCalendarMonth(
          new Date(
            departure.getFullYear(),
            departure.getMonth(),
            1
          )
        );
      }
    } else {
      setCalendarMonth(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )
      );
    }

    setDatePickerOpen(true);
  };

  /* =======================================================
     DATE SELECT
  ======================================================= */

  const handleDateSelect = (
    date: Date
  ) => {
    const selected =
      dateToISO(date);

    if (
      datePickerMode === "departure"
    ) {
      setDepartureDate(selected);

      if (
        returnDate &&
        returnDate < selected
      ) {
        setReturnDate("");
      }

      if (tripType === "roundtrip") {
        setDatePickerMode("return");

        setCalendarMonth(
          new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          )
        );
      } else {
        setDatePickerOpen(false);
      }

      setError("");
      return;
    }

    if (
      datePickerMode === "return"
    ) {
      if (
        departureDate &&
        selected < departureDate
      ) {
        setError(
          "Return date cannot be before departure date."
        );
        return;
      }

      setReturnDate(selected);
      setDatePickerOpen(false);
      setError("");
    }
  };

  /* =======================================================
     MONTH NAVIGATION
  ======================================================= */

  const previousMonth = () => {
    const minimumMonth =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );

    const previous =
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() - 1,
        1
      );

    if (
      previous.getTime() <
      minimumMonth.getTime()
    ) {
      return;
    }

    setCalendarMonth(previous);
  };

  const nextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1
      )
    );
  };

  /* =======================================================
     PASSENGER UPDATE
  ======================================================= */

  const updatePassenger = (
    type: PassengerType,
    direction:
      | "increase"
      | "decrease"
  ) => {
    setError("");

    if (direction === "increase") {
      if (totalPassengers >= 9) {
        return;
      }

      if (type === "adults") {
        setAdults(
          (value) => value + 1
        );
        return;
      }

      if (type === "children") {
        setChildren(
          (value) => value + 1
        );
        return;
      }

      if (type === "infants") {
        if (infants >= adults) {
          return;
        }

        setInfants(
          (value) => value + 1
        );
      }

      return;
    }

    if (type === "adults") {
      if (adults <= 1) {
        return;
      }

      if (
        adults - 1 <
        infants
      ) {
        return;
      }

      setAdults(
        (value) => value - 1
      );
    }

    if (type === "children") {
      if (children <= 0) {
        return;
      }

      setChildren(
        (value) => value - 1
      );
    }

    if (type === "infants") {
      if (infants <= 0) {
        return;
      }

      setInfants(
        (value) => value - 1
      );
    }
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    /*
     * Important:
     * User must select an actual
     * autocomplete result.
     */
    if (!from) {
      setError(
        "Please select a departure airport from the suggestions."
      );
      return;
    }

    if (!to) {
      setError(
        "Please select an arrival airport from the suggestions."
      );
      return;
    }

    if (from.code === to.code) {
      setError(
        "Departure and arrival airports cannot be the same."
      );
      return;
    }

    if (!departureDate) {
      setError(
        "Please select a departure date."
      );
      return;
    }

    if (
      tripType === "roundtrip" &&
      !returnDate
    ) {
      setError(
        "Please select a return date."
      );
      return;
    }

    if (
      tripType === "roundtrip" &&
      returnDate < departureDate
    ) {
      setError(
        "Return date cannot be before departure date."
      );
      return;
    }

    const flightSearch =
      buildFlightSearchCode({
        from,
        to,
        departureDate,
        returnDate,
        passengers:
          totalPassengers,
        tripType,
      });

    const params =
      new URLSearchParams();

    params.set(
      "flightSearch",
      flightSearch
    );

    params.set(
      "destination_airports",
      "0"
    );

    if (onSearch) {
      await onSearch({
        from: from.code,
        to: to.code,
        departureDate,
        returnDate,
        passengers:
          totalPassengers,
        tripType,
      });
    }

    /*
     * Keep your existing working
     * results navigation.
     */
    navigate(
      `/flights?${params.toString()}`
    );
  };

  /* =======================================================
     DISPLAY
  ======================================================= */

  const departureDisplay =
    departureDate
      ? formatDisplayDate(
          departureDate
        )
      : "Select date";

  const returnDisplay =
    returnDate
      ? formatDisplayDate(
          returnDate
        )
      : "Select date";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="w-full">
      {/* ===================================================
          TRIP TYPE — flat text, no pills
      =================================================== */}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
  {/* Trip type */}
  <div className="flex items-center gap-x-5">
    <button
      type="button"
      onClick={() => handleTripTypeChange("roundtrip")}
      className={`text-[13.5px] font-semibold transition-colors ${
        tripType === "roundtrip"
          ? "text-[#101828]"
          : "text-[#98a2b3] hover:text-[#475467]"
      }`}
    >
      Round trip
    </button>

    <button
      type="button"
      onClick={() => handleTripTypeChange("oneway")}
      className={`text-[13.5px] font-semibold transition-colors ${
        tripType === "oneway"
          ? "text-[#101828]"
          : "text-[#98a2b3] hover:text-[#475467]"
      }`}
    >
      One way
    </button>
  </div>

  {/* Domestic & International */}
  <div className="flex items-center gap-2 text-[14.5px] font-medium text-[#667085]">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-50 text-[11px] text-orange-500">
      ✈
    </span>

    <span>
      Book <span className="font-semibold text-[#344054]">Domestic</span>
      <span className="mx-1 text-[#98a2b3]">&</span>
      <span className="font-semibold text-[#344054]">International</span>
      {" "}Flights
    </span>
  </div>
</div>

      {/* ===================================================
          SEARCH FORM
      =================================================== */}

      <form onSubmit={handleSearch} noValidate>
        {/* =================================================
            SINGLE WHITE BAR WITH DIVIDERS
        ================================================= */}

        <div className="relative w-full rounded-2xl border border-[#e4e7ec] bg-white lg:pr-[160px]">
          <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
            {/* ===============================================
                FROM
            =============================================== */}

            <div className="relative flex min-w-0 flex-1 flex-col justify-center px-5 py-3.5 lg:py-4">
              <label
                htmlFor="flight-from"
                className="text-[11px] font-medium text-[#98a2b3]"
              >
                From
              </label>

              <input
                id="flight-from"
                type="text"
                value={fromText}
                placeholder="City or airport"
                autoComplete="off"
                onFocus={() => {
                  setFromOpen(true);
                  setToOpen(false);
                  setDatePickerOpen(false);
                  setPassengerOpen(false);

                  if (fromText.trim().length >= 2) {
                    void searchAirportSuggestions(
                      fromText,
                      "from"
                    );
                  }
                }}
                onChange={(event) => {
                  const value = event.target.value;

                  setFromText(value);
                  setFrom(null);
                  setFromOpen(true);
                  setError("");

                  void searchAirportSuggestions(
                    value,
                    "from"
                  );
                }}
                className="mt-0.5 h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none placeholder:font-normal placeholder:text-[#98a2b3] focus:ring-0"
              />

              {fromOpen && (
                <>
                  {fromLoading && <LoadingDropdown />}

                  {!fromLoading &&
                    fromSuggestions.length > 0 && (
                      <AirportDropdown
                        airports={fromSuggestions}
                        onSelect={selectFrom}
                      />
                    )}

                  {!fromLoading &&
                    fromText.trim().length >= 2 &&
                    fromSuggestions.length === 0 && (
                      <EmptyDropdown />
                    )}
                </>
              )}
            </div>

            {/* ===============================================
                TO (swap button sits on the shared edge)
            =============================================== */}

            <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
              <label
                htmlFor="flight-to"
                className="text-[11px] font-medium text-[#98a2b3]"
              >
                To
              </label>

              <input
                id="flight-to"
                type="text"
                value={toText}
                placeholder="City or airport"
                autoComplete="off"
                onFocus={() => {
                  setToOpen(true);
                  setFromOpen(false);
                  setDatePickerOpen(false);
                  setPassengerOpen(false);

                  if (toText.trim().length >= 2) {
                    void searchAirportSuggestions(
                      toText,
                      "to"
                    );
                  }
                }}
                onChange={(event) => {
                  const value = event.target.value;

                  setToText(value);
                  setTo(null);
                  setToOpen(true);
                  setError("");

                  void searchAirportSuggestions(
                    value,
                    "to"
                  );
                }}
                className="mt-0.5 h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none placeholder:font-normal placeholder:text-[#98a2b3] focus:ring-0"
              />

              <button
                type="button"
                aria-label="Swap airports"
                onClick={handleSwap}
                className="absolute -left-4 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7ec] bg-white text-[15px] text-[#475467] transition-all duration-200 hover:border-[#98a2b3] hover:text-[#101828] lg:flex"
              >
                ⇄
              </button>

              {toOpen && (
                <>
                  {toLoading && <LoadingDropdown />}

                  {!toLoading &&
                    toSuggestions.length > 0 && (
                      <AirportDropdown
                        airports={toSuggestions}
                        onSelect={selectTo}
                      />
                    )}

                  {!toLoading &&
                    toText.trim().length >= 2 &&
                    toSuggestions.length === 0 && (
                      <EmptyDropdown />
                    )}
                </>
              )}
            </div>

            {/* ===============================================
                DEPARTURE
            =============================================== */}

            <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
              <label className="text-[11px] font-medium text-[#98a2b3]">
                Departure
              </label>

              <button
                type="button"
                onClick={() => openDatePicker("departure")}
                className="mt-0.5 flex h-[25px] w-full items-center justify-between border-0 bg-transparent p-0 text-left outline-none"
              >
                <span
                  className={
                    departureDate
                      ? "truncate text-[15px] font-semibold text-[#101828]"
                      : "truncate text-[15px] text-[#98a2b3]"
                  }
                >
                  {departureDisplay}
                </span>
              </button>
            </div>

            {/* ===============================================
                RETURN
            =============================================== */}

            <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
              <label className="text-[11px] font-medium text-[#98a2b3]">
                Return
              </label>

              <button
                type="button"
                disabled={tripType === "oneway"}
                onClick={() => openDatePicker("return")}
                className={`mt-0.5 flex h-[25px] w-full items-center justify-between border-0 bg-transparent p-0 text-left outline-none ${
                  tripType === "oneway"
                    ? "cursor-not-allowed"
                    : ""
                }`}
              >
                <span
                  className={
                    returnDate
                      ? "truncate text-[15px] font-semibold text-[#101828]"
                      : "truncate text-[15px] text-[#98a2b3]"
                  }
                >
                  {tripType === "oneway"
                    ? "—"
                    : returnDisplay}
                </span>
              </button>
            </div>

            {/* ===============================================
                PASSENGERS
            =============================================== */}

            <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
              <label className="text-[11px] font-medium text-[#98a2b3]">
                Passengers
              </label>

              <button
                type="button"
                onClick={() => {
                  setPassengerOpen((value) => !value);
                  setFromOpen(false);
                  setToOpen(false);
                  setDatePickerOpen(false);
                }}
                className="mt-0.5 flex h-[25px] w-full items-center justify-between border-0 bg-transparent p-0 text-left outline-none"
              >
                <span className="truncate text-[15px] font-semibold text-[#101828]">
                  {passengerLabel}
                </span>
              </button>

              {passengerOpen && (
                <PassengerPopover
                  adults={adults}
                  children={children}
                  infants={infants}
                  totalPassengers={totalPassengers}
                  onChange={updatePassenger}
                  onDone={() => setPassengerOpen(false)}
                />
              )}
            </div>
          </div>

          {/* ===============================================
              SEARCH — solid orange, matches Cabs CTA
          =============================================== */}

          <button
            type="submit"
            className="mt-3 flex h-[52px] w-full items-center justify-center gap-1.5 rounded-b-2xl bg-orange-500 px-8 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-orange-600 lg:absolute lg:right-2 lg:top-1/2 lg:mt-0 lg:w-auto lg:-translate-y-1/2 lg:rounded-xl"
          >
            Search flights
          </button>
        </div>

        {/* =================================================
            DATE PICKER
        ================================================= */}

        {datePickerOpen && (
          <div
            ref={popupRef}
            className="relative z-[500]"
          >
            <div
              className="
                absolute
                left-1/2
                top-3
                w-[320px]
                -translate-x-1/2
                rounded-[20px]
                border
                border-[#eaecf0]
                bg-white
                p-4
                shadow-[0_20px_60px_rgba(16,24,40,0.16)]
                sm:w-[360px]
                lg:left-auto
                lg:right-[300px]
                lg:translate-x-0
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#101828]">
                    {datePickerMode === "departure"
                      ? "Departure date"
                      : "Return date"}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#98a2b3]">
                    {datePickerMode === "departure"
                      ? "Choose your departure"
                      : "Choose your return"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDatePickerOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#667085] transition hover:bg-[#f2f4f7]"
                >
                  ×
                </button>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#344054] transition hover:bg-[#f2f4f7]"
                >
                  ‹
                </button>

                <span className="text-sm font-semibold text-[#101828]">
                  {MONTHS[calendarMonth.getMonth()]}{" "}
                  {calendarMonth.getFullYear()}
                </span>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#344054] transition hover:bg-[#f2f4f7]"
                >
                  ›
                </button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-1">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="flex h-8 items-center justify-center text-[10px] font-semibold uppercase text-[#98a2b3]"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="h-9"
                      />
                    );
                  }

                  const dateISO = dateToISO(date);

                  const isPast = isBeforeDate(date, today);

                  const selected =
                    departureDate === dateISO ||
                    returnDate === dateISO;

                  const beforeDeparture =
                    datePickerMode === "return" &&
                    !!departureDate &&
                    dateISO < departureDate;

                  const disabled = isPast || beforeDeparture;

                  return (
                    <button
                      key={dateISO}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleDateSelect(date)}
                      className={`
                        flex
                        h-9
                        w-full
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        font-medium
                        transition
                        ${
                          disabled
                            ? "cursor-not-allowed text-[#d0d5dd]"
                            : "text-[#344054] hover:bg-[#f2f4f7]"
                        }
                        ${
                          selected
                            ? "bg-[#101828] text-white hover:bg-[#1d2939]"
                            : ""
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-[#eef0f3] pt-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#98a2b3]">
                      Departure
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#101828]">
                      {departureDate
                        ? formatDisplayDate(departureDate)
                        : "Not selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#98a2b3]">
                      Return
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#101828]">
                      {returnDate
                        ? formatDisplayDate(returnDate)
                        : tripType === "oneway"
                        ? "One way"
                        : "Not selected"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDatePickerOpen(false)}
                  className="mt-3 h-10 w-full rounded-[12px] bg-[#101828] text-xs font-semibold text-white transition hover:bg-[#1d2939]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            MOBILE SWAP
        ================================================= */}

        <div className="mt-3 lg:hidden">
          <button
            type="button"
            onClick={handleSwap}
            className="text-[13px] font-medium text-[#475467] transition hover:text-[#101828]"
          >
            ⇄ Swap airports
          </button>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mt-4 rounded-[12px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]">
            {error}
          </div>
        )}

        {/* =========================================
            TRAVEL / BOOKING DISCLAIMER
        ========================================= */}

        <div className="mt-4 border-t border-[#eef0f3] px-1 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-[13px] font-normal tracking-[-0.01em] text-[#344054]">
              Booking information
            </p>

            <span className="hidden text-[#d0d5dd] sm:inline">•</span>

            <p className="text-[12px] font-normal leading-5 text-[#98a2b3]">
              Prices and availability may change.
            </p>

            <button
              type="button"
              onClick={() => setShowDisclaimer(!showDisclaimer)}
              className="text-[12px] font-normal text-[#667085] underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              {showDisclaimer ? "Show less" : "Read more"}
            </button>
          </div>

          {showDisclaimer && (
            <div className="mt-3 max-w-3xl border-l-2 border-[#f97316]/30 pl-3">
              <p className="text-[12px] font-normal leading-5 text-[#667085]">
                Flight availability and pricing are provided by our travel
                partners. Selecting an offer may take you to the relevant
                provider to review final details and complete your booking.
              </p>

              <p className="mt-2 text-[12px] font-normal leading-5 text-[#667085]">
                Provider terms, prices, availability, taxes and cancellation
                policies may vary. Final booking and payment are completed
                with the selected travel provider.
              </p>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

/* =========================================================
   AIRPORT DROPDOWN
========================================================= */

type AirportDropdownProps = {
  airports: Airport[];
  onSelect: (
    airport: Airport
  ) => void;
};

function AirportDropdown({
  airports,
  onSelect,
}: AirportDropdownProps) {
  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-full
        mt-2
        z-[300]
        overflow-hidden
        rounded-[14px]
        border
        border-[#eaecf0]
        bg-white
        shadow-[0_16px_40px_rgba(16,24,40,0.12)]
      "
    >
      {airports.map((airport) => (
        <button
          key={`${airport.type}-${airport.code}`}
          type="button"
          onMouseDown={(event) =>
            event.preventDefault()
          }
          onClick={() =>
            onSelect(airport)
          }
          className="
            flex
            w-full
            items-center
            gap-3
            px-4
            py-3
            text-left
            transition
            hover:bg-[#f9fafb]
          "
        >
          <span
            className="
              flex
              h-9
              w-10
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#f2f4f7]
              text-[10px]
              font-bold
              tracking-wide
              text-[#344054]
            "
          >
            {airport.code}
          </span>

          <span className="min-w-0">
            <span
              className="
                block
                truncate
                text-sm
                font-semibold
                text-[#101828]
              "
            >
              {airport.city}
            </span>

            <span
              className="
                block
                truncate
                text-[11px]
                text-[#667085]
              "
            >
              {airport.airport}
            </span>

            <span
              className="
                mt-0.5
                block
                text-[10px]
                text-[#98a2b3]
              "
            >
              {airport.country}
              {" · "}
              {airport.type ===
              "airport"
                ? "Airport"
                : "City"}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   LOADING DROPDOWN
========================================================= */

function LoadingDropdown() {
  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-full
        mt-2
        z-[300]
        rounded-[14px]
        border
        border-[#eaecf0]
        bg-white
        px-4
        py-4
        text-xs
        text-[#667085]
        shadow-[0_16px_40px_rgba(16,24,40,0.12)]
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="
            h-3
            w-3
            animate-spin
            rounded-full
            border-2
            border-[#d0d5dd]
            border-t-[#101828]
          "
        />

        Searching airports...
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY DROPDOWN
========================================================= */

function EmptyDropdown() {
  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-full
        mt-2
        z-[300]
        rounded-[14px]
        border
        border-[#eaecf0]
        bg-white
        px-4
        py-4
        text-xs
        text-[#667085]
        shadow-[0_16px_40px_rgba(16,24,40,0.12)]
      "
    >
      No airports or cities found.
    </div>
  );
}

/* =========================================================
   PASSENGER POPOVER
========================================================= */

type PassengerPopoverProps = {
  adults: number;
  children: number;
  infants: number;
  totalPassengers: number;
  onChange: (
    type: PassengerType,
    direction:
      | "increase"
      | "decrease"
  ) => void;
  onDone: () => void;
};

function PassengerPopover({
  adults,
  children,
  infants,
  totalPassengers,
  onChange,
  onDone,
}: PassengerPopoverProps) {
  return (
    <div
      className="
        absolute
        right-0
        top-full
        mt-2
        z-[400]
        w-[300px]
        rounded-[18px]
        border
        border-[#eaecf0]
        bg-white
        p-4
        shadow-[0_20px_50px_rgba(16,24,40,0.16)]
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-semibold
              text-[#101828]
            "
          >
            Passengers
          </p>

          <p
            className="
              mt-0.5
              text-[11px]
              text-[#98a2b3]
            "
          >
            Select the number of travelers
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-[#f2f4f7]
            px-2.5
            py-1
            text-[10px]
            font-semibold
            text-[#475467]
          "
        >
          {totalPassengers}
        </span>
      </div>

      <PassengerRow
        title="Adults"
        subtitle="12+ years"
        value={adults}
        min={1}
        maxReached={
          totalPassengers >= 9
        }
        onDecrease={() =>
          onChange(
            "adults",
            "decrease"
          )
        }
        onIncrease={() =>
          onChange(
            "adults",
            "increase"
          )
        }
      />

      <PassengerRow
        title="Children"
        subtitle="2–11 years"
        value={children}
        min={0}
        maxReached={
          totalPassengers >= 9
        }
        onDecrease={() =>
          onChange(
            "children",
            "decrease"
          )
        }
        onIncrease={() =>
          onChange(
            "children",
            "increase"
          )
        }
      />

      <PassengerRow
        title="Infants"
        subtitle="Under 2 years"
        value={infants}
        min={0}
        maxReached={
          totalPassengers >= 9 ||
          infants >= adults
        }
        onDecrease={() =>
          onChange(
            "infants",
            "decrease"
          )
        }
        onIncrease={() =>
          onChange(
            "infants",
            "increase"
          )
        }
      />

      <div
        className="
          mt-4
          border-t
          border-[#eef0f3]
          pt-4
        "
      >
        <div
          className="
            mb-3
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-xs
              text-[#667085]
            "
          >
            Total travelers
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-[#101828]
            "
          >
            {totalPassengers}
          </span>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="
            h-10
            w-full
            rounded-[12px]
            bg-[#101828]
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-[#1d2939]
          "
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PASSENGER ROW
========================================================= */

type PassengerRowProps = {
  title: string;
  subtitle: string;
  value: number;
  min: number;
  maxReached: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

function PassengerRow({
  title,
  subtitle,
  value,
  min,
  maxReached,
  onDecrease,
  onIncrease,
}: PassengerRowProps) {
  const decreaseDisabled =
    value <= min;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-[#f2f4f7]
        py-3
        last:border-b-0
      "
    >
      <div>
        <p
          className="
            text-sm
            font-medium
            text-[#101828]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            text-[10px]
            text-[#98a2b3]
          "
        >
          {subtitle}
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <button
          type="button"
          disabled={
            decreaseDisabled
          }
          onClick={onDecrease}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[#d0d5dd]
            text-sm
            text-[#344054]
            transition
            hover:bg-[#f9fafb]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          −
        </button>

        <span
          className="
            flex
            w-6
            justify-center
            text-sm
            font-semibold
            text-[#101828]
          "
        >
          {value}
        </span>

        <button
          type="button"
          disabled={
            maxReached
          }
          onClick={onIncrease}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[#d0d5dd]
            text-sm
            text-[#344054]
            transition
            hover:bg-[#f9fafb]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          +
        </button>
      </div>
    </div>
  );
}