import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, MapPin, Navigation, Calendar, Clock, Car, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state as any;
  const {
    selectedVehicle,
    pickup,
    drop,
    pickupDate,
    pickupTime,
    tripType,
    distanceKm,
    totalFare,
  } = bookingData || {};

  useEffect(() => {
    if (!selectedVehicle) navigate("/vehicles");
  }, [selectedVehicle, navigate]);

  if (!selectedVehicle) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmBooking = async () => {
    if (!name || !email || !mobile) {
      toast.error("Please fill all contact details.", {
        duration: 4000,
        style: {
          background: "#dc2626",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      const booking = {
        name,
        email,
        mobile,
        fromLocation: pickup,
        toLocation: drop,
        pickupDate,
        pickupTime,
        tripType,
        vehicleName: selectedVehicle.vehicleName,
        distanceKm,
        fare: totalFare,
      };

      await axios.post("https://adiyogi-travels.onrender.com/api/bookings/confirm", booking);

      toast.success("Booking confirmed! Details sent to admin.", {
        duration: 4000,
        style: {
          background: "#16a34a",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
      navigate("/confirmation", { state: { booking } });
    } catch (err) {
      console.error(err);
      toast.error("Error confirming booking. Please try again.", {
        duration: 4000,
        style: {
          background: "#dc2626",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Booking</p>
          <h1 className="text-2xl font-medium text-gray-900">Confirm your ride</h1>
          <p className="text-sm text-gray-500 mt-1">A few details and you're good to go</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">

          {/* ── Left: Contact form ── */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-[11px] tracking-widest text-gray-400 uppercase mb-0.5">Step 1 of 1</p>
              <p className="text-[15px] font-medium text-gray-900">Contact details</p>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Full name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Mobile <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* CTA */}
              <button
                onClick={handleConfirmBooking}
                disabled={isLoading}
                className="w-full mt-2 h-11 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-[.99] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Confirm booking
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                By continuing, you agree to our terms &amp; conditions
              </p>
            </div>
          </div>

          {/* ── Right: Summary ── */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden sticky top-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[11px] tracking-widest text-gray-400 uppercase mb-0.5">Summary</p>
              <p className="text-[15px] font-medium text-gray-900">Your trip</p>
            </div>

            <div className="px-5 py-4 space-y-4">

              {/* Route */}
              <div>
                <div className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                  <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-0.5">From</p>
                    <p className="text-sm font-medium text-gray-900">{pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2.5">
                  <Navigation className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-0.5">To</p>
                    <p className="text-sm font-medium text-gray-900">{drop}</p>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="space-y-0 border-t border-gray-100 pt-1">
                {[
                  { icon: Calendar, label: "Date", value: pickupDate },
                  { icon: Clock,    label: "Time", value: pickupTime },
                  { icon: Car,      label: "Vehicle", value: selectedVehicle?.vehicleName },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <Icon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-900">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fare breakdown */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Trip type</span>
                  <span className="font-medium text-gray-800 capitalize">{tripType}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Distance</span>
                  <span className="font-medium text-gray-800">{distanceKm} km</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-gray-900">Total</span>
                  <span className="text-xl font-medium text-gray-900">
                    ₹{totalFare?.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Inclusive of all taxes</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}