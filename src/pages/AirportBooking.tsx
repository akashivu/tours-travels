import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface AirportVehicle {
  id: number;
  name: string;
  imageUrl: string;
  capacity: number;
  luggage: number;
  pricePerKm: number;
}

export default function AirportBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
  selectedVehicle,
  pickup,
  drop,
  pickupDate,
  pickupTime,
  tripType,
  distanceKm,
  totalFare,
} = location.state || {};

  const vehicle = selectedVehicle as AirportVehicle;

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid booking request
      </div>
    );
  }

  const handleBooking = async () => {
    if (!customerName || !customerEmail || !mobileNo) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        customerName,
        customerEmail,
        mobileNo,
        pickupLocation: pickup,
        dropLocation: drop,
        pickupDate,
        pickupTime,
        vehicleName: vehicle.name,
        tripType: tripType || "airport",
      };

      await axios.post(
        "https://adiyogi-travels.onrender.com/api/bookings/confirm",
        payload
      );

      toast.success("Booking Confirmed");

      navigate("/confirmation", {
  state: {
    booking: {
      id: 0,
      fromLocation: pickup,
      toLocation: drop,
      pickupDate,
      pickupTime,
      vehicleName: vehicle.name,
      tripType: "airport",
      mobile: mobileNo,
      fare: totalFare,
    },
  },
});
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Form Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">
              Contact & Pickup Details
            </h2>
          </div>

          <div className="p-8 space-y-6">

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading ? "Processing..." : "Confirm Airport Booking"}
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-fit">

          <div className="bg-slate-900 px-6 py-5">
            <h2 className="text-white text-2xl font-bold">
              Booking Summary
            </h2>
          </div>

          <div className="p-6">

            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="w-full h-48 object-cover rounded-2xl"
            />

            <h3 className="text-xl font-bold mt-4">
              {vehicle.name}
            </h3>

            <div className="mt-4 space-y-3 text-slate-600">

              <div>
                <span className="font-semibold">From:</span>
                <p>{pickup}</p>
              </div>

              <div>
                <span className="font-semibold">To:</span>
                <p>{drop}</p>
              </div>

              <div>
                <span className="font-semibold">Date:</span>
                <p>{pickupDate}</p>
              </div>

              <div>
                <span className="font-semibold">Time:</span>
                <p>{pickupTime}</p>
              </div>

              <div>
                <span className="font-semibold">Capacity:</span>
                <p>{vehicle.capacity} Persons</p>
              </div>

              <div>
                <span className="font-semibold">Luggage:</span>
                <p>{vehicle.luggage} Bags</p>
              </div>

   <div>
  <span className="font-semibold">Distance:</span>
  <p>{distanceKm} KM</p>
</div>

<div>
  <span className="font-semibold">Rate:</span>
  <p>₹{vehicle.pricePerKm}/KM</p>
</div>

<div>
  <span className="font-semibold">Total Fare:</span>
  <p className="text-green-600 font-bold text-2xl">
    ₹{totalFare}
  </p>
</div>
            </div>

            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-sm text-orange-700">
                Final fare will be calculated based on actual travel distance.
                Toll, parking and airport entry charges are extra if applicable.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}