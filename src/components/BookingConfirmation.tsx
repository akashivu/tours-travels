import { CheckCircle, Car, Phone, CreditCard, Shield, X, Loader2, Clock, Info } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-gray-700 font-medium mb-3">No booking found</p>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
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

  /* ── shared classes ── */
  const cardCls = "bg-white border border-gray-100 rounded-xl overflow-hidden";
  const metaItemCls = "p-3 bg-gray-50 border border-gray-100 rounded-lg";
  const labelCls = "text-[11px] text-gray-400 uppercase tracking-wide mb-1";
  const valueCls = "text-sm font-medium text-gray-900";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
              <p className="text-xs text-gray-400 hidden sm:block">Your ride is scheduled and confirmed</p>
            </div>
          </div>
          <button
            onClick={handleCancelBooking}
            disabled={isCancelling}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCancelling ? (
              <><Loader2 className="w-3 h-3 animate-spin" />Cancelling…</>
            ) : (
              <><X className="w-3 h-3" /><span className="hidden sm:inline">Cancel booking</span><span className="sm:hidden">Cancel</span></>
            )}
          </button>
        </div>
      </div>

      {/* ── Status strip ── */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <p className="text-xs text-green-700">
            Driver assigned 1 hour before pickup · You'll receive a notification with driver details
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ── LEFT ── */}
        <div className="space-y-4">

          {/* Trip details card */}
          <div className={cardCls}>
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
              <Car className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Trip details</span>
            </div>

            <div className="p-5 space-y-4">

              {/* Route */}
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <div>
                    <p className={labelCls}>Pickup location</p>
                    <p className={valueCls}>{booking.fromLocation}</p>
                  </div>
                </div>
                <div className="border-l border-dashed border-gray-300 ml-0.5 h-4 mt-1 mb-1" />
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <div>
                    <p className={labelCls}>Drop location</p>
                    <p className={valueCls}>{booking.toLocation}</p>
                  </div>
                </div>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className={metaItemCls}>
                  <p className={labelCls}>Pickup date</p>
                  <p className={valueCls}>{booking.pickupDate}</p>
                </div>
                <div className={metaItemCls}>
                  <p className={labelCls}>Pickup time</p>
                  <p className={valueCls}>{booking.pickupTime}</p>
                </div>
                <div className={metaItemCls}>
                  <p className={labelCls}>Vehicle</p>
                  <p className={valueCls}>{booking.vehicleName}</p>
                </div>
                <div className={metaItemCls}>
                  <p className={labelCls}>Trip type</p>
                  <p className={`${valueCls} capitalize`}>{booking.tripType}</p>
                </div>
                <div className={`${metaItemCls} col-span-2`}>
                  <p className={labelCls}>Contact number</p>
                  <p className={valueCls}>{booking.mobile}</p>
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  A professional driver will be assigned to your trip 1 hour before the scheduled pickup time.
                </p>
              </div>
            </div>
          </div>

          {/* Support card */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-0.5">Need help with your booking?</p>
              <p className="text-xs text-gray-400">Support team available 24/7</p>
            </div>
            <a
              href="tel:7022237255"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              7022 237 255
            </a>
          </div>
        </div>

        {/* ── RIGHT: Payment ── */}
        <div>
          <div className={`${cardCls} lg:sticky lg:top-5`}>
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Payment summary</span>
            </div>

            <div className="p-5 space-y-1">
              <div className="flex justify-between py-2.5 border-b border-gray-50">
                <span className="text-sm text-gray-500">Base fare</span>
                <span className="text-sm font-medium text-gray-900">₹{booking.fare}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-50">
                <span className="text-sm text-gray-500">GST (18%)</span>
                <span className="text-sm font-medium text-gray-900">₹{gst}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-sm text-green-600 font-medium">Discount</span>
                <span className="text-sm font-medium text-green-600">−₹{discount}</span>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between items-baseline">
                <span className="text-sm font-medium text-gray-900">Total</span>
                <span className="text-xl font-medium text-gray-900">₹{total}</span>
              </div>

              {/* No advance payment */}
              <div className="mt-4 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">No advance payment required</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Pay directly to the driver or through company instructions after confirmation.
                    </p>
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