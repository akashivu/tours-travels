import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";


type PackageItem = {
  hours?: string;
  km?: string;
  price?: string;
  extra?: string;
  note?: string;
};

type Vehicle = {
  name: string;
  image: string;
  offer?: string;
  offerText?: string;
  localPackages: PackageItem[];
  outstation: PackageItem[];
};


const vehicles: Vehicle[] = [
  {
    name: "Toyota Etios",
    image:
      "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    offer: "LOCAL",
    offerText: "Hourly rental packages",
    localPackages: [
      { hours: "4 hr / 40 km", price: "₹1200" },
      { hours: "8 hr / 80 km", price: "₹2000" },
      { hours: "12 hr / 120 km", price: "₹3000" },
      { extra: "Extra km ₹20 / Extra hr ₹200" },
      { note: "Toll & parking separate" }
    ],
    outstation: [
      { km: "300 km limit", price: "₹4200 (Incl. Driver Bata & Tax)" },
      { extra: "Extra km ₹15" },
      { note: "Toll & parking separate" }
    ]
  },
  {
    name: "Swift Dzire",
    image: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    offer: "LOCAL",
    offerText: "Hourly rental packages",
    localPackages: [
      { hours: "4 hr / 40 km", price: "₹1200" },
      { hours: "8 hr / 80 km", price: "₹2000" },
      { hours: "12 hr / 120 km", price: "₹3000" },
      { extra: "Extra km ₹20 / Extra hr ₹200" }
    ],
    outstation: [
      { km: "300 km limit", price: "₹4200 (Incl. Driver Bata & Tax)" },
      { extra: "Extra km ₹15" }
    ]
  },
  {
    name: "Toyota Innova",
    image: "https://www.usedrive.in/upload/car/20221104124352_Innova.jpg",
    offer: "LOCAL",
    offerText: "Hourly rental packages",
    localPackages: [
      { hours: "4 hr / 40 km", price: "₹2000" },
      { hours: "8 hr / 80 km", price: "₹3200" },
      { hours: "12 hr / 120 km", price: "₹4200" },
      { extra: "Extra km ₹25 / Extra hr ₹250" }
    ],
    outstation: [
      { km: "300 km limit", price: "₹5699 (Incl. Driver Bata & Tax)" },
      { extra: "Extra km ₹18" }
    ]
  },
  {
    name: "Innova Crysta",
    image: "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    offer: "LOCAL",
    offerText: "Hourly rental packages",
    localPackages: [
      { hours: "4 hr / 40 km", price: "₹2400" },
      { hours: "8 hr / 80 km", price: "₹3400" },
      { hours: "12 hr / 120 km", price: "₹4400" },
      { extra: "Extra km ₹30 / Extra hr ₹275" }
    ],
    outstation: [
      { km: "300 km limit", price: "₹6199 (Incl. Driver allownace & Tax)" },
      { extra: "Extra km ₹19" }
    ]
  },
  {
    name: "Tempo Traveller",
    image: "https://www.usedrive.in/upload/car/tempo%20traveler.jpg",
    offer: "LOCAL",
    offerText: "Perfect for group trips",
    localPackages: [
      { hours: "4 hr / 40 km", price: "₹2200" },
      { hours: "8 hr / 80 km", price: "₹3400" },
      { hours: "12 hr / 120 km", price: "₹4400" },
      { extra: "Extra km ₹30 / Extra hr ₹275" }
    ],
    outstation: [
      { km: "300 km limit", price: "₹6799 (Incl. Driver allowance & Tax)" },
      { extra: "Extra km ₹21" }
    ]
  }
];


export default function OurVehicles() {
  const [active, setActive] = useState<number | null>(null);
  const [tab, setTab] = useState<"local" | "outstation">("local");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

 
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center  mb-8">Our Vehicles</h2>

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {vehicles.map((car, i) => (
          <div key={i} className="flex-none w-80 sm:w-96">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-3xl shadow-md p-5 relative overflow-hidden hover:shadow-xl transition select-none"
            >
              
              {car.offer && (
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {car.offer}
                </div>
              )}

              
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-contain mt-3 pointer-events-none"
              />

              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-sm text-gray-600">{car.offerText}</p>
              </div>

             
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(active === i ? null : i);
                }}
                className="w-full mt-4 bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition"
              >
                {active === i ? "Hide Details" : "View Details"}
              </button>

             
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 p-3 bg-gray-50 rounded-lg text-sm"
                  >
                    
                    <div className="flex justify-center gap-4 mb-3">
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tab === "local"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTab("local");
                        }}
                      >
                        Local Packages
                      </button>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tab === "outstation"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTab("outstation");
                        }}
                      >
                        Outstation
                      </button>
                    </div>

                   
                    <div className="space-y-3">
                      {(tab === "local" ? car.localPackages : car.outstation).map(
                        (p, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white rounded-xl border shadow-sm px-4 py-3 hover:shadow-md transition"
                          >
                            <span className="text-gray-800 font-medium">
                              {p.hours ?? p.km ?? p.extra ?? p.note}
                            </span>
                            {p.price && (
                              <span className="text-orange-600 font-semibold">
                                {p.price}
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>

      <style>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`}</style>
    </div>
  );
}
