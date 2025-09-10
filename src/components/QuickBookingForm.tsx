import { useState } from "react";
import axios from "axios";

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState("OUTSTATION");
  const [tripType, setTripType] = useState("oneway");

  // Pickup & Drop inputs
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  // Estimate state
  const [estimate, setEstimate] = useState<{ distanceKm: number; fare: number } | null>(null);

  // Handle fare estimation
  const handleEstimate = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/bookings/estimate", {
        pickup,
        dropoff: drop,
      });
      setEstimate(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching estimate");
    }
  };

  // Handle booking confirmation
  const handleConfirm = async () => {
    if (!estimate) return;

    try {
      const res = await axios.post("http://localhost:8080/api/bookings/confirm", {
        pickup,
        dropoff: drop,
        distanceKm: estimate.distanceKm,
        fare: estimate.fare,
      });
      alert(`Booking Confirmed! ID: ${res.data.id}`);
      setEstimate(null); // reset estimate after confirm
      setPickup("");
      setDrop("");
    } catch (error) {
      console.error(error);
      alert("Error confirming booking");
    }
  };

  return (
    <div className="relative min-h-screen w-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {["OUTSTATION", "RENTAL", "AIRPORT"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center mr-2 py-2 font-semibold ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-white hover:bg-green-300"
                } border-r last:border-r-0`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* OUTSTATION Form */}
          {activeTab === "OUTSTATION" && (
            <>
              {/* Trip Type */}
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={() => setTripType("oneway")}
                    className="text-blue-600"
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
                    className="text-blue-600"
                  />
                  Round Trip
                </label>
              </div>

              {/* Pickup & Drop */}
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    From:
                  </label>
                  <input
                    type="text"
                    placeholder="Pick Up"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    To:
                  </label>
                  <input
                    type="text"
                    placeholder="Drop"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Estimate & Confirm */}
              <button
                type="button"
                onClick={handleEstimate}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700 transition"
              >
                Get Estimate
              </button>

              {estimate && (
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">Distance: {estimate.distanceKm.toFixed(1)} km</p>
                  <p className="text-green-700 font-semibold">Fare: ₹{estimate.fare.toFixed(0)}</p>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </>
          )}

          {/* RENTAL Form */}
          {activeTab === "RENTAL" && (
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Bangalore, Karnataka, India"
                  className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pick-Up Location
                </label>
                <input
                  type="text"
                  placeholder="Enter City"
                  className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pick-Up Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pick-Up Time
              </label>
              <select className="w-full border border-gray-400 rounded-md text-black px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400">
                <option>Select Date First</option>
                <option>06:00 AM</option>
                <option>07:00 AM</option>
                <option>08:00 AM</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile No:
            </label>
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300">
            SEARCH TAXI
          </button>
        </div>
      </div>
    </div>
  );
}
