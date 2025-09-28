import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const handleConfirmBooking = async () => {
    if (!name || !email || !mobile) {
      alert("Please fill all contact details.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/bookings/confirm", {
        name,
        email,
        mobile,
        pickup,
        drop,
        pickupDate,
        pickupTime,
        tripType,
        vehicleName: selectedVehicle.vehicleName,
        distanceKm,
        fare: totalFare,
      });
      alert(" Booking confirmed! Details sent to admin.");
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("Error confirming booking. Please try again.");
    }
  };

  
  
  return (
    <div className="min-h-screen mt-10 bg-gray-50 flex flex-col mb-1 md:flex-row justify-center items-start px-4 md:px-10 py-10 gap-8">
     
      <div className="bg-white rounded-2xl shadow-md w-full md:w-2/3 lg:w-1/2 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          1. Contact & Pickup Details
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button
            onClick={handleConfirmBooking}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-orange-600 transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-md w-full md:w-1/3 lg:w-1/3 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Booking Summary
        </h2>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">From:</span>
            <span className="text-right">{pickup}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">To:</span>
            <span className="text-right">{drop}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Date & Time:</span>
            <span className="text-right">
              {pickupDate} {pickupTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Trip Type:</span>
            <span className="text-right capitalize">{tripType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Car Type:</span>
            <span className="text-right">{selectedVehicle?.vehicleName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Distance:</span>
            <span>{distanceKm} km</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
            <span>Total Fare:</span>
            <span>₹ {totalFare?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
