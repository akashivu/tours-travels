import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Wind, MapPin, Calendar, Clock, Edit3, X, Check, Info } from "lucide-react";

type Quote = {
  id: number;
  vehicleName: string;
  capacity: number;
  bags: number;
  ac: boolean;
  imageUrl: string;
  includedKm: number;
  pricePerKm: number;
  extraKmFare: number;
  driverAllowance: number;
  gstPercent: number;
  totalFare: number;
  distanceKm: number;
  inclusion: string[];
  exclusion: string[];
};

export default function VehicleSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quotes, pickup, drop, tripType, pickupDate, pickupTime } =
    location.state || { quotes: [] };

  const [selectedVehicle, setSelectedVehicle] = useState<Quote | null>(null);

  const handleBook = (quote: Quote) => {
    navigate("/booking", {
      state: {
        selectedVehicle: quote,
        pickup,
        drop,
        tripType,
        pickupDate,
        pickupTime,
        distanceKm: quote.distanceKm,
        totalFare: quote.totalFare,
      },
    });
  };

  if (!quotes || quotes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 text-lg font-semibold">No vehicles available</p>
          <p className="text-gray-500 text-sm mt-2">Please try searching again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">

      {/* ── Sticky header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">

            {/* Route + date info */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-4 text-sm min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{pickup}</span>
                <span className="text-gray-400 shrink-0">→</span>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{drop}</span>
                {tripType && (
                  <span className="hidden sm:inline px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium shrink-0">
                    {tripType}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {pickupDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  {pickupTime}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition text-xs sm:text-sm font-medium shrink-0">
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Modify
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

        {/* Page heading */}
        <div className="mb-5 sm:mb-8">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-orange-500">
            Available Vehicles
          </p>
          <h1 className="mt-1 sm:mt-2 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Choose Your Vehicle
          </h1>
          <p className="mt-1.5 sm:mt-3 text-sm sm:text-lg text-gray-600 max-w-3xl">
            Compare vehicles, pricing and comfort before booking.
          </p>
          <div className="mt-3 sm:mt-5 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs">✓ Verified Drivers</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">✓ Transparent Pricing</span>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs">✓ Comfortable Vehicles</span>
            <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs">✓ 24×7 Support</span>
          </div>
        </div>

        {/* ── Vehicle cards ── */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {quotes.map((quote: Quote, i: number) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Main row */}
              <div className="flex items-stretch">

                {/* Left — vehicle image */}
                <div className="w-24 sm:w-44 shrink-0 bg-gray-50 flex items-center justify-center p-2 sm:p-4 border-r border-gray-100">
                  <img
                    src={quote.imageUrl}
                    alt={quote.vehicleName}
                    className="w-full h-16 sm:h-28 object-contain"
                  />
                </div>

                {/* Middle — name + specs */}
                <div className="flex-1 px-3 py-3 sm:px-6 sm:py-5 min-w-0">
                  <h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-tight truncate">
                    {quote.vehicleName}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">or similar · Sedan</p>

                  {/* Specs row */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      {quote.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                      {quote.bags}
                    </span>
                    {quote.ac && (
                      <span className="flex items-center gap-1">
                        <Wind className="w-3 h-3 sm:w-4 sm:h-4" />
                        A/C
                      </span>
                    )}
                    <span className="text-green-600 font-medium text-xs">
                      {quote.includedKm} km
                    </span>
                  </div>

                  {/* Badges — hidden on mobile to save space */}
                  <div className="hidden sm:flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                      <Check className="w-3 h-3" /> Free cancellation
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-500 text-xs font-medium">
                      <Info className="w-3 h-3" /> Toll extra
                    </span>
                  </div>

                  {/* Mobile-only: Free cancellation single line */}
                  <p className="sm:hidden text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Free cancellation
                  </p>
                </div>

                {/* Right — price + book */}
                <div className="w-28 sm:w-48 shrink-0 border-l border-gray-100 flex flex-col items-end justify-between px-3 py-3 sm:px-6 sm:py-5">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5 hidden sm:block">Starting from</p>
                    <p className="text-lg sm:text-3xl font-bold text-gray-900">
                      ₹{quote.totalFare.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                      for {quote.distanceKm} km
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                      Toll &amp; parking extra
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedVehicle(quote)}
                    className="mt-2 sm:mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition"
                  >
                    Book now
                  </button>
                </div>
              </div>

              {/* Footer row — extra charges */}
              <div className="border-t border-gray-100 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap gap-3 sm:gap-6 text-xs text-gray-500 bg-gray-50/60">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Extra km <span className="font-semibold text-gray-700 ml-1">₹{quote.extraKmFare}/km</span>
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Driver allowance <span className="font-semibold text-gray-700 ml-1">₹{quote.driverAllowance}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  GST <span className="font-semibold text-gray-700 ml-1">{quote.gstPercent}%</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Detail modal (logic unchanged) ── */}
      <AnimatePresence>
        {selectedVehicle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedVehicle(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-2 sm:inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
            >
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 text-white">
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                    <img src={selectedVehicle.imageUrl} alt={selectedVehicle.vehicleName} className="w-full h-full object-contain p-1.5 sm:p-2" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{selectedVehicle.vehicleName}</h2>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-blue-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {selectedVehicle.capacity} Seater
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {selectedVehicle.bags} Bags
                      </span>
                      {selectedVehicle.ac && (
                        <span className="flex items-center gap-1">
                          <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          AC
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Fare Breakdown
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-semibold">{selectedVehicle.distanceKm} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate per km</span>
                      <span className="font-semibold">₹{selectedVehicle.pricePerKm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver Allowance</span>
                      <span className="font-semibold">₹{selectedVehicle.driverAllowance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST ({selectedVehicle.gstPercent}%)</span>
                      <span className="font-semibold">
                        ₹{(selectedVehicle.totalFare * selectedVehicle.gstPercent / (100 + selectedVehicle.gstPercent)).toFixed(0)}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-blue-200 flex justify-between text-base sm:text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">₹{selectedVehicle.totalFare.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-green-50 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      Included
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                      {selectedVehicle.inclusion?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 text-xs sm:text-sm">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      Not Included
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                      {selectedVehicle.exclusion?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                <button
                  onClick={() => handleBook(selectedVehicle)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                >
                  Book Now - ₹{selectedVehicle.totalFare.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}