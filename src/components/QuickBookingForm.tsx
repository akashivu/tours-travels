import { MapPinIcon, Square2StackIcon } from '@heroicons/react/24/outline';

export default function QuickBookingForm() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      
      {/* Form section */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <p className="text-xl font-bold text-black mb-2">
            Adiyogi Travels
          </p>
          <h1 className="text-3xl font-bold text-black mb-2">
            Book Your Journey
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            <span className="text-green-600 font-semibold">Up to 15% off</span> your first 5 Adiyogi travel rides. T&amp;Cs apply. *Valid within 15 days of signup.
          </p>

          {/* Input fields */}
          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <MapPinIcon className="h-6 w-6 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter location"
                className="w-full outline-none text-black"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <Square2StackIcon className="h-6 w-6 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter destination"
                className="w-full outline-none text-black"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300">
              See prices
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Image section */}
      <div className="flex-1">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Travel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
