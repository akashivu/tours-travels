import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Plane,
  Search,
  ShieldCheck,
} from "lucide-react";

type TripType = "oneway" | "roundtrip";
type CabinClass = "economy" | "premium" | "business" | "first";

type AirportOption = {
  code: string;
  city: string;
  airport: string;
  country: string;
};

type FlightSearchData = {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  passengers: number;
  cabinClass: CabinClass;
  tripType: TripType;
};

type FlightSearchPanelProps = {
  isLoggedIn?: boolean;
  onSearch?: (data: FlightSearchData) => void;
  onSignIn?: () => void;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const AIRPORTS: AirportOption[] = [
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    country: "India",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    country: "India",
  },
  {
    code: "DEL",
    city: "Delhi",
    airport: "Indira Gandhi International Airport",
    country: "India",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    country: "India",
  },
  {
    code: "MAA",
    city: "Chennai",
    airport: "Chennai International Airport",
    country: "India",
  },
  {
    code: "GOI",
    city: "Goa",
    airport: "Manohar International Airport",
    country: "India",
  },
  {
    code: "COK",
    city: "Kochi",
    airport: "Cochin International Airport",
    country: "India",
  },
  {
    code: "CCU",
    city: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport",
    country: "India",
  },
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "AUH",
    city: "Abu Dhabi",
    airport: "Zayed International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "SIN",
    city: "Singapore",
    airport: "Singapore Changi Airport",
    country: "Singapore",
  },
  {
    code: "LHR",
    city: "London",
    airport: "Heathrow Airport",
    country: "United Kingdom",
  },
  {
    code: "CDG",
    city: "Paris",
    airport: "Charles de Gaulle Airport",
    country: "France",
  },
  {
    code: "NRT",
    city: "Tokyo",
    airport: "Narita International Airport",
    country: "Japan",
  },
];

const CABIN_OPTIONS: {
  value: CabinClass;
  label: string;
}[] = [
  {
    value: "economy",
    label: "Economy",
  },
  {
    value: "premium",
    label: "Premium Economy",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "first",
    label: "First",
  },
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function startOfToday() {
  const d = new Date();

  d.setHours(0, 0, 0, 0);

  return d;
}

function formatDisplay(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function buildMonthGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (Date | null)[][] = [];

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

function CalendarPopover({
  viewDate,
  onPrevMonth,
  onNextMonth,
  minDate,
  selectedISO,
  onSelect,
}: {
  viewDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  minDate: Date;
  selectedISO: string;
  onSelect: (iso: string) => void;
}) {
  const weeks = buildMonthGrid(viewDate);

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
        absolute
        left-0
        top-[calc(100%+8px)]
        z-50
        w-[300px]
        max-w-[calc(100vw-2rem)]
        rounded-[14px]
        border
        border-[#e4e7ec]
        bg-white
        p-4
        shadow-[0_16px_36px_rgba(16,24,40,0.16)]
      "
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevMonth}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-[#475467]
            transition-colors
            hover:bg-[#f2f4f7]
          "
          aria-label="Previous month"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        <span className="text-[14px] font-semibold text-[#101828]">
          {monthLabel}
        </span>

        <button
          type="button"
          onClick={onNextMonth}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-[#475467]
            transition-colors
            hover:bg-[#f2f4f7]
          "
          aria-label="Next month"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px] font-medium text-[#98a2b3]">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center">
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            if (!day) {
              return <span key={`${wi}-${di}`} />;
            }

            const iso = toISO(day);
            const disabled = day < minDate;
            const selected = iso === selectedISO;

            return (
              <button
                key={iso}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(iso)}
                className={
                  selected
                    ? "mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#475467] text-[13px] font-semibold text-white"
                    : disabled
                      ? "mx-auto flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full text-[13px] font-medium text-[#d0d5dd]"
                      : "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium text-[#101828] transition-colors hover:bg-[#f2f4f7]"
                }
              >
                {day.getDate()}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

function CounterRow({
  label,
  sublabel,
  value,
  max,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const options = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-[#101828]">{label}</p>

        <p className="text-[12px] text-[#98a2b3]">{sublabel}</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {options.map((n) => {
          const selected = n === value;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${label}: ${n}`}
              className={
                selected
                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#475467] text-[13px] font-semibold text-white"
                  : "flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium text-[#101828] transition-colors hover:bg-[#f2f4f7] hover:text-[#475467]"
              }
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrustBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-[#f5f6f8]
        px-3
        py-1.5
        text-[12.5px]
        font-medium
        text-[#475467]
      "
    >
      {icon}
      {label}
    </span>
  );
}

function AirportSuggestions({
  value,
  onSelect,
  excludeCode,
}: {
  value: string;
  onSelect: (airport: AirportOption) => void;
  excludeCode?: string;
}) {
  const normalized = value.trim().toLowerCase();

  const filtered = AIRPORTS.filter((airport) => {
    if (airport.code === excludeCode) {
      return false;
    }

    if (!normalized) {
      return true;
    }

    return (
      airport.city.toLowerCase().includes(normalized) ||
      airport.airport.toLowerCase().includes(normalized) ||
      airport.code.toLowerCase().includes(normalized) ||
      airport.country.toLowerCase().includes(normalized)
    );
  }).slice(0, 6);

  if (filtered.length === 0) {
    return (
      <div
        className="
          absolute
          left-0
          right-0
          top-[calc(100%+8px)]
          z-50
          rounded-[14px]
          border
          border-[#e4e7ec]
          bg-white
          p-4
          text-[13px]
          text-[#667085]
          shadow-[0_16px_36px_rgba(16,24,40,0.16)]
        "
      >
        No matching airports found.
      </div>
    );
  }

  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-[calc(100%+8px)]
        z-50
        overflow-hidden
        rounded-[14px]
        border
        border-[#e4e7ec]
        bg-white
        shadow-[0_16px_36px_rgba(16,24,40,0.16)]
      "
    >
      {filtered.map((airport) => (
        <button
          key={airport.code}
          type="button"
          onClick={() => onSelect(airport)}
          className="
            flex
            w-full
            items-center
            gap-3
            px-4
            py-3
            text-left
            transition-colors
            hover:bg-[#f8f9fb]
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#f2f4f7]
              text-[#475467]
            "
          >
            <Plane size={15} strokeWidth={2} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-3">
              <span className="truncate text-[14px] font-semibold text-[#101828]">
                {airport.city}
              </span>

              <span className="shrink-0 text-[12px] font-semibold text-[#475467]">
                {airport.code}
              </span>
            </span>

            <span className="mt-0.5 block truncate text-[11.5px] text-[#98a2b3]">
              {airport.airport}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default function FlightSearchPanel({
  onSearch,
}: FlightSearchPanelProps) {
  const [tripType, setTripType] =
    useState<TripType>("oneway");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [fromAirport, setFromAirport] =
    useState<AirportOption | null>(null);

  const [toAirport, setToAirport] =
    useState<AirportOption | null>(null);

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [departureView, setDepartureView] =
    useState(new Date());

  const [returnView, setReturnView] =
    useState(new Date());

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [cabinClass, setCabinClass] =
    useState<CabinClass>("economy");

  const [openField, setOpenField] =
    useState<
      | "from"
      | "to"
      | "departure"
      | "return"
      | "travelers"
      | null
    >(null);

  const [error, setError] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const today = startOfToday();

  const departureMinDate = today;

  const returnMinDate = departureDate
    ? new Date(`${departureDate}T00:00:00`)
    : today;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenField(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSwap = () => {
    const currentFrom = from;
    const currentTo = to;

    const currentFromAirport = fromAirport;
    const currentToAirport = toAirport;

    setFrom(currentTo);
    setTo(currentFrom);

    setFromAirport(currentToAirport);
    setToAirport(currentFromAirport);

    setError("");
  };

  const handleSelectFrom = (airport: AirportOption) => {
    setFrom(`${airport.city} (${airport.code})`);
    setFromAirport(airport);
    setOpenField(null);
    setError("");
  };

  const handleSelectTo = (airport: AirportOption) => {
    setTo(`${airport.city} (${airport.code})`);
    setToAirport(airport);
    setOpenField(null);
    setError("");
  };

  const handleSelectDeparture = (iso: string) => {
    setDepartureDate(iso);

    if (returnDate && returnDate < iso) {
      setReturnDate("");
    }

    setError("");

    setOpenField(
      tripType === "roundtrip" ? "return" : null,
    );
  };

  const handleSelectReturn = (iso: string) => {
    setReturnDate(iso);
    setOpenField(null);
    setError("");
  };

  const totalPassengers =
    adults + children + infants;

  const selectedCabinLabel =
    CABIN_OPTIONS.find(
      (option) => option.value === cabinClass,
    )?.label ?? "Economy";

  const validateSearch = () => {
    if (!from.trim()) {
      setError("Please select your departure airport.");
      setOpenField("from");
      return false;
    }

    if (!to.trim()) {
      setError("Please select your destination airport.");
      setOpenField("to");
      return false;
    }

    if (
      fromAirport &&
      toAirport &&
      fromAirport.code === toAirport.code
    ) {
      setError(
        "Departure and destination cannot be the same.",
      );
      return false;
    }

    if (!departureDate) {
      setError("Please select your departure date.");
      setOpenField("departure");
      return false;
    }

    if (
      tripType === "roundtrip" &&
      !returnDate
    ) {
      setError("Please select your return date.");
      setOpenField("return");
      return false;
    }

    if (
      tripType === "roundtrip" &&
      returnDate < departureDate
    ) {
      setError(
        "Return date cannot be before departure date.",
      );
      setOpenField("return");
      return false;
    }

    if (adults < 1) {
      setError(
        "At least one adult traveller is required.",
      );
      setOpenField("travelers");
      return false;
    }

    if (infants > adults) {
      setError(
        "The number of infants cannot exceed the number of adults.",
      );
      setOpenField("travelers");
      return false;
    }

    return true;
  };

  const handleSearch = () => {
    setError("");

    if (!validateSearch()) {
      return;
    }

    onSearch?.({
      from: fromAirport?.code ?? from,
      to: toAirport?.code ?? to,
      departureDate,
      returnDate:
        tripType === "roundtrip"
          ? returnDate
          : "",
      adults,
      children,
      infants,
      passengers: totalPassengers,
      cabinClass,
      tripType,
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      {/* Trip type */}
      <div
        className="
          mb-3
          flex
          flex-col
          items-stretch
          justify-between
          gap-3
          sm:flex-row
          sm:items-center
        "
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setTripType("oneway");
              setReturnDate("");
              setError("");
            }}
            className={
              tripType === "oneway"
                ? "rounded-full border-2 border-[#475467] px-5 py-1.5 text-[13px] font-semibold text-[#475467]"
                : "rounded-full border border-[#d0d5dd] px-5 py-1.5 text-[13px] font-medium text-[#344054] transition-colors hover:bg-[#f8f9fb]"
            }
          >
            One Way
          </button>

          <button
            type="button"
            onClick={() => {
              setTripType("roundtrip");
              setError("");
            }}
            className={
              tripType === "roundtrip"
                ? "rounded-full border-2 border-[#475467] px-5 py-1.5 text-[13px] font-semibold text-[#475467]"
                : "rounded-full border border-[#d0d5dd] px-5 py-1.5 text-[13px] font-medium text-[#344054] transition-colors hover:bg-[#f8f9fb]"
            }
          >
            Round Trip
          </button>
        </div>

        <div className="hidden items-center gap-1.5 text-[13px] text-[#475467] sm:flex">
          <ShieldCheck
            size={15}
            strokeWidth={1.8}
          />
          Compare travel options
        </div>
      </div>

      {/* Accurate trust messaging */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <TrustBadge
          icon={
            <ShieldCheck
              size={13}
              strokeWidth={2}
            />
          }
          label="Transparent provider pricing"
        />

        <TrustBadge
          icon={
            <Plane
              size={13}
              strokeWidth={2}
            />
          }
          label="Compare flight options"
        />
      </div>

      {/* Click-outside overlay */}
      {openField && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenField(null)}
        />
      )}

      {/* Search bar */}
      <div className="relative z-40">
        <div
          className="
            flex
            w-full
            flex-col
            rounded-[16px]
            border
            border-[#eef0f3]
            bg-white
            shadow-[0_8px_24px_rgba(16,24,40,0.06)]
            lg:flex-row
            lg:items-stretch
            lg:pr-[150px]
          "
        >
          {/* FROM */}
          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
              px-5
              py-3.5
              lg:py-4
            "
          >
            <label className="text-[11px] font-medium text-[#98a2b3]">
              From
            </label>

            <input
              value={from}
              onFocus={() => {
                setOpenField("from");
                setError("");
              }}
              onChange={(event) => {
                setFrom(event.target.value);
                setFromAirport(null);
                setError("");
              }}
              placeholder="City or airport"
              autoComplete="off"
              className="
                mt-0.5
                w-full
                border-0
                bg-transparent
                p-0
                text-[16px]
                font-semibold
                text-[#101828]
                outline-none
                placeholder:font-medium
                placeholder:text-[#98a2b3]
              "
            />

            {openField === "from" && (
              <AirportSuggestions
                value={from}
                excludeCode={toAirport?.code}
                onSelect={handleSelectFrom}
              />
            )}
          </div>

          {/* SWAP */}
          <div className="relative hidden w-0 items-center justify-center lg:flex">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap origin and destination"
              className="
                absolute
                z-10
                flex
                h-12
                w-12
                items-center
                justify-center
              
               
               
                text-[#475467]
                
                transition-transform
                duration-200
                hover:rotate-180
               
              "
            >
              <ArrowLeftRight
                size={15}
                strokeWidth={2}
              />
            </button>
          </div>

          {/* TO */}
          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
              border-t
              border-[#e6e8eb]
              px-5
              py-3.5
              lg:border-t-0
              lg:py-4
            "
          >
            <label className="text-[11px] font-medium text-[#98a2b3]">
              To
            </label>

            <input
              value={to}
              onFocus={() => {
                setOpenField("to");
                setError("");
              }}
              onChange={(event) => {
                setTo(event.target.value);
                setToAirport(null);
                setError("");
              }}
              placeholder="City or airport"
              autoComplete="off"
              className="
                mt-0.5
                w-full
                border-0
                bg-transparent
                p-0
                text-[16px]
                font-semibold
                text-[#101828]
                outline-none
                placeholder:font-medium
                placeholder:text-[#98a2b3]
              "
            />

            {openField === "to" && (
              <AirportSuggestions
                value={to}
                excludeCode={fromAirport?.code}
                onSelect={handleSelectTo}
              />
            )}
          </div>

          {/* DEPARTURE */}
          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
              border-t
              border-[#e6e8eb]
              px-5
              py-3.5
              lg:border-l
              lg:border-t-0
              lg:py-4
            "
          >
            <button
              type="button"
              onClick={() => {
                setOpenField(
                  openField === "departure"
                    ? null
                    : "departure",
                );
                setError("");
              }}
              className="flex flex-col items-start text-left"
            >
              <span className="text-[11px] font-medium text-[#98a2b3]">
                Departure
              </span>

              <span className="mt-0.5 text-[16px] font-semibold text-[#101828]">
                {departureDate ? (
                  formatDisplay(departureDate)
                ) : (
                  <span className="font-medium text-[#98a2b3]">
                    Select date
                  </span>
                )}
              </span>
            </button>

            {openField === "departure" && (
              <CalendarPopover
                viewDate={departureView}
                onPrevMonth={() =>
                  setDepartureView(
                    new Date(
                      departureView.getFullYear(),
                      departureView.getMonth() - 1,
                      1,
                    ),
                  )
                }
                onNextMonth={() =>
                  setDepartureView(
                    new Date(
                      departureView.getFullYear(),
                      departureView.getMonth() + 1,
                      1,
                    ),
                  )
                }
                minDate={departureMinDate}
                selectedISO={departureDate}
                onSelect={handleSelectDeparture}
              />
            )}
          </div>

          {/* RETURN */}
          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
              border-t
              border-[#e6e8eb]
              px-5
              py-3.5
              lg:border-l
              lg:border-t-0
              lg:py-4
            "
          >
            <button
              type="button"
              disabled={tripType === "oneway"}
              onClick={() => {
                if (tripType === "oneway") {
                  return;
                }

                setOpenField(
                  openField === "return"
                    ? null
                    : "return",
                );

                setError("");
              }}
              className="flex flex-col items-start text-left disabled:cursor-not-allowed"
            >
              <span className="text-[11px] font-medium text-[#98a2b3]">
                Return
              </span>

              <span
                className={
                  tripType === "oneway"
                    ? "mt-0.5 text-[16px] font-medium text-[#c8cdd6]"
                    : "mt-0.5 text-[16px] font-semibold text-[#101828]"
                }
              >
                {tripType === "oneway" ? (
                  <span className="font-medium text-[#c8cdd6]">
                    Not required
                  </span>
                ) : returnDate ? (
                  formatDisplay(returnDate)
                ) : (
                  <span className="font-medium text-[#98a2b3]">
                    Select date
                  </span>
                )}
              </span>
            </button>

            {openField === "return" &&
              tripType === "roundtrip" && (
                <CalendarPopover
                  viewDate={returnView}
                  onPrevMonth={() =>
                    setReturnView(
                      new Date(
                        returnView.getFullYear(),
                        returnView.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  onNextMonth={() =>
                    setReturnView(
                      new Date(
                        returnView.getFullYear(),
                        returnView.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  minDate={returnMinDate}
                  selectedISO={returnDate}
                  onSelect={handleSelectReturn}
                />
              )}
          </div>

          {/* TRAVELLERS + CABIN */}
          <div
            className="
              relative
              flex
              min-w-0
              flex-1
              flex-col
              justify-center
              border-t
              border-[#e6e8eb]
              px-5
              py-3.5
              lg:border-l
              lg:border-t-0
              lg:py-4
            "
          >
            <button
              type="button"
              onClick={() => {
                setOpenField(
                  openField === "travelers"
                    ? null
                    : "travelers",
                );
                setError("");
              }}
              className="flex flex-col items-start text-left"
            >
              <span className="text-[11px] font-medium text-[#98a2b3]">
                Travellers &amp; Class
              </span>

              <span className="mt-0.5 truncate text-[16px] font-semibold text-[#101828]">
                {totalPassengers}{" "}
                {totalPassengers > 1
                  ? "Travellers"
                  : "Traveller"}
                , {selectedCabinLabel}
              </span>
            </button>

            {openField === "travelers" && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+8px)]
                  z-50
                  w-[340px]
                  max-w-[calc(100vw-2rem)]
                  rounded-[14px]
                  border
                  border-[#e4e7ec]
                  bg-white
                  p-5
                  shadow-[0_16px_36px_rgba(16,24,40,0.16)]
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[18px] font-bold text-[#101828]">
                      Travellers
                    </p>

                    <p className="mt-0.5 text-[12px] text-[#98a2b3]">
                      Select passengers and cabin class
                    </p>
                  </div>
                </div>

                <div className="mt-3 divide-y divide-[#eef0f3]">
                  <CounterRow
                    label="Adults"
                    sublabel="12 yrs or above"
                    value={adults}
                    max={9}
                    onChange={(value) => {
                      const nextAdults =
                        Math.max(1, value);

                      setAdults(nextAdults);

                      if (
                        infants > nextAdults
                      ) {
                        setInfants(nextAdults);
                      }
                    }}
                  />

                  <CounterRow
                    label="Children"
                    sublabel="2 - 11 yrs"
                    value={children}
                    max={8}
                    onChange={setChildren}
                  />

                  <CounterRow
                    label="Infants"
                    sublabel="Under 2 yrs"
                    value={infants}
                    max={Math.min(4, adults)}
                    onChange={(value) =>
                      setInfants(
                        Math.min(value, adults),
                      )
                    }
                  />
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-[13px] font-semibold text-[#344054]">
                    Cabin class
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {CABIN_OPTIONS.map((option) => {
                      const selected =
                        cabinClass === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setCabinClass(
                              option.value,
                            )
                          }
                          className={
                            selected
                              ? "rounded-[10px] border border-[#475467] bg-[#f2f4f7] px-3 py-2.5 text-left text-[12.5px] font-semibold text-[#344054]"
                              : "rounded-[10px] border border-[#e4e7ec] bg-white px-3 py-2.5 text-left text-[12.5px] font-medium text-[#475467] transition-colors hover:bg-[#f8f9fb]"
                          }
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpenField(null)
                  }
                  className="
                    mt-4
                    w-full
                    rounded-[10px]
                    bg-[#101828]
                    py-2.5
                    text-[13px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-black
                  "
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH */}
<button
  type="button"
  onClick={handleSearch}
  className="
    group
    mt-3
    flex
    h-[44px]
    w-full
    items-center
    justify-center
    gap-1.5
    rounded-[12px]
    bg-[#101828]
    px-5
    text-[12px]
    font-semibold
    text-white
    shadow-[0_8px_18px_rgba(16,24,40,0.16)]
    transition-colors
    duration-200
    hover:bg-black
    lg:absolute
    lg:right-2
    lg:top-1/2
    lg:mt-0
    lg:h-[40px]
    lg:w-auto
    lg:-translate-y-1/2
  "
>
  <Search
    size={15}
    strokeWidth={2.2}
  />

  Search Flights
</button>
      </div>

      {/* Validation / informational message */}
      {error && (
        <div
          className="
            mt-3
            rounded-[10px]
            border
            border-[#e4e7ec]
            bg-[#f8f9fb]
            px-4
            py-3
            text-[13px]
            font-medium
            text-[#475467]
          "
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Provider disclosure */}
      <p className="mt-4 text-[11.5px] leading-5 text-[#98a2b3]">
        Flight availability and pricing are provided by
        travel partners. Selecting an offer will take you
        to the relevant provider to review the final
        details and complete your booking.
      </p>

      <p className="mt-1 text-[11px] leading-5 text-[#98a2b3]">
        Provider terms, prices, availability, taxes and
        cancellation policies may vary. Booking is
        completed with the selected travel provider.
      </p>
    </div>
  );
}