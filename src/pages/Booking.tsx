import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, MapPin, Calendar, Clock, Car, Navigation } from "lucide-react";
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
    if (!selectedVehicle) {
      navigate("/vehicles");
    }
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
    fontSize: "15px",
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

    await axios.post("http://localhost:8080/api/bookings/confirm", booking);

    toast.success("Booking confirmed! Details sent to admin.", {
  duration: 4000, 
  style: {
    background: "#16a34a", 
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "8px",
    padding: "12px 16px",
  },
});
    navigate("/confirmation", { state: { booking } });
  } catch (err) {
    console.error(err);
    toast.error("❌ Error confirming booking. Please try again.", {
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">Just a few more details to confirm your ride</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Contact & Pickup Details
                </h2>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By confirming, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Booking Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
               
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-1">From</p>
                      <p className="text-sm font-semibold text-gray-900">{pickup}</p>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-dashed border-gray-300 ml-2 h-4"></div>
                  
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-1">To</p>
                      <p className="text-sm font-semibold text-gray-900">{drop}</p>
                    </div>
                  </div>
                </div>

               
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 py-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Pickup Date</p>
                      <p className="text-sm font-medium text-gray-900">{pickupDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Pickup Time</p>
                      <p className="text-sm font-medium text-gray-900">{pickupTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <Car className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Vehicle</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedVehicle?.vehicleName}
                      </p>
                    </div>
                  </div>
                </div>

                
                <div className="border-t border-gray-200 my-4"></div>

                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trip Type</span>
                    <span className="font-medium text-gray-900 capitalize">{tripType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium text-gray-900">{distanceKm} km</span>
                  </div>
                </div>

               
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Fare</span>
                    <span className="text-2xl font-bold text-blue-700">
                      ₹{totalFare?.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Inclusive of all taxes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}