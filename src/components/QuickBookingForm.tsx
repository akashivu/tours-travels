import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import axios from "axios";
import { MapPin, Calendar, Clock, ArrowRight, Car, Plane } from "lucide-react";
import toast from "react-hot-toast";

interface BookingState {
  quotes: any; pickup: string; drop: string;
  tripType: "oneway" | "roundtrip";
  pickupDate: string; pickupTime: string;
  returnDate?: string; returnTime?: string;
}

export default function QuickBookingForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"outstation" | "airport">("outstation");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");

  const handleTabChange = (tab: "outstation" | "airport") => {
    setActiveTab(tab);
    setPickupLat(null); setPickupLng(null);
    setDropLat(null); setDropLng(null);
  };

  const [outstationPickup, setOutstationPickup] = useState("");
  const [outstationDrop, setOutstationDrop] = useState("");
  const [airportPickup, setAirportPickup] = useState("");
  const [airportDrop, setAirportDrop] = useState("");
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);
  const [dropLat, setDropLat] = useState<number | null>(null);
  const [dropLng, setDropLng] = useState<number | null>(null);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getCurrentPickup = () => activeTab === "outstation" ? outstationPickup : airportPickup;
  const getCurrentDrop = () => activeTab === "outstation" ? outstationDrop : airportDrop;

  const validateForm = (): boolean => {
    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();
    const today = getTodayDate();
    if (activeTab === "outstation") {
      if (!pickup.trim() || !drop.trim()) { toast.error("Please enter both pickup and drop locations"); return false; }
      if (!pickupDate || pickupDate < today) { toast.error("Please select a valid pickup date"); return false; }
      if (!pickupTime) { toast.error("Please select pickup time"); return false; }
      if (tripType === "roundtrip") {
        if (!returnDate || returnDate <= pickupDate) { toast.error("Please select a valid return date"); return false; }
        if (!returnTime) { toast.error("Please select return time"); return false; }
      }
    }
    if (activeTab === "airport") {
      if (!pickup.trim() || !drop.trim()) { toast.error("Please enter both pickup and drop locations"); return false; }
      if (!pickupDate || pickupDate < today) { toast.error("Please select a valid pickup date"); return false; }
      if (!pickupTime) { toast.error("Please select pickup time"); return false; }
    }
    return true;
  };

  const handleSearchRide = async () => {
    if (activeTab === "airport") {
      if (!airportPickup || !airportDrop) {
        toast.error("Please select pickup and drop locations");
        return;
      }
      if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
        toast.error("Please select locations from Google suggestions");
        return;
      }
      if (!pickupDate || pickupDate < getTodayDate()) {
        toast.error("Please select a valid pickup date");
        return;
      }
      if (!pickupTime) {
        toast.error("Please select pickup time");
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://adiyogi-travels.onrender.com/api/quotes",
          {
            pickup: airportPickup,
            dropoff: airportDrop,
            tripType: "airport",
            pickupLat,
            pickupLng,
            dropLat,
            dropLng,
          }
        );
        const distanceKm = res.data?.[0]?.distanceKm || 0;
        navigate("/airport-vehicles", {
          state: {
            pickup: airportPickup,
            drop: airportDrop,
            pickupDate,
            pickupTime,
            distanceKm,
          },
        });
      } catch (error) {
        toast.error("Unable to calculate airport distance");
      } finally {
        setIsLoading(false);
      }
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
        pickup, dropoff: drop, tripType, pickupLat, pickupLng, dropLat, dropLng,
      });
      const bookingState: BookingState = { quotes: res.data, pickup, drop, tripType, pickupDate, pickupTime };
      if (activeTab === "outstation" && tripType === "roundtrip") {
        bookingState.returnDate = returnDate;
        bookingState.returnTime = returnTime;
      }
      navigate("/vehicles", { state: bookingState });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Unable to fetch vehicles. Please try again.");
    } finally { setIsLoading(false); }
  };

  const tabs = [
    { id: "outstation", label: "Outstation", icon: Car },
    { id: "airport", label: "Airport", icon: Plane },
  ] as const;

  const todayDate = getTodayDate();

  const inputCls =
    "w-full bg-transparent border-0 border-b border-gray-300 px-0 py-2 text-gray-900 text-sm placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 outline-none";
  const labelCls = "block text-[11px] font-bold tracking-wider text-gray-700 uppercase mb-1.5";

  return (
    <section className="relative min-h-[560px] md:min-h-[500px] -mt-[64px] overflow-hidden flex items-center">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 pt-20 pb-8">
        {/* Heading */}
       <h1 className="text-center font-bold text-white text-3xl md:text-4xl lg:text-5xl">
  Ride Anywhere with Confidence
</h1>

<p className="text-center text-gray-300 mt-2 text-sm md:text-base">
  Trusted cab services across India
</p>
        {/* Booking Card */}
        <div className="mt-8 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Tabs row */}
          <div className="px-4 md:px-6 pt-5">
            <div className="flex flex-wrap gap-2 justify-center">
              {activeTab === "outstation" ? (
                <>
                  <button
                    onClick={() => setTripType("oneway")}
                    className={`px-5 md:px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition ${
                      tripType === "oneway"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    One Way
                  </button>
                  <button
                    onClick={() => setTripType("roundtrip")}
                    className={`px-5 md:px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition ${
                      tripType === "roundtrip"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Round Trip
                  </button>
                </>
              ) : null}

              {tabs.map((t) => {
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id)}
                    className={`px-5 md:px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition flex items-center gap-2 ${
                      active && activeTab !== "outstation"
                        ? "bg-blue-500 text-white"
                        : active
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form body */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {/* FROM */}
              <div>
                <label className={labelCls}>From</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <AddressAutocomplete
                    showCurrentLocation={true}
                      placeholder="Enter pickup location"
                      value={activeTab === "outstation" ? outstationPickup : airportPickup}
                      onChange={activeTab === "outstation" ? setOutstationPickup : setAirportPickup}
                      onSelect={(address: string, lat: number, lng: number) => {
                        if (activeTab === "outstation") setOutstationPickup(address);
                        else setAirportPickup(address);
                        setPickupLat(lat); setPickupLng(lng);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* TO */}
              <div>
                <label className={labelCls}>To</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <AddressAutocomplete
                     showCurrentLocation={false}
                      placeholder="Enter drop location"
                      value={activeTab === "outstation" ? outstationDrop : airportDrop}
                      onChange={activeTab === "outstation" ? setOutstationDrop : setAirportDrop}
                      onSelect={(address: string, lat: number, lng: number) => {
                        if (activeTab === "outstation") setOutstationDrop(address);
                        else setAirportDrop(address);
                        setDropLat(lat); setDropLng(lng);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className={labelCls}>Pick Up Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={todayDate}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* TIME */}
              <div>
                <label className={labelCls}>Pick Up Time</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Return (roundtrip) */}
              {activeTab === "outstation" && tripType === "roundtrip" && (
                <>
                  <div>
                    <label className={labelCls}>Return Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={pickupDate || todayDate}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Return Time</label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSearchRide}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm px-10 py-3.5 rounded-md shadow-lg shadow-orange-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isLoading ? "Searching..." : "Explore Cabs"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}