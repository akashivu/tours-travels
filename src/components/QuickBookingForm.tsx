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

  const [activeTab, setActiveTab] = useState<"outstation" | "airport" | "rental">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");

  // ✅ Location states
  const [outstationPickup, setOutstationPickup] = useState("");
  const [outstationDrop, setOutstationDrop] = useState("");
  const [airportPickup, setAirportPickup] = useState("");
  const [rentalPickup, setRentalPickup] = useState("");

  // ✅ Common form states
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [mobile, setMobile] = useState("");
  const [rentalHours, setRentalHours] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
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
    return activeTab === "outstation" ? outstationDrop : "";
  };

  // ✅ Validation Logic
  const validateForm = (): boolean => {
    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();
    const today = getTodayDate();

    if (activeTab === "outstation") {
      if (!pickup.trim()) {
        toast.error("Please enter pick-up location");
        return false;
      }
      if (!drop.trim()) {
        toast.error("Please enter drop-off location");
        return false;
      }
      if (!pickupDate) {
        toast.error("Please select pick-up date");
        return false;
      }
      if (pickupDate < today) {
        toast.error("Pick-up date cannot be in the past");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pick-up time");
        return false;
      }
      if (!mobile.trim()) {
        toast.error("Please enter mobile number");
        return false;
      }

      const mobileDigits = mobile.replace(/\D/g, "");
      if (!/^\d{10}$/.test(mobileDigits)) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }

      if (tripType === "roundtrip") {
        if (!returnDate) {
          toast.error("Please select return date");
          return false;
        }
        if (returnDate <= pickupDate) {
          toast.error("Return date must be after pick-up date");
          return false;
        }
        if (!returnTime) {
          toast.error("Please select return time");
          return false;
        }
      }
    } else if (activeTab === "airport") {
      if (!pickup.trim()) {
        toast.error("Please enter airport/location");
        return false;
      }
      if (!pickupDate) {
        toast.error("Please select pick-up date");
        return false;
      }
      if (pickupDate < today) {
        toast.error("Pick-up date cannot be in the past");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pick-up time");
        return false;
      }
      if (!mobile.trim()) {
        toast.error("Please enter mobile number");
        return false;
      }

      const mobileDigits = mobile.replace(/\D/g, "");
      if (!/^\d{10}$/.test(mobileDigits)) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }
    } else if (activeTab === "rental") {
      if (!pickup.trim()) {
        toast.error("Please enter pick-up location");
        return false;
      }
      if (!rentalHours.trim()) {
        toast.error("Please enter number of hours");
        return false;
      }

      const hours = parseInt(rentalHours, 10);
      if (isNaN(hours) || hours < 1) {
        toast.error("Rental hours must be at least 1");
        return false;
      }

      if (!pickupDate) {
        toast.error("Please select pick-up date");
        return false;
      }
      if (pickupDate < today) {
        toast.error("Pick-up date cannot be in the past");
        return false;
      }
      if (!pickupTime) {
        toast.error("Please select pick-up time");
        return false;
      }
      if (!mobile.trim()) {
        toast.error("Please enter mobile number");
        return false;
      }

      const mobileDigits = mobile.replace(/\D/g, "");
      if (!/^\d{10}$/.test(mobileDigits)) {
        toast.error("Enter a valid 10-digit mobile number");
        return false;
      }
    }

    return true;
  };

  // ✅ Search Ride Handler
  const handleSearchRide = async () => {
    if (!validateForm()) return;

    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();

    setIsLoading(true);
    try {
      const res = await axios.post("https://adiyogi-travels.onrender.com/api/quotes", {
        pickup,
        dropoff: drop,
        tripType,
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

      if (activeTab === "rental") {
        bookingState.rentalHours = rentalHours;
      }

      navigate("/vehicles", {
        state: bookingState,
      });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
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
      {/* 🧭 Hero Section */}
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
                <feature.icon className="w-4 h-4" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧾 Booking Form */}
      <section className="relative max-w-6xl mx-auto -mt-20 px-4 z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

          {/* Form Fields */}
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

                {/* Pickup / Drop */}
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
                      onSelect={(address) => setOutstationPickup(address)}
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
                      onSelect={(address) => setOutstationDrop(address)}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "airport" && (
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  Airport/Location
                </label>
                <AddressAutocomplete
                  placeholder="e.g. Kempegowda International Airport"
                  value={airportPickup}
                  onChange={setAirportPickup}
                  onSelect={(address) => setAirportPickup(address)}
                />
              </div>
            )}

            {activeTab === "rental" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Pick-up location
                  </label>
                  <AddressAutocomplete
                    placeholder="Enter pick-up location"
                    value={rentalPickup}
                    onChange={setRentalPickup}
                    onSelect={(address) => setRentalPickup(address)}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    Number of Hours
                  </label>
                  <input
                    type="number"
                    placeholder="Enter hours"
                    value={rentalHours}
                    onChange={(e) => setRentalHours(e.target.value)}
                    min="1"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Common Fields */}
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

              {/* Submit */}
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