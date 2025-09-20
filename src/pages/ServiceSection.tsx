import { FaPlaneDeparture, FaCar, FaBus, FaBuilding } from "react-icons/fa";

export default function ServiceSection() {
  return (
    <section className="bg-white py-16 px-6">
       <div className="absolute inset-0 opacity-5 flex justify-center items-center pointer-events-none">
        <FaCar className="text-gray-400 text-[300px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12">
          Services <span className="text-blue-600">We Offer</span>
        </h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaPlaneDeparture className="text-4xl mx-auto mb-4 text-gray-800" />
          <h3 className="text-lg font-bold mb-2">Airport Pickup/Drop</h3>
          <p className="text-gray-600 text-sm">
            Book Bangalore airport pickup/drop service with Vijay Tours &
            Travels. We offer the best and most affordable rates.
          </p>
        </div>

        
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaCar className="text-4xl mx-auto mb-4 text-gray-800" />
          <h3 className="text-lg font-bold mb-2">Local Packages</h3>
          <p className="text-gray-600 text-sm">
            Get the best service for your local transportation needs at
            affordable prices.
          </p>
        </div>

       
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaBus className="text-4xl mx-auto mb-4 text-gray-800" />
          <h3 className="text-lg font-bold mb-2">Outstation Cabs</h3>
          <p className="text-gray-600 text-sm">
            Enjoy a hassle-free, comfortable & affordable outstation taxi
            service from Bangalore.
          </p>
        </div>

       
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <FaBuilding className="text-4xl mx-auto mb-4 text-gray-800" />
          <h3 className="text-lg font-bold mb-2">Corporate Cab Service</h3>
          <p className="text-gray-600 text-sm">
            Reliable corporate cab rental services at competitive rates for your
            business travel needs.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
