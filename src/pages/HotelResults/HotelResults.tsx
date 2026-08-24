import { useNavigate, useSearchParams } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowLeft } from "lucide-react";
import "./HotelResults.css";

const STAY22_AID = "elixway";

function formatDate(date?: string) {
  if (!date) return "";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HotelResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* =========================================================
     READ SEARCH DATA
  ========================================================= */

  const destination =
    searchParams.get("destination")?.trim() || "Goa";

  const checkIn =
    searchParams.get("checkIn") || "";

  const checkOut =
    searchParams.get("checkOut") || "";

  const adults = Number(
    searchParams.get("adults") || "2"
  );

  const rooms = Number(
    searchParams.get("rooms") || "1"
  );

  /* =========================================================
     BUILD STAY22 MAP URL

     Based directly on Stay22 Maps Quick Start documentation.
  ========================================================= */

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
    console.log("Destination:", destination);
console.log("Stay22 URL:", stay22MapUrl);

  return (
    <main className="hotel-results-page">
      {/* HEADER */}

      <section className="hotel-results-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <p className="results-eyebrow">
          Hotel search results
        </p>

        <h1>
          Stays in <span>{destination}</span>
        </h1>

        <div className="search-summary">
          <div className="summary-item">
            <MapPin size={18} />
            <span>{destination}</span>
          </div>

          {checkIn && checkOut && (
            <div className="summary-item">
              <CalendarDays size={18} />

              <span>
                {formatDate(checkIn)} — {formatDate(checkOut)}
              </span>
            </div>
          )}

          <div className="summary-item">
            <Users size={18} />

            <span>
              {adults} {adults === 1 ? "Adult" : "Adults"},{" "}
              {rooms} {rooms === 1 ? "Room" : "Rooms"}
            </span>
          </div>
        </div>
      </section>

      {/* RESULTS */}

      <section className="stay22-results-container">
        <div className="stay22-results-heading">
          <div>
            <h2>Available accommodations</h2>

            <p>
              Explore accommodation options around {destination} and
              choose the stay that suits your trip.
            </p>
          </div>
        </div>

        <div className="stay22-map-wrapper">
          <iframe
            key={stay22MapUrl}
            id="stay22-widget"
            title={`Hotels in ${destination}`}
            src={stay22MapUrl}
            width="100%"
            height="650"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <p className="booking-disclaimer">
          Accommodation availability and booking options are provided
          by our travel partners. Final prices and policies are shown
          by the selected booking provider.
        </p>
      </section>
    </main>
  );
}