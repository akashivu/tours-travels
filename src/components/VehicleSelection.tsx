import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type Quote = {
  id: number;
  vehicleName: string;
  capacity: number;
  bags: number;
  ac: boolean;
  imageUrl: string;
  includedKm: number;
  pricePerKm: number;
  extraKmFare: number;
  driverAllowance: number;
  gstPercent: number;
  totalFare: number;
  distanceKm: number;
  inclusion: string[];
  exclusion: string[];
};

export default function VehicleSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quotes, pickup, drop, tripType, pickupDate, pickupTime, mobile } =
    location.state || { quotes: [] };

  const [expanded, setExpanded] = useState<number | null>(null); 
  const handleBook = async (quote: Quote) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/bookings/confirm",
        {
          tripCategory: "OUTSTATION",
          tripType,
          fromLocation: pickup,
          toLocation: drop,
          city: "",
          pickupLocation: pickup,
          pickupDate,
          pickupTime,
          mobile,
          vehicleName: quote.vehicleName,
          distanceKm: quote.distanceKm,
          fare: quote.totalFare,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/confirmation", { state: { booking: res.data } });
    } catch (err) {
      console.error(err);
      alert("Error confirming booking");
    }
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">No vehicles available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Booking Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Pickup:</span> {pickup}
          </p>
          <p>
            <span className="font-semibold">Drop:</span> {drop}
          </p>
          <p>
            <span className="font-semibold">Trip Type:</span> {tripType}
          </p>
          <p>
            <span className="font-semibold">Date & Time:</span> {pickupDate}{" "}
            {pickupTime}
          </p>
          <p>
            <span className="font-semibold">Mobile:</span> {mobile}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {quotes.map((q: Quote, i: number) => {
          const isOpen = expanded === i;
          const [tab, setTab] = useState<"inclusion" | "exclusion" | "fare">(
            "inclusion"
          );

          return (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              
              <div className="flex flex-col md:flex-row">
               
                <div className="flex p-4 w-full md:w-2/3">
                  <img
                    src={q.imageUrl}
                    alt={q.vehicleName}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex flex-col">
                    <h3 className="text-lg font-bold">{q.vehicleName}</h3>
                    <p className="text-gray-600 text-sm">
                      {q.capacity} seater • {q.bags} bags •{" "}
                      {q.ac ? "AC" : "Non-AC"}
                    </p>
                  </div>
                </div>

               
                <div className="bg-yellow-400 p-4 flex flex-col justify-between items-center md:w-1/3">
                  <p className="text-2xl font-bold">₹{q.totalFare.toFixed(0)}</p>
                  <p className="text-xs text-black">
                    Includes {q.distanceKm.toFixed(0)} km
                  </p>

                  <button
                    className="text-sm text-red-700 underline mt-1"
                    onClick={() =>
                      setExpanded(isOpen ? null : i)
                    }
                  >
                    {isOpen ? "Hide Details ▲" : "Detail ▼"}
                  </button>

                  <button
                    onClick={() => handleBook(q)}
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Select
                  </button>
                </div>
              </div>

             
              {isOpen && (
                <div className="border-t">
                
                  <div className="flex text-sm">
                    <button
                      onClick={() => setTab("inclusion")}
                      className={`flex-1 py-2 ${
                        tab === "inclusion"
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      INCLUSION
                    </button>
                    <button
                      onClick={() => setTab("exclusion")}
                      className={`flex-1 py-2 ${
                        tab === "exclusion"
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      EXCLUSION
                    </button>
                    <button
                      onClick={() => setTab("fare")}
                      className={`flex-1 py-2 ${
                        tab === "fare"
                          ? "bg-blue-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      VIEW FARE DETAIL
                    </button>
                  </div>

                  <div className="p-4 text-sm text-gray-700">
                    {tab === "inclusion" &&
                      q.inclusion?.map((item, idx) => (
                        <p key={idx}> {item}</p>
                      ))}
                    {tab === "exclusion" &&
                      q.exclusion?.map((item, idx) => (
                        <p key={idx}> {item}</p>
                      ))}
                    {tab === "fare" && (
                      <div>
                        <p>Total distance: {q.distanceKm} km</p>
                        <p>Fare: ₹{q.pricePerKm}/km</p>
                        <p>Driver Allowance: ₹{q.driverAllowance}</p>
                        <p>GST: {q.gstPercent}%</p>
                        <p className="font-semibold mt-1">
                          Total Fare: ₹{q.totalFare}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
