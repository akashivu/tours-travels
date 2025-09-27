import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type VehiclePackage = {
  name: string;
  img: string;
  limitKm: number;
  baseFare: number;
  extraKmFare: number;
};

const vehicles: VehiclePackage[] = [
  {
    name: "Sedan",
    img: "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    limitKm: 300,
    baseFare: 4200,
    extraKmFare: 15,
  },
  {
    name: "SUV Ertiga CNG",
    img: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    limitKm: 300,
    baseFare: 5400,
    extraKmFare: 18,
  },
  {
    name: "SUV Kia Carens / Innova",
    img: "https://www.usedrive.in/upload/car/20221104124352_Innova.jpg",
    limitKm: 300,
    baseFare: 5699,
    extraKmFare: 18,
  },
  {
    name: "Luxury SUV Innova Crysta 6+1",
    img: "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    limitKm: 300,
    baseFare: 6199,
    extraKmFare: 19,
  },
  {
    name: "SUV Innova Crysta 7+1",
    img: "https://www.kushicabz.com/upload/car/ertiga-removebg-preview%20(1).png",
    limitKm: 300,
    baseFare: 6499,
    extraKmFare: 20,
  },
  {
    name: "SUV Innova Hycross",
    img: "https://www.kushicabz.com/upload/car/tempo%20traveler.jpg",
    limitKm: 300,
    baseFare: 6799,
    extraKmFare: 21,
  },
];

const routes = [
  "Bangalore To Mysore oneway taxi",
  "Bangalore To Chennai drop taxi",
  "Bangalore To Vellore drop taxi",
  "Bangalore To Salem drop taxi",
  "Bangalore To Madurai drop taxi",
  "Bangalore To Pondicherry drop taxi",
  "Bangalore To Coorg oneway taxi",
  "Bangalore To Coimbatore drop taxi",
  "Bangalore To Ooty drop taxi",
  "Bangalore To Hassan oneway taxi",
  "Bangalore To Chikmagalur oneway taxi",
  "Bangalore To Mangalore taxi",
  "Bangalore To Krishnagiri drop taxi",
  "Bangalore To Dharmapuri drop taxi",
  "Bangalore To Ambur drop taxi",
  "Bangalore To Tirupati oneway taxi",
  "Bangalore To Chittoor oneway taxi",
  "Bangalore To Ananthpura oneway taxi",
  "Bangalore To Hyderabad oneway taxi",
  "Bangalore To Chitradurga oneway taxi",
  "Bangalore To Dharwad oneway taxi",
  "Bangalore To Hubli oneway taxi",
  "Bangalore To Tiruvannamalai drop taxi",
  "Bangalore To Tirupattur drop taxi",
  "Bangalore Airport to Chennai drop taxi",
  "Bangalore Airport to Salem drop taxi",
  "Bangalore Airport to Vellore drop taxi",
  "Bangalore Airport to Tirupati oneway taxi",
  "Chennai To Bangalore drop taxi",
  "Coorg To Bangalore oneway taxi",
  "Vellore To Bangalore drop taxi",
  "Salem To Bangalore drop taxi",
  "Bangalore to Chennai"
];

export default function RoutesList() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
       
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-8">
          Book Oneway Taxi with{" "}
          <span className="text-yellow-500">Our Cabs</span>
        </h1>

       
        {!selectedRoute && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {routes.map((route, idx) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                key={idx}
                onClick={() => setSelectedRoute(route)}
                className="border border-gray-200 bg-white rounded-lg py-3 px-4 text-sm md:text-base font-medium shadow-sm hover:shadow-md transition duration-200"
              >
                {route}
              </motion.button>
            ))}
          </div>
        )}

       
        <AnimatePresence>
          {selectedRoute && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {selectedRoute}
                </h2>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back to Routes
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((v, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
                  >
                    <img
                      src={v.img}
                      alt={v.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {v.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {v.limitKm} km limit • Incl. Driver allowance & Tax
                      </p>
                      <p className="text-2xl font-bold text-yellow-600 mb-1">
                        ₹{v.baseFare}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Toll & Parking Exclu
                      </p>
                      <p className="text-sm text-gray-500">
                        Extra km: ₹{v.extraKmFare}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
