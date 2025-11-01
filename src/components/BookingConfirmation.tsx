
import { CheckCircle, MapPin, Calendar, Car, Phone, CreditCard, Shield, X, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [isCancelling, setIsCancelling] = useState(false);



  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No booking found</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
 const handleCancelBooking = async () => {
  if (!booking?.id) {
    toast.error("Booking ID not found!");
    console.error("Booking object missing ID:", booking);
    return;
  }

  setIsCancelling(true);
  try {
    const res = await axios.put(
      `https://adiyogi-travels.onrender.com/api/bookings/${booking.id}/cancel`
    );
    toast.success(res.data.message || "Your booking has been cancelled");
    navigate("/");
  } catch (err) {
    console.error("Cancel error:", err);
    toast.error("Failed to cancel booking. Please try again.");
  } finally {
    setIsCancelling(false);
  }
};


  const gst = Math.round(booking.fare * 0.18);
  const discount = 100;
  const total = booking.fare + gst - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
     
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Booking Confirmed!</h1>
              <p className="text-green-100 text-sm">Your ride is all set</p>
            </div>
          </div>
          <button
  onClick={handleCancelBooking}
  disabled={isCancelling}
  className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition duration-300 border border-white/30
    ${isCancelling
      ? "bg-white/20 cursor-not-allowed"
      : "bg-white/10 hover:bg-white/20 text-white"}`}
>
  {isCancelling ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Cancelling...
    </>
  ) : (
    <>
      <X className="w-4 h-4" />
      Cancel Request
    </>
  )}
</button>

        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2 space-y-6">
          
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      Your Ride is Confirmed
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We've received your booking request. A professional driver will be assigned 
                      to your trip 1 hour before the scheduled pickup time. You'll receive a 
                      notification with driver details.
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Trip Details
                </h3>

                <div className="space-y-4">
                  
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Pickup Date & Time</p>
                      <p className="font-semibold text-gray-900">
                        {booking.pickupDate} at {booking.pickupTime}
                      </p>
                    </div>
                  </div>

                 
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <Car className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Vehicle Type</p>
                      <p className="font-semibold text-gray-900">{booking.vehicleName}</p>
                    </div>
                  </div>

                 
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Pickup Location</p>
                        <p className="font-semibold text-gray-900">{booking.fromLocation}</p>
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-dashed border-gray-300 ml-2 h-6"></div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Drop Location</p>
                        <p className="font-semibold text-gray-900">{booking.toLocation}</p>
                      </div>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Trip Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{booking.tripType}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Contact Number</p>
                      <p className="font-semibold text-gray-900">{booking.mobile}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Need Assistance?</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    Our support team is available 24/7 to help you with any questions 
                    or concerns about your ride.
                  </p>
                  <a
                    href="tel:7022237255"
                    className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-md"
                  >
                    <Phone className="w-5 h-5" />
                    7022 237 255
                  </a>
                </div>
              </div>
            </div>

            
          

          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-6">
             
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Summary
                </h3>
              </div>

              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-semibold text-gray-900">₹{booking.fare}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-semibold text-gray-900">₹{gst}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-green-600">
                    <span className="font-medium">Discount Applied</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-700">₹{total}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Amount payable to driver
                  </p>
                </div>

               
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Pay Now
                </button>

                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Travel Insurance Available
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Your booking is eligible for our comprehensive Travel Insurance Program 
                        for added peace of mind.
                      </p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}