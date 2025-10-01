import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, Clock, Shield, IndianRupee, Info } from "lucide-react";

type VehiclePackage = {
  name: string;
  img: string;
  limitKm: number;
  baseFare: number;
  extraKmFare: number;
  capacity: string;
  features: string[];
};

const vehicles: VehiclePackage[] = [
  {
    name: "Sedan",
    img: "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    limitKm: 300,
    baseFare: 4200,
    extraKmFare: 15,
    capacity: "4 Passengers",
    features: ["AC", "Comfortable", "Fuel Efficient"]
  },
  {
    name: "SUV Ertiga CNG",
    img: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    limitKm: 300,
    baseFare: 5400,
    extraKmFare: 18,
    capacity: "6 Passengers",
    features: ["AC", "Spacious", "Eco-Friendly"]
  },
  {
    name: "SUV Kia Carens / Innova",
    img: "https://www.kushicabz.com/upload/car/20221104124352_Innova.jpg",
    limitKm: 300,
    baseFare: 5699,
    extraKmFare: 18,
    capacity: "6-7 Passengers",
    features: ["Premium", "Extra Legroom", "Smooth Ride"]
  },
  {
    name: "Luxury SUV Innova Crysta 6+1",
    img: "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    limitKm: 300,
    baseFare: 6199,
    extraKmFare: 19,
    capacity: "6 Passengers + Driver",
    features: ["Luxury", "Premium Interiors", "Top Comfort"]
  },
  {
    name: "SUV Innova Crysta 7+1",
    img: "https://www.kushicabz.com/upload/car/ertiga-removebg-preview%20(1).png",
    limitKm: 300,
    baseFare: 6499,
    extraKmFare: 20,
    capacity: "7 Passengers + Driver",
    features: ["Family Size", "Luxury", "Spacious"]
  },
  {
    name: "SUV Innova Hycross",
    img: "https://www.kushicabz.com/upload/car/tempo%20traveler.jpg",
    limitKm: 300,
    baseFare: 6799,
    extraKmFare: 21,
    capacity: "7 Passengers",
    features: ["Latest Model", "Premium", "Hybrid"]
  },
];

const routes = [
  "Bangalore To Mysore",
  "Bangalore To Chennai",
  "Bangalore To Vellore",
  "Bangalore To Salem",
  "Bangalore To Madurai",
  "Bangalore To Pondicherry",
  "Bangalore To Coorg",
  "Bangalore To Coimbatore",
  "Bangalore To Ooty",
  "Bangalore To Hassan",
  "Bangalore To Chikmagalur",
  "Bangalore To Mangalore",
  "Bangalore To Krishnagiri",
  "Bangalore To Dharmapuri",
  "Bangalore To Ambur",
  "Bangalore To Tirupati",
  "Bangalore To Chittoor",
  "Bangalore To Ananthpura",
  "Bangalore To Hyderabad",
  "Bangalore To Chitradurga",
  "Bangalore To Dharwad",
  "Bangalore To Hubli",
  "Bangalore To Tiruvannamalai",
  "Bangalore To Tirupattur",
  "Airport To Chennai",
  "Airport To Salem",
  "Airport To Vellore",
  "Airport To Tirupati",
  "Chennai To Bangalore",
  "Coorg To Bangalore",
  "Vellore To Bangalore",
  "Salem To Bangalore"
];

export default function RoutesList() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = routes.filter(route =>
    route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Premium Cabs</h1>
                <p className="text-sm text-slate-600">One-Way Taxi Services</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRoute ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Choose Your Destination
              </h2>
              <p className="text-slate-600 text-lg">
                Select from our popular routes and get instant pricing
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search your destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 shadow-sm text-base transition-all duration-200"
                />
              </div>
            </div>

            {/* Routes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredRoutes.map((route, idx) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  key={idx}
                  onClick={() => setSelectedRoute(route)}
                  className="group relative bg-white rounded-2xl py-6 px-5 text-left font-medium shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-slate-900 font-semibold mb-1 group-hover:text-amber-600 transition-colors">
                        {route}
                      </div>
                      <div className="text-xs text-slate-500">One-way drop taxi</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg group-hover:bg-amber-500 transition-colors">
                      <svg
                        className="w-4 h-4 text-amber-600 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoute}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Route Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-amber-600 hover:text-amber-700 font-medium mb-4 flex items-center gap-2 transition-colors group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all routes
                </button>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-amber-500" />
                  <h2 className="text-3xl font-bold text-slate-900">
                    {selectedRoute}
                  </h2>
                </div>
                <p className="text-slate-600 mt-2">Select your preferred vehicle from our fleet</p>
              </div>

              {/* Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Vehicle Image */}
                    <div className="relative h-52 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                      <img
                        src={vehicle.img}
                        alt={vehicle.name}
                        className="w-full h-full object-contain p-4 transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                        {vehicle.capacity}
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {vehicle.name}
                      </h3>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.map((feature, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4">
                        <div className="flex items-baseline gap-2 mb-2">
                          <IndianRupee className="w-5 h-5 text-amber-600 mt-1" />
                          <span className="text-4xl font-bold text-slate-900">
                            {vehicle.baseFare.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                          Up to {vehicle.limitKm} km included
                        </p>
                        <div className="flex items-center justify-between text-sm pt-3 border-t border-amber-200">
                          <span className="text-slate-600">Extra per km</span>
                          <span className="font-bold text-slate-900 flex items-center">
                            <IndianRupee className="w-3 h-3" />
                            {vehicle.extraKmFare}
                          </span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-start gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-lg">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>Includes driver allowance & GST. Toll & parking charges extra.</span>
                      </div>

                      {/* Book Button */}
                      <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]">
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}