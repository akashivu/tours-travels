import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  CheckCircle,
  Car,
  Plane,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

interface BookingState {
  quotes: any;
  pickup: string;
  drop: string;
  tripType: "oneway" | "roundtrip";
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  rentalHours?: string;
  mobile: string;
}

export default function QuickBookingForm() {
  const navigate = useNavigate();
const [rentalCity, setRentalCity] = useState("");

  const [activeTab, setActiveTab] = useState<
    "outstation" | "airport" | "rental"
  >("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");


 const handleTabChange = (tab: "outstation" | "airport" | "rental") => {
  setActiveTab(tab);
  setPickupLat(null);
  setPickupLng(null);
  setDropLat(null);
  setDropLng(null);

  if (tab === "airport") {
    navigate("/airport");
  }
};

  const [outstationPickup, setOutstationPickup] = useState("");
  const [outstationDrop, setOutstationDrop] = useState("");
  const [airportPickup, setAirportPickup] = useState("");
  const [airportDrop, setAirportDrop] = useState("");
  const [rentalPickup, setRentalPickup] = useState("");

  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);
  const [dropLat, setDropLat] = useState<number | null>(null);
  const [dropLng, setDropLng] = useState<number | null>(null);

  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [mobile, setMobile] = useState("");
  const [rentalHours] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentPickup = () => {
    switch (activeTab) {
      case "outstation":
        return outstationPickup;
      case "airport":
        return airportPickup;
      case "rental":
        return rentalPickup;
      default:
        return "";
    }
  };

  const getCurrentDrop = () => {
    switch (activeTab) {
      case "outstation":
        return outstationDrop;
      case "airport":
        return airportDrop;
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();
    const today = getTodayDate();

    if (activeTab === "outstation") {
      if (!pickup.trim() || !drop.trim()) {
        toast.error("Please enter both pickup and drop locations");
        return false;
      }
      if (!pickupDate || pickupDate < today) {
        toast.error("Please select a valid pickup date");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pickup time");
        return false;
      }
      if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }
      if (tripType === "roundtrip") {
        if (!returnDate || returnDate <= pickupDate) {
          toast.error("Please select a valid return date");
          return false;
        }
        if (!returnTime) {
          toast.error("Please select return time");
          return false;
        }
      }
    }

    if (activeTab === "airport") {
      if (!pickup.trim() || !drop.trim()) {
        toast.error("Please enter both pickup and drop locations");
        return false;
      }
      if (!pickupDate || pickupDate < today) {
        toast.error("Please select a valid pickup date");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pickup time");
        return false;
      }
      if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }
    }

    if (activeTab === "rental") {
      if (!pickup.trim()) {
        toast.error("Please enter pickup location");
        return false;
      }
      if (!rentalHours.trim() || parseInt(rentalHours) < 1) {
        toast.error("Enter valid rental hours");
        return false;
      }
      if (!pickupDate || pickupDate < today) {
        toast.error("Please select a valid pickup date");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pickup time");
        return false;
      }
      if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }
    }

    return true;
  };

  const handleSearchRide = async () => {
  if (activeTab === "rental") {
   
    if (!rentalPickup.trim()) {
      toast.error("Please enter pickup location");
      return;
    }
    if (!pickupDate) {
      toast.error("Please select pickup date");
      return;
    }
    if (!pickupTime) {
      toast.error("Please select pickup time");
      return;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

   
    navigate("/rental-cars", {
      state: {
        pickup: rentalPickup,
        pickupDate,
        pickupTime,
        mobile,
        rentalHours,
      },
    });
    return;
  }


if (activeTab === "airport") {
 
  navigate("/airport", {
    state: {
      pickup: airportPickup,
      drop: airportDrop,
      pickupDate,
      pickupTime,
      mobile,
    },
  });
  return;
}




  
  if (!validateForm()) return;

  const pickup = getCurrentPickup();
  const drop = getCurrentDrop();

  if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
    toast.error("Please select locations from Google suggestions for accurate distance.");
    return;
  }

  setIsLoading(true);
  try {
    const res = await axios.post("https://adiyogi-travels.onrender.com/api/quotes", {
      pickup,
      dropoff: drop,
      tripType,
      pickupLat,
      pickupLng,
      dropLat,
      dropLng,
    });

    const bookingState: BookingState = {
      quotes: res.data,
      pickup,
      drop,
      tripType,
      pickupDate,
      pickupTime,
      mobile,
    };

    if (activeTab === "outstation" && tripType === "roundtrip") {
      bookingState.returnDate = returnDate;
      bookingState.returnTime = returnTime;
    }

    navigate("/vehicles", { state: bookingState });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    toast.error("Unable to fetch vehicles. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const features = [
    { icon: CheckCircle, text: "Free cancellations on most bookings" },
    { icon: CheckCircle, text: "60,000+ locations across India" },
    { icon: CheckCircle, text: "24/7 customer support" },
  ];

  const tabs = [
    { id: "outstation", label: "Outstation Cabs", icon: Car },
    { id: "airport", label: "Airport Transfer", icon: Plane },
    { id: "rental", label: "Hourly Rental", icon: Building },
  ] as const;

  const todayDate = getTodayDate();

  return (
    <>
     
      <section className="relative h-[420px] -mt-[64px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021)",
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
                <feature.icon className="w-4 h-4" />
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
                onClick={() => handleTabChange(tab.id)}
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
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      tripType === "oneway"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    One Way
                  </button>
                  <button
                    onClick={() => setTripType("roundtrip")}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      tripType === "roundtrip"
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Round Trip
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      Pick-up location
                    </label>
                    <AddressAutocomplete
                      placeholder="Enter pick-up location"
                      value={outstationPickup}
                      onChange={setOutstationPickup}
                      onSelect={(address, lat, lng) => {
                        setOutstationPickup(address);
                        setPickupLat(lat);
                        setPickupLng(lng);
                      }}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      Drop-off location
                    </label>
                    <AddressAutocomplete
                      placeholder="Enter destination"
                      value={outstationDrop}
                      onChange={setOutstationDrop}
                      onSelect={(address, lat, lng) => {
                        setOutstationDrop(address);
                        setDropLat(lat);
                        setDropLng(lng);
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            
            {activeTab === "airport" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Pick-up location
                  </label>
                  <AddressAutocomplete
                    placeholder="Enter pick-up location (e.g. Airport or City)"
                    value={airportPickup}
                    onChange={setAirportPickup}
                    onSelect={(address, lat, lng) => {
                      setAirportPickup(address);
                      setPickupLat(lat);
                      setPickupLng(lng);
                    }}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Drop-off location
                  </label>
                  <AddressAutocomplete
                    placeholder="Enter drop location (e.g. City or Airport)"
                    value={airportDrop}
                    onChange={setAirportDrop}
                    onSelect={(address, lat, lng) => {
                      setAirportDrop(address);
                      setDropLat(lat);
                      setDropLng(lng);
                    }}
                  />
                </div>

                <div className="col-span-full">
                  <p className="text-sm text-gray-500 mt-2">
                    ₹26 per km (excluding toll and parking charges)
                  </p>
                </div>
              </div>
            )}

           
            {activeTab === "rental" && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
  <label className="text-sm text-gray-600 mb-1 block">City</label>
  <input
    type="text"
    placeholder="Enter City"
    value={rentalCity}
    onChange={(e) => setRentalCity(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
  />
</div>


    <div>
      <label className="text-sm text-gray-600 mb-1 block">Pick-Up Location</label>
      <AddressAutocomplete
        placeholder="Enter pickup location"
        value={rentalPickup}
        onChange={setRentalPickup}
        onSelect={(address, lat, lng) => {
          setRentalPickup(address);
          setPickupLat(lat);
          setPickupLng(lng);
        }}
      />
    </div>
  </div>
)}


            
            <div className="space-y-4 mt-4">
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
                    min={todayDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </div>

              
              {activeTab === "outstation" && tripType === "roundtrip" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      Return date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={pickupDate || todayDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
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