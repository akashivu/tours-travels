import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosClient";
import toast from "react-hot-toast";

interface BookingData {
  car: { carType?: string; car_type?: string };
  packageType: string;
  fare: number;
  city?: string;
  pickup?: string;
  date?: string;
  time?: string;
  mobile?: string;
}

export default function RentalConfirmation() {
  const { state } = useLocation() as { state: BookingData };
  const vehicleName = state?.car?.carType ?? state?.car?.car_type ?? "";

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: state?.mobile || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user.name.trim() || !user.email.trim() || !user.mobile.trim()) {
      toast.error("Please enter your name, email, and mobile number");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/rental/book", {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        carType: vehicleName,
        packageType: state.packageType,
        totalFare: state.fare,
        pickup: state.pickup,
        pickupDate: state.date,
        pickupTime: state.time,
        city: state.city,
      });
      toast.success("Booking confirmed! Email sent successfully 🚖");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bookingDetails = [
    { label: "Vehicle", value: vehicleName },
    { label: "Package", value: state?.packageType },
    { label: "Pickup Location", value: state?.pickup },
    { label: "Date", value: state?.date },
    { label: "Time", value: state?.time },
    { label: "Mobile", value: user.mobile },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Confirm Your Booking</h1>
          <p className="text-lg text-gray-600">Review your details and complete your reservation</p>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <input
                  id="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                  value={user.mobile}
                  onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Booking Summary
            </h2>
            <div className="space-y-1">
              {bookingDetails.map((d, i) => (
                <div key={i} className="flex justify-between items-center py-3.5 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm font-medium text-gray-600">{d.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{d.value || "-"}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-5 mt-3 border-t-2 border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total Fare</span>
                <span className="text-3xl font-bold text-blue-600">₹{state.fare.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 active:scale-98 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Confirm Booking"}
          </button>

          <p className="text-sm text-center text-gray-500">By confirming, you agree to our terms and conditions</p>
        </div>
      </div>
    </div>
  );
}