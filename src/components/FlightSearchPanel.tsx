import { useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ShieldCheck,
  BadgePercent,
  Lock,
  Sparkles,
} from "lucide-react";

type FlightSearchPanelProps = {
  isLoggedIn?: boolean;
  onSearch?: (data: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
    tripType: "oneway" | "roundtrip";
  }) => void;
  onSignIn?: () => void;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
        z-40
        w-[300px]
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
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#475467] hover:bg-[#f2f4f7]"
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
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#475467] hover:bg-[#f2f4f7]"
          aria-label="Next month"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px] font-medium text-[#98a2b3]">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
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
                    ? "mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-[13px] font-semibold text-white"
                    : disabled
                    ? "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium text-[#d0d5dd]"
                    : "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium text-[#101828] hover:bg-[#eef4ff]"
                }
              >
                {day.getDate()}
              </button>
            );
          })
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
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-[15px] font-semibold text-[#101828]">{label}</p>
        <p className="text-[12px] text-[#98a2b3]">{sublabel}</p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2.5">
        {options.map((n) => {
          const selected = n === value;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={
                selected
                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-[13px] font-semibold text-white"
                  : "flex h-8 w-8 items-center justify-center text-[13px] font-medium text-[#101828] hover:text-[#2563eb]"
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

// Small pill used for trust/offer signals under the trip-type row
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
        bg-[#eef4ff]
        px-3
        py-1.5
        text-[12.5px]
        font-medium
        text-[#2563eb]
      "
    >
      {icon}
      {label}
    </span>
  );
}

export default function FlightSearchPanel({
  isLoggedIn = false,
  onSearch,
  onSignIn,
}: FlightSearchPanelProps) {
  const [tripType, setTripType] =
    useState<"oneway" | "roundtrip">(
      "oneway"
    );

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [departureView, setDepartureView] = useState(new Date());
  const [returnView, setReturnView] = useState(new Date());

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [openField, setOpenField] =
    useState<"departure" | "return" | "travelers" | null>(null);

  const today = startOfToday();
  const departureMinDate = today;
  const returnMinDate = departureDate
    ? new Date(`${departureDate}T00:00:00`)
    : today;

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSelectDeparture = (iso: string) => {
    setDepartureDate(iso);

    if (returnDate && returnDate < iso) {
      setReturnDate("");
    }

    setOpenField(null);
  };

  const handleSelectReturn = (iso: string) => {
    setReturnDate(iso);
    setOpenField(null);
  };

  const totalPassengers = adults + children + infants;

  const handleSearch = () => {
    if (!from.trim()) {
      return;
    }

    if (!to.trim()) {
      return;
    }

    if (!departureDate) {
      return;
    }

    if (tripType === "roundtrip" && !returnDate) {
      return;
    }

    onSearch?.({
      from,
      to,
      departureDate,
      returnDate: tripType === "roundtrip" ? returnDate : "",
      passengers: totalPassengers,
      tripType,
    });
  };

  return (
    <div className="w-full">

      {/* Trip type + tagline */}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTripType("oneway")}
            className={
              tripType === "oneway"
                ? "rounded-full border-2 border-[#2563eb] px-5 py-1.5 text-[13px] font-semibold text-[#2563eb]"
                : "rounded-full border border-[#d0d5dd] px-5 py-1.5 text-[13px] font-medium text-[#344054]"
            }
          >
            One Way
          </button>

          <button
            type="button"
            onClick={() => setTripType("roundtrip")}
            className={
              tripType === "roundtrip"
                ? "rounded-full border-2 border-[#2563eb] px-5 py-1.5 text-[13px] font-semibold text-[#2563eb]"
                : "rounded-full border border-[#d0d5dd] px-5 py-1.5 text-[13px] font-medium text-[#344054]"
            }
          >
            Round Trip
          </button>
        </div>

        <div className="hidden items-center gap-1.5 text-[13px] text-[#475467] sm:flex">
          <ThumbsUp size={15} strokeWidth={1.8} className="text-[#16a34a]" />
          Hassle-Free Bookings
        </div>
      </div>

      {/* Trust & offer badges */}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <TrustBadge
          icon={<ShieldCheck size={13} strokeWidth={2} />}
          label="Free Cancellation"
        />
        <TrustBadge
          icon={<BadgePercent size={13} strokeWidth={2} />}
          label="Lowest Price Guarantee"
        />
        <TrustBadge
          icon={<Sparkles size={13} strokeWidth={2} />}
          label="Zero Convenience Fee"
        />

        {!isLoggedIn && (
          <button
            type="button"
            onClick={onSignIn}
            className="
              ml-auto
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-dashed
              border-[#f97316]
              px-3
              py-1.5
              text-[12.5px]
              font-semibold
              text-[#f97316]
              transition-colors
              hover:bg-[#fff4ec]
            "
          >
            <Lock size={12} strokeWidth={2.2} />
            Sign in to see exclusive fares
          </button>
        )}
      </div>

      {/* Click-outside overlay */}

      {openField && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenField(null)}
        />
      )}

      {/* Search bar */}

      <div className="relative">
        <div
          className="
            flex
            w-full
            flex-col
            rounded-[16px]
            bg-[#f5f6f8]
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
              onChange={(e) => setFrom(e.target.value)}
              placeholder="City or airport"
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
                h-15
                w-15
                items-center
                justify-center
                rounded-full
                
                
                text-[#475467]
                
                transition-transform
                duration-200
                hover:rotate-180
              "
            >
              <ArrowLeftRight size={15} strokeWidth={2} />
            </button>
          </div>

          {/* TO */}

          <div
            className="
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
              onChange={(e) => setTo(e.target.value)}
              placeholder="City or airport"
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
              lg:border-t-0
              lg:border-l
              lg:py-4
            "
          >
            <button
              type="button"
              onClick={() =>
                setOpenField(openField === "departure" ? null : "departure")
              }
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
                      1
                    )
                  )
                }
                onNextMonth={() =>
                  setDepartureView(
                    new Date(
                      departureView.getFullYear(),
                      departureView.getMonth() + 1,
                      1
                    )
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
              lg:border-t-0
              lg:border-l
              lg:py-4
            "
          >
            <button
              type="button"
              disabled={tripType === "oneway"}
              onClick={() =>
                setOpenField(openField === "return" ? null : "return")
              }
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
                {returnDate ? (
                  formatDisplay(returnDate)
                ) : (
                  <span className="font-medium text-[#98a2b3]">Return</span>
                )}
              </span>
            </button>

            {openField === "return" && tripType === "roundtrip" && (
              <CalendarPopover
                viewDate={returnView}
                onPrevMonth={() =>
                  setReturnView(
                    new Date(
                      returnView.getFullYear(),
                      returnView.getMonth() - 1,
                      1
                    )
                  )
                }
                onNextMonth={() =>
                  setReturnView(
                    new Date(
                      returnView.getFullYear(),
                      returnView.getMonth() + 1,
                      1
                    )
                  )
                }
                minDate={returnMinDate}
                selectedISO={returnDate}
                onSelect={handleSelectReturn}
              />
            )}
          </div>

          {/* TRAVELERS */}

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
              lg:border-l
              lg:py-4
            "
          >
            <button
              type="button"
              onClick={() =>
                setOpenField(openField === "travelers" ? null : "travelers")
              }
              className="flex flex-col items-start text-left"
            >
              <span className="text-[11px] font-medium text-[#98a2b3]">
                Travellers &amp; Class
              </span>

              <span className="mt-0.5 text-[16px] font-semibold text-[#101828]">
                {totalPassengers} Traveller{totalPassengers > 1 ? "s" : ""}, Economy
              </span>
            </button>

            {openField === "travelers" && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+8px)]
                  z-40
                  w-[320px]
                  rounded-[14px]
                  border
                  border-[#e4e7ec]
                  bg-white
                  p-5
                  shadow-[0_16px_36px_rgba(16,24,40,0.16)]
                "
              >
                <p className="text-[18px] font-bold text-[#101828]">
                  Travellers
                </p>

                <div className="divide-y divide-[#eef0f3]">
                  <CounterRow
                    label="Adults"
                    sublabel="12 yrs or above"
                    value={adults}
                    max={9}
                    onChange={(n) => {
                      const nextAdults = Math.max(1, n);
                      setAdults(nextAdults);

                      if (infants > nextAdults) {
                        setInfants(nextAdults);
                      }
                    }}
                  />

                  <CounterRow
                    label="Children"
                    sublabel="2 - 12 yrs"
                    value={children}
                    max={8}
                    onChange={setChildren}
                  />

                  <CounterRow
                    label="Infants"
                    sublabel="0 - 2 yrs"
                    value={infants}
                    max={Math.min(4, adults)}
                    onChange={setInfants}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOpenField(null)}
                  className="mt-3 w-full rounded-[10px] bg-[#101828] py-2.5 text-[13px] font-semibold text-white"
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
            h-[52px]
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-full
            bg-[#f97316]
            px-8
            text-[15px]
            font-semibold
            text-white
            shadow-[0_10px_24px_rgba(249,115,22,0.30)]
            transition-colors
            duration-200
            hover:bg-[#ea6a0d]
            lg:absolute
            lg:right-2
            lg:top-1/2
            lg:mt-0
            lg:w-auto
            lg:-translate-y-1/2
          "
        >
          Search

          <ChevronRight
            size={18}
            strokeWidth={2.2}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}