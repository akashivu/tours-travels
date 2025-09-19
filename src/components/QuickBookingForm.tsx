import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

type Quote = {
  vehicleName: string;
  capacity: number;
  ac: boolean;
  ratePerKm: number;
  distanceKm: number;
  totalFare: number;
  imageUrl: string;
  features: string;
};

export default function QuickBookingForm() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("OUTSTATION");
  const [tripType, setTripType] = useState("oneway");

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

  
  const handleEstimate = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/quotes", {
         pickup,
  dropoff: drop,
  tripType
      });
      setQuotes(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching estimates");
    }
  };

  
  const handleConfirm = async (quote: Quote) => {
    try {
      const res = await axios.post("http://localhost:8080/api/bookings/confirm", {
        pickup,
        dropoff: drop,
        distanceKm: quote.distanceKm,
        fare: quote.totalFare,
        vehicleName: quote.vehicleName,
      });
      alert(`Booking Confirmed! ID: ${res.data.id}`);
      setQuotes([]);
      setPickup("");
      setDrop("");
    } catch (error) {
      console.error(error);
      alert("Error confirming booking");
    }
  };

  return (
    <div className="relative min-h-screen w-screen">
     
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

     
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
         
          <div className="flex border-b mb-6">
            {["OUTSTATION", "RENTAL", "AIRPORT"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center mr-2 py-2 font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-blue-200 text-white hover:bg-blue-300"
                } border-r last:border-r-0`}
              >
                {tab}
              </button>
            ))}
          </div>

          
          {activeTab === "OUTSTATION" && (
            <>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={() => setTripType("oneway")}
                  />
                  One Way
                </label>
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                  />
                  Round Trip
                </label>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">From:</label>
                  <input
                    type="text"
                    placeholder="Pick Up"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">To:</label>
                  <input
                    type="text"
                    placeholder="Drop"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleEstimate}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700 transition"
              >
                Get Estimates
              </button>

              
            
{quotes.length > 0 && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
     
      <button
        onClick={() => setQuotes([])}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
      >
        ✕
      </button>

      <h2 className="text-2xl  text -black font-bold mb-6 text-center">Available Vehicles</h2>

      <div className="space-y-4">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => handleConfirm(q)}
          >
            <div className="flex items-center space-x-3">
              <img
                src={q.imageUrl}
                alt={q.vehicleName}
                className="w-20 h-20 rounded object-cover"
              />
              <div>
                <h3 className="font-bold text-black">{q.vehicleName}</h3>
                <p className="text-sm text-gray-600">
                  {q.features} • {q.capacity} seats {q.ac ? "• AC" : "• Non-AC"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-700 font-bold text-lg">₹{q.totalFare}</p>
              <p className="text-xs text-gray-500">{q.distanceKm.toFixed(1)} km</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

            </>
          )}

          
          {activeTab === "RENTAL" && (
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Bangalore, Karnataka, India"
                  className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pick-Up Location</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
                />
              </div>
            </div>
          )}

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pick-Up Date</label>
              <input
                type="date"
                className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pick-Up Time</label>
              <select className="w-full border border-gray-400 rounded-md text-black px-3 py-2">
                <option>Select Date First</option>
                <option>06:00 AM</option>
                <option>07:00 AM</option>
                <option>08:00 AM</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile No:</label>
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full border border-gray-400 text-black rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
