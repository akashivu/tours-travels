import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Wind, MapPin, Calendar, Clock, Phone, Edit3, X, Check, Info } from "lucide-react";

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
  const { quotes, pickup, drop, tripType, pickupDate, pickupTime, mobile } =
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
      {/* Trip Summary Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900">{pickup}</span>
                <span className="text-gray-400">→</span>
                <span className="font-semibold text-gray-900">{drop}</span>
                {tripType && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {tripType}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {pickupDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {pickupTime}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {mobile}
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition text-sm font-medium">
              <Edit3 className="w-4 h-4" />
              Modify
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Select Your Vehicle</h1>
          <p className="text-gray-600">Choose from our premium fleet</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote: Quote, i: number) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 cursor-pointer"
              onClick={() => setSelectedVehicle(quote)}
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50">
                <img src={quote.imageUrl} alt={quote.vehicleName} className="w-full h-full object-contain p-4" />
                {quote.ac && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                    <Wind className="w-3 h-3" /> AC
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{quote.vehicleName}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {quote.capacity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {quote.bags}
                  </span>
                  <span className="text-green-600 font-medium">{quote.includedKm} km</span>
                </div>

                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">₹{quote.totalFare.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Incl. all taxes</div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold text-sm">
                    View Details
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                  Extra km: ₹{quote.extraKmFare}/km
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <button 
                  onClick={() => setSelectedVehicle(null)} 
                  className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                    <img src={selectedVehicle.imageUrl} alt={selectedVehicle.vehicleName} className="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedVehicle.vehicleName}</h2>
                    <div className="flex items-center gap-4 text-sm text-blue-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedVehicle.capacity} Seater
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {selectedVehicle.bags} Bags
                      </span>
                      {selectedVehicle.ac && (
                        <span className="flex items-center gap-1">
                          <Wind className="w-4 h-4" />
                          AC
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Fare Breakdown */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Fare Breakdown
                  </h3>
                  <div className="space-y-3 text-sm">
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
                    <div className="pt-3 border-t border-blue-200 flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">₹{selectedVehicle.totalFare.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Inclusion/Exclusion */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      Included
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {selectedVehicle.inclusion?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      Not Included
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {selectedVehicle.exclusion?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <button 
                  onClick={() => handleBook(selectedVehicle)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
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