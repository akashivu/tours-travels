import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";
import { MapPin, Calendar, Clock, Phone, CheckCircle, Car, Plane, Building } from "lucide-react";
import toast from "react-hot-toast";

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState<"airport" | "outstation" | "rental">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   
  
  const navigate = useNavigate();

  const handleSearchRide = async () => {
    if (activeTab === "outstation" && (!pickup || !drop || !pickupDate || !pickupTime || !mobile)) {
  toast.error("Please fill all required fields for Outstation booking");
  return;
}
if (activeTab === "airport" && (!pickup || !pickupDate || !pickupTime || !mobile)) {
  toast.error("Please fill all required fields for Airport transfer");
  return;
}
if (activeTab === "rental" && (!pickup || !pickupDate || !pickupTime || !mobile)) {
  toast.error("Please fill all required fields for Rental booking");
  return;
}

    setIsLoading(true);
    try {
      const res = await axios.post("https://adiyogi-travels.onrender.com/api/quotes", {
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
    } catch (error) {
      toast.error("Unable to fetch vehicles. Please try again.", {
  duration: 4000,
  style: {
    background: "#dc2626", 
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    padding: "12px 16px",
  },
});
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: CheckCircle, text: "Free cancellations on most bookings" },
    { icon: CheckCircle, text: "60,000+ locations across India" },
    { icon: CheckCircle, text: "Customer support" },
  ];

  const tabs: { id: "outstation" | "airport" | "rental"; label: string; icon: any }[] = [
    { id: "outstation", label: "Outstation Cabs", icon: Car },
    { id: "airport", label: "Airport Transfer", icon: Plane },
    { id: "rental", label: "Hourly Rental", icon: Building },
  ];

  return (
    <>
    
      <section className="relative h-[420px] -mt-[64px]">
       
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

       
        <div className="relative z-10 h-full flex flex-col justify-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your Ride — Reliable, Affordable & Hassle-Free
          </h1>

          <div className="flex flex-wrap gap-6 text-white text-sm">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
     <section className="relative max-w-6xl mx-auto -mt-20 px-4 z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        
         <div className="flex border-b border-gray-200">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      
     onClick={() => {
    
    setActiveTab(tab.id);
  }}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all duration-300 ${
        activeTab === tab.id
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      <tab.icon className="w-5 h-5" />
      <span className="hidden md:inline">{tab.label}</span>
    </button>
  ))}
</div>

         
          <div className="p-8">
            
          
          
{activeTab === "outstation" && (
  <>
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setTripType("oneway")}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
          tripType === "oneway"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        One Way
      </button>
      <button
        onClick={() => setTripType("roundtrip")}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
          tripType === "roundtrip"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Round Trip
      </button>
    </div>
  </>
)}


{activeTab === "airport" && (
  <>
    <p className="text-gray-600 mb-6">Airport Transfer selected</p>
    
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        Airport Name
      </label>
      <AddressAutocomplete
                    placeholder="e.g. Kempegowda International Airport"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    value={pickup}
                    onChange={(val) => setPickup(val)}
                    onSelect={(address) => setPickup(address)} apiKey={""}      />
    </div>
  </>
)}


{activeTab === "rental" && (
  <>
    <p className="text-gray-600 mb-6">🕒 Hourly Rental selected</p>
   
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Clock className="w-4 h-4" />
        Number of Hours
      </label>
      <input
        type="number"
        placeholder="Enter hours"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      />
    </div>
  </>
)}


            
            <div className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Pick-up location
                  </label>
                  <AddressAutocomplete
                    placeholder="Kalmar Airport, Kalmar, Sweden"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    value={pickup}
                    onChange={(val) => setPickup(val)}
                    onSelect={(address) => setPickup(address)} apiKey={""}                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Drop-off location
                  </label>
                  <AddressAutocomplete
                    placeholder="Enter destination"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    value={drop}
                    onChange={(val) => setDrop(val)}
                    onSelect={(address) => setDrop(address)} apiKey={""}                  />
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    Pick-up date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Phone className="w-4 h-4" />
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                </div>
              </div>

              
              {activeTab === "outstation" && tripType === "roundtrip" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      Drop-off date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </label>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleSearchRide}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-12 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? "Searching..." : "Search Ride"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
