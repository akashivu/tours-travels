import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";

const bgImages = [
  "https://images.pexels.com/photos/12088465/pexels-photo-12088465.jpeg",
  "https://images.pexels.com/photos/4606397/pexels-photo-4606397.jpeg",
  "https://images.pexels.com/photos/3652766/pexels-photo-3652766.jpeg"
];

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState<"airport" | "outstation" | "rental">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [mobile, setMobile] = useState("");

  const [activeBg, setActiveBg] = useState(0);
  const navigate = useNavigate();

  
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
      navigate("/vehicles", {
        state: {
          quotes: res.data,
          pickup,
          drop,
          tripType,
          pickupDate,
          pickupTime,
          mobile,
        },
      });
    } catch {
      alert("Error fetching vehicles");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white">
      
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
      <div className="absolute inset-0 bg-black/40" />

     
      <div className="relative z-10 w-full max-w-5xl px-4 py-12 text-center">
        <h3 className="text-2xl md:text-6xl font-bold mb-4">
         Experince Hassle free Online Cab Booking in India
        </h3>
        <p className="text-sm md:text-lg text-gray-200 mb-8">
         Fast, Easy & Reliable -Book your Cab Now
        </p>

       
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl  p-6 shadow-2xl border border-gray-700">
         
          <div className="flex justify-center gap-3 mb-6">
            {["airport", "outstation", "rental"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition ${
                  activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

         
          {activeTab === "outstation" && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setTripType("oneway")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  tripType === "oneway"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType("roundtrip")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  tripType === "roundtrip"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Round Trip
              </button>
            </div>
          )}

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <AddressAutocomplete
              placeholder="Pickup location"
              className="w-full border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-gray-900"
              value={pickup}
              onChange={(val) => setPickup(val)}
              onSelect={(address) => setPickup(address)}
            />
            <AddressAutocomplete
              placeholder="Drop location"
              className="w-full border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-gray-900"
              value={drop}
              onChange={(val) => setDrop(val)}
              onSelect={(address) => setDrop(address)}
            />
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile number"
              className="w-full border rounded-lg px-3 py-3 shadow-sm focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={handleSearchRide}
              className="bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg w-full"
            >
              Search Ride
            </button>
          </div>
        </div>

       
        <div className="flex flex-wrap justify-center gap-6 text-gray-100 mt-10 text-sm md:text-base font-medium">
          <span className="flex items-center gap-1"> Hassle-Free Bookings</span>
          <span className="flex items-center gap-1"> Best Cab Offers</span>
          <span className="flex items-center gap-1"> 24×7 Customer Support</span>
          <span className="flex items-center gap-1"> Free Cancellation</span>
        </div>
      </div>
    </div>
  );
}
