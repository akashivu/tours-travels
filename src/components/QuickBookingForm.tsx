import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";

const bgImages = [
  "https://images.pexels.com/photos/12088465/pexels-photo-12088465.jpeg",
  "https://images.pexels.com/photos/4606397/pexels-photo-4606397.jpeg",
  "https://images.pexels.com/photos/3652766/pexels-photo-3652766.jpeg"
];

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState("outstation");
  const [tripType, setTripType] = useState("oneway");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const [activeBg, setActiveBg] = useState(0);

  useEffect(() => {
  const interval = setInterval(
    () => setActiveBg((prev) => (prev + 1) % bgImages.length),
    5000 
    );
    return () => clearInterval(interval);
         }, []);
  const handleSearchRide = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/quotes", {
        pickup,
        dropoff: drop,
        tripType,
      });
       console.log("Quotes received:", res.data);
      navigate("/vehicles", {
        state: {
          quotes: res.data,
          pickup,
          drop,
          tripType,
          pickupDate,
          pickupTime,
          mobile
        },
      });
     
    } catch {
      alert("Error fetching vehicles");
    }
  };

  return (
     <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
     
      {bgImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeBg ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
    
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-3">
          Experience Hassle-Free Online Cab Booking in{" "}
          <span className="text-yellow-400">INDIA</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Fast, Easy & Reliable – Book Your Cab Now
        </p>

        <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
          
          <div className="flex justify-center gap-4 mb-4">
            {["airport", "outstation", "rental"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

         
          {activeTab === "outstation" && (
            <div className="flex justify-center gap-6 mb-4">
              <button
                onClick={() => setTripType("oneway")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  tripType === "oneway"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType("roundtrip")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  tripType === "roundtrip"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round Trip
              </button>
            </div>
          )}

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4  items-center">
            <AddressAutocomplete
              placeholder="Pickup location"
              className="w-full min-w-0 border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={pickup}
              onChange={(val) => setPickup(val)}
              onSelect={(address) => setPickup(address)}
            />

            <AddressAutocomplete
              placeholder="Drop location"
              className="w-full min-w-0 border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              value={drop}
              onChange={(val) => setDrop(val)}
              onSelect={(address) => setDrop(address)}
            />

            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full min-w-0 border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full min-w-0 border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
              className="w-full min-w-0 border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
         

         <button
    onClick={handleSearchRide}
    className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg w-full"
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
