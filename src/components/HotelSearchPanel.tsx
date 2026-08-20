import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Users,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

type HotelSearchPanelProps = {
  onSearch?: (data: {
    destination: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    rooms: number;
  }) => void;
};

function formatHotelDate(value: string) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
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

export default function HotelSearchPanel({
  onSearch,
}: HotelSearchPanelProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  const [guestOpen, setGuestOpen] = useState(false);

  const today = startOfToday();

  const handleSearch = () => {
    if (!destination.trim()) {
      return;
    }

    if (!checkIn) {
      return;
    }

    if (!checkOut) {
      return;
    }

    onSearch?.({
      destination,
      checkIn,
      checkOut,
      adults,
      rooms,
    });
  };

  return (
    <div className="w-full">
      {/* =========================================================
          TRUST / HOTEL TAGS
      ========================================================= */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <TrustBadge
          icon={<ShieldCheck size={13} strokeWidth={2} />}
          label="Free Cancellation"
        />

        <TrustBadge
          icon={<ThumbsUp size={13} strokeWidth={2} />}
          label="Hassle-Free Bookings"
        />

        <TrustBadge
          icon={<Sparkles size={13} strokeWidth={2} />}
          label="Zero Convenience Fee"
        />
      </div>

      {/* =========================================================
          CLICK OUTSIDE
      ========================================================= */}
      {guestOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setGuestOpen(false)}
        />
      )}

      {/* =========================================================
          HOTEL SEARCH BAR
      ========================================================= */}
      <div className="relative">
        <div
          className="
            flex
            w-full
            flex-col
            rounded-[16px]
            border border-[#eef0f3]
            bg-white
            shadow-[0_8px_24px_rgba(16,24,40,0.06)]
            lg:flex-row
            lg:items-stretch
            lg:pr-[160px]
          "
        >
          {/* =====================================================
              DESTINATION
          ===================================================== */}
          <div
            className="
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
            <label
              className="
                text-[11px]
                font-medium
                text-[#98a2b3]
              "
            >
              Destination
            </label>

            <div className="mt-0.5 flex items-center gap-2">
              <Building2
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#475467]"
              />

              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City, hotel or area"
                className="
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
          </div>

          {/* =====================================================
              CHECK-IN
          ===================================================== */}
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
              lg:border-l
              lg:py-4
            "
          >
            <label
              className="
                text-[11px]
                font-medium
                text-[#98a2b3]
              "
            >
              Check-in
            </label>

            <div className="mt-0.5 flex items-center gap-2">
              <CalendarDays
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#475467]"
              />

              <input
                type="date"
                min={today.toISOString().split("T")[0]}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);

                  if (
                    checkOut &&
                    e.target.value > checkOut
                  ) {
                    setCheckOut("");
                  }
                }}
                className="
                  h-[25px]
                  w-full
                  border-0
                  bg-transparent
                  p-0
                  text-[15px]
                  font-semibold
                  text-[#101828]
                  outline-none
                "
              />
            </div>

            {checkIn && (
              <span className="mt-0.5 hidden text-[11px] text-[#98a2b3] sm:block">
                {formatHotelDate(checkIn)}
              </span>
            )}
          </div>

          {/* =====================================================
              CHECK-OUT
          ===================================================== */}
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
              lg:border-l
              lg:py-4
            "
          >
            <label
              className="
                text-[11px]
                font-medium
                text-[#98a2b3]
              "
            >
              Check-out
            </label>

            <div className="mt-0.5 flex items-center gap-2">
              <CalendarDays
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#475467]"
              />

              <input
                type="date"
                min={
                  checkIn ||
                  today.toISOString().split("T")[0]
                }
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="
                  h-[25px]
                  w-full
                  border-0
                  bg-transparent
                  p-0
                  text-[15px]
                  font-semibold
                  text-[#101828]
                  outline-none
                "
              />
            </div>

            {checkOut && (
              <span className="mt-0.5 hidden text-[11px] text-[#98a2b3] sm:block">
                {formatHotelDate(checkOut)}
              </span>
            )}
          </div>

          {/* =====================================================
              GUESTS & ROOMS
          ===================================================== */}
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
              onClick={() => setGuestOpen(!guestOpen)}
              className="
                flex
                flex-col
                items-start
                text-left
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-[#98a2b3]
                "
              >
                Guests & Rooms
              </span>

              <div className="mt-0.5 flex items-center gap-2">
                <Users
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#475467]"
                />

                <span
                  className="
                    text-[15px]
                    font-semibold
                    text-[#101828]
                  "
                >
                  {adults} Adult{adults > 1 ? "s" : ""},{" "}
                  {rooms} Room{rooms > 1 ? "s" : ""}
                </span>
              </div>
            </button>

            {/* Guests popover */}
            {guestOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+8px)]
                  z-40
                  w-[300px] max-w-[calc(100vw-2rem)]
                  rounded-[14px]
                  border
                  border-[#e4e7ec]
                  bg-white
                  p-5
                  shadow-[0_16px_36px_rgba(16,24,40,0.16)]
                "
              >
                <p className="text-[17px] font-bold text-[#101828]">
                  Guests & Rooms
                </p>

                {/* Adults */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#eef0f3]
                    py-4
                  "
                >
                  <div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      Adults
                    </p>

                    <p className="mt-0.5 text-[12px] text-[#98a2b3]">
                      12 years or above
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setAdults(Math.max(1, adults - 1))
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d0d5dd]
                        text-[16px]
                        text-[#475467]
                        transition-colors
                        hover:border-[#101828]
                        hover:text-[#101828]
                      "
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-[14px] font-semibold text-[#101828]">
                      {adults}
                    </span>

                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d0d5dd]
                        text-[16px]
                        text-[#475467]
                        transition-colors
                        hover:border-[#101828]
                        hover:text-[#101828]
                      "
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    py-4
                  "
                >
                  <div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      Rooms
                    </p>

                    <p className="mt-0.5 text-[12px] text-[#98a2b3]">
                      Number of rooms
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setRooms(Math.max(1, rooms - 1))
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d0d5dd]
                        text-[16px]
                        text-[#475467]
                        transition-colors
                        hover:border-[#101828]
                        hover:text-[#101828]
                      "
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-[14px] font-semibold text-[#101828]">
                      {rooms}
                    </span>

                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d0d5dd]
                        text-[16px]
                        text-[#475467]
                        transition-colors
                        hover:border-[#101828]
                        hover:text-[#101828]
                      "
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestOpen(false)}
                  className="
                    mt-1
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

        {/* =======================================================
            SEARCH BUTTON
        ======================================================= */}
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
            rounded-[14px]
            bg-[#101828]
            px-8
            text-[15px]
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(16,24,40,0.18)]
            transition-all
            duration-200
            hover:bg-black
            hover:shadow-[0_10px_24px_rgba(16,24,40,0.22)]
            lg:absolute
            lg:right-2
            lg:top-1/2
            lg:mt-0
            lg:w-auto
            lg:-translate-y-1/2
          "
        >
          Search Hotels

          <ArrowRight
            size={18}
            strokeWidth={2.1}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </button>
      </div>
    </div>
  );
}