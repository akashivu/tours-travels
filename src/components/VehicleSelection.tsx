import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<
    "inclusion" | "exclusion" | "fare"
  >("inclusion");

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
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">No vehicles available</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
       
        
<div className="flex flex-wrap items-center justify-between bg-gray-800 text-white rounded-lg px-6 py-3 mb-8 text-sm md:text-base">
  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span>
      <strong>From :</strong> {pickup}
    </span>
    <span className="hidden md:inline-block mx-2">|</span>
    <span>
      <strong>To :</strong> {drop}{" "}
      {tripType && (
        <span className="font-semibold text-gray-300">
          ({tripType})
        </span>
      )}
    </span>
  </div>

  <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span>
      <strong>Pick up :</strong> {pickupDate}
    </span>
    <span className="hidden md:inline-block mx-2">|</span>
    <span>
      <strong>Time :</strong> {pickupTime}
    </span>
    <span className="hidden md:inline-block mx-2">|</span>
<span>
  <strong>Mobile :</strong> {mobile}
</span>
  </div>
  
  <button
    className="bg-gray-900 border border-white px-4 py-1 rounded-md hover:bg-gray-800 text-sm"
    onClick={() => {
      
    }}
  >
    Modify
  </button>
</div>


       
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {quotes.map((q: Quote, i: number) => {
            const isOpen = expanded === i;

            return (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col"
                >
                  
                  <img
                    src={q.imageUrl}
                    alt={q.vehicleName}
                    className="w-full h-48 object-contain bg-gray-50"
                  />

                 
                  <div className="p-6 flex flex-col flex-grow items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {q.vehicleName}
                    </h3>
                    <p className="text-gray-500 mt-1 text-sm">
                      {q.capacity} Seater • {q.bags} Bags •{" "}
                      {q.ac ? "AC" : "Non-AC"}
                    </p>

                    <div className="mt-4 flex flex-col items-center justify-between">
                      <p className="text-2xl font-bold text-gray-800 mb-2">
                        ₹{q.totalFare.toFixed(0)}{" "}
                        <span className="text-sm text-gray-500">
                          (incl. {q.distanceKm.toFixed(0)} km)
                        </span>
                      </p>

                      <div className="flex gap-3 mt-2">
                        <button
                          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition text-sm"
                          onClick={() => setExpanded(isOpen ? null : i)}
                        >
                          {isOpen ? "Close Details" : "View Details"}
                        </button>
                        <button
                          onClick={() => handleBook(q)}
                          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>

                 
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-gray-50 border-t border-gray-200 p-4"
                      >
                       
                        <div className="flex justify-center mb-4">
                          {["inclusion", "exclusion", "fare"].map((tab) => (
                            <button
                              key={tab}
                              onClick={() =>
                                setActiveTab(
                                  tab as "inclusion" | "exclusion" | "fare"
                                )
                              }
                              className={`px-4 py-2 text-sm rounded-full mx-1 transition-all duration-300 ${
                                activeTab === tab
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                              }`}
                            >
                              {tab === "inclusion" && "Inclusion"}
                              {tab === "exclusion" && "Exclusion"}
                              {tab === "fare" && "Fare Details"}
                            </button>
                          ))}
                        </div>

                       
                        <div className="space-y-2 text-sm text-gray-700">
                          {activeTab === "inclusion" &&
                            q.inclusion?.map((item: string, idx: number) => (
                              <p key={idx} className="flex items-center gap-2">
                                <span>{item}</span>
                              </p>
                            ))}

                          {activeTab === "exclusion" &&
                            q.exclusion?.map((item: string, idx: number) => (
                              <p key={idx} className="flex items-center gap-2">
                                 <span>{item}</span>
                              </p>
                            ))}

                          {activeTab === "fare" && (
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                              <p className="flex justify-between">
                                <span>Total Distance</span>
                                <span>{q.distanceKm} km</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Fare</span>
                                <span>₹{q.pricePerKm}/km</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Driver Allowance</span>
                                <span>₹{q.driverAllowance}</span>
                              </p>
                              <p className="flex justify-between">
                                <span>GST</span>
                                <span>{q.gstPercent}%</span>
                              </p>
                              <hr className="my-2" />
                              <p className="flex justify-between font-semibold text-lg">
                                <span>Total Fare</span>
                                <span>₹{q.totalFare}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
