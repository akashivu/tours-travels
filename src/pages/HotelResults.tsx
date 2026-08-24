import { useSearchParams } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  Users,
  ArrowLeft,
} from "lucide-react";

const STAY22_AID = "elixway";

export default function HotelResults() {
  const [searchParams] = useSearchParams();

  const destination =
    searchParams.get("destination")?.trim() || "Goa";

  const checkIn =
    searchParams.get("checkIn") || "";

  const checkOut =
    searchParams.get("checkOut") || "";

  const adults =
    searchParams.get("adults") || "2";

  const rooms =
    searchParams.get("rooms") || "1";

  /*
   * Build the Stay22 Maps URL dynamically.
   * Each hotel search gets its own destination and dates.
   */
  const mapParams = new URLSearchParams({
    aid: STAY22_AID,
    address: destination,
    campaign: "elixway_hotel_search",
  });

  if (checkIn) {
    mapParams.set("checkin", checkIn);
  }

  if (checkOut) {
    mapParams.set("checkout", checkOut);
  }

  const stay22MapUrl =
    `https://www.stay22.com/embed/gm?${mapParams.toString()}`;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* HEADER */}
      <div className="border-b border-[#eaecf0] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#667085] transition-colors hover:text-[#101828]"
          >
            <ArrowLeft size={16} />
            Back to search
          </button>

          <p className="text-[13px] font-medium text-[#667085]">
            Hotel search results
          </p>

          <h1 className="mt-1 text-[24px] font-bold tracking-[-0.03em] text-[#101828] sm:text-[30px]">
            Hotels in {destination}
          </h1>

          {/* SEARCH SUMMARY */}
          <div className="mt-4 flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 rounded-full bg-[#f2f4f7] px-3.5 py-2 text-[13px] font-medium text-[#344054]">
              <Building2 size={15} />
              {destination}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#f2f4f7] px-3.5 py-2 text-[13px] font-medium text-[#344054]">
              <CalendarDays size={15} />
              {checkIn || "Check-in"} — {checkOut || "Check-out"}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#f2f4f7] px-3.5 py-2 text-[13px] font-medium text-[#344054]">
              <Users size={15} />
              {adults} Adult
              {Number(adults) !== 1 ? "s" : ""},{" "}
              {rooms} Room
              {Number(rooms) !== 1 ? "s" : ""}
            </div>

          </div>
        </div>
      </div>

      {/* STAY22 HOTEL RESULTS */}
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-[20px] border border-[#eaecf0] bg-white shadow-[0_12px_32px_rgba(16,24,40,0.06)]">

          <iframe
            key={stay22MapUrl}
            id="stay22-widget"
            title={`Elixway Hotels in ${destination}`}
            src={stay22MapUrl}
            className="h-[calc(100vh-250px)] min-h-[650px] w-full border-0"
            allow="clipboard-write"
            loading="lazy"
          />

        </div>

        <p className="mt-4 text-center text-[12px] text-[#98a2b3]">
          Hotel availability, prices and booking options are
          provided by our travel partners. Final booking is
          completed with the selected provider.
        </p>

      </main>
    </div>
  );
}