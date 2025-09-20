import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState("outstation");
  const [tripType, setTripType] = useState("oneway");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  

  const navigate = useNavigate();

  const handleSearchRide = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/quotes", {
        pickup,
        dropoff: drop,
        tripType,
      });

      navigate("/vehicles", {
        state: {
          quotes: res.data,
          pickup,
          drop,
          tripType,
          pickupDate,
          pickupTime,
         
        },
      });
    } catch {
      alert("Error fetching vehicles");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/50"></div>

      
      <div className="relative z-10 w-full max-w-5xl">
        
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Experience Hassle-Free Online Cab Booking in{" "}
          <span className="text-yellow-400">INDIA</span>
        </h2>
        <p className="text-lg md:text-xl text-white font-medium mb-6">
          Fast, Easy & Reliable – Book Your Cab Now
        </p>

        
        <div className="bg-white rounded-xl shadow-lg p-6">
          
          <div className="flex justify-center gap-4 mb-4">
            {["airport", "outstation", "rental"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          
          {activeTab === "outstation" && (
            <div className="flex justify-center gap-6 mb-4 text-gray-700">
              <label>
                <input
                  type="radio"
                  value="oneway"
                  checked={tripType === "oneway"}
                  onChange={() => setTripType("oneway")}
                  className="mr-2"
                />
                One Way
              </label>
              <label>
                <input
                  type="radio"
                  value="roundtrip"
                  checked={tripType === "roundtrip"}
                  onChange={() => setTripType("roundtrip")}
                  className="mr-2"
                />
                Round Trip
              </label>
            </div>
          )}

          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            <input
              type="text"
              placeholder="From"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              placeholder="To"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <button
              onClick={handleSearchRide}
              className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Search Ride
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white mt-8 text-sm md:text-base font-medium">
          <span>Hassle-Free Bookings</span>
          <span>Best Cab Offers</span>
          <span>24x7 Customer Support</span>
          <span>Free Cancellation</span>
        </div>
      </div>
    </div>
  );
}
