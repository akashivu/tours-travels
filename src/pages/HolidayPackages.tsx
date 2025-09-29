
import { useState } from "react";

type Package = {
  id: number;
  title: string;
  duration: string;
  price: number;
  imageUrl: string;
  inclusions: string[];
  description: string;
  rating: number;
};

const packages: Package[] = [
  {
    id: 1,
    title: "Ooty 3 Days 2 Nights",
    duration: "3D/2N",
    price: 7999,
    imageUrl: "https://images.pexels.com/photos/32366710/pexels-photo-32366710.jpeg",
    inclusions: ["Hotel Stay", "Breakfast & Dinner", "Sightseeing", "Cab Transfers"],
    description:
      "Explore the Queen of Hills with visits to Botanical Garden, Ooty Lake, Dodabetta Peak and more.",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Coorg Nature Escape",
    duration: "2D/1N",
    price: 5999,
    imageUrl: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg",
    inclusions: ["Resort Stay", "Meals Included", "Coffee Plantation Tour", "Local Sightseeing"],
    description:
      "Perfect weekend getaway with waterfalls, lush greenery, and coffee estates.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Mysore Heritage Tour",
    duration: "2D/1N",
    price: 4999,
    imageUrl: "https://images.pexels.com/photos/164209/pexels-photo-164209.jpeg",
    inclusions: ["Hotel Stay", "Meals", "Palace Visit", "Transport"],
    description: "Experience royal Mysore with palace tour, Chamundi Hills, and Brindavan Gardens.",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Chikmagalur Coffee Retreat",
    duration: "3D/2N",
    price: 6999,
    imageUrl: "https://images.pexels.com/photos/29890282/pexels-photo-29890282.jpeg",
    inclusions: ["Homestay in Coffee Estate", "Meals Included", "Trekking", "Waterfalls Visit"],
    description:
      "Relax amidst coffee plantations, enjoy trekking, Mullayanagiri peak visit, and hidden waterfalls.",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Goa Beach Getaway",
    duration: "4D/3N",
    price: 9999,
    imageUrl: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
    inclusions: ["Beach Resort Stay", "Breakfast", "Cruise Ride", "Water Sports"],
    description:
      "Sun, sand, and sea – enjoy water sports, cruise rides, nightlife, and famous beaches of Goa.",
    rating: 4.8,
  },
  {
    id: 6,
    title: "Kerala Backwater Tour",
    duration: "3D/2N",
    price: 11999,
    imageUrl: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    inclusions: ["Houseboat Stay", "Meals Included", "Backwater Cruise", "Cultural Programs"],
    description:
      "Experience serene backwaters of Alleppey in a traditional houseboat with authentic Kerala cuisine.",
    rating: 4.9,
  },
  {
    id: 7,
    title: "Hampi Heritage Trail",
    duration: "2D/1N",
    price: 5499,
    imageUrl: "https://images.pexels.com/photos/27719238/pexels-photo-27719238.jpeg",
    inclusions: ["Hotel Stay", "Meals", "Guided Temple Tour", "Transport"],
    description:
      "Explore the UNESCO World Heritage site with ancient ruins, Virupaksha temple, and coracle rides.",
    rating: 4.7,
  },
];

export default function HolidayPackages() {
  const [selected, setSelected] = useState<Package | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-black border-2 border-gray-800 rounded-full px-6 py-3 mb-6">
          <div className="flex items-center gap-2 mr-3">
            <div className="w-8 h-0.5 bg-white"></div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-white font-semibold text-lg">Holiday Packages</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Our Premium Packages
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover handpicked destinations with exceptional service and unforgettable experiences
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200"
            onClick={() => setSelected(pkg)}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Duration Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-gray-900 font-bold text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pkg.duration}
                </span>
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title & Rating */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{pkg.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {pkg.description}
              </p>

              {/* Inclusions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {pkg.inclusions.slice(0, 3).map((inc, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {inc}
                  </span>
                ))}
                {pkg.inclusions.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    +{pkg.inclusions.length - 3} more
                  </span>
                )}
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-orange-500">₹{pkg.price.toLocaleString()}</p>
                </div>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-lg hover:shadow-xl">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative h-72">
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(selected.rating) ? 'text-yellow-400' : 'text-white/50'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-white font-semibold">{selected.rating}</span>
                </div>
                <h2 className="text-3xl font-bold text-white">{selected.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">About This Package</h3>
                <p className="text-gray-600 leading-relaxed">{selected.description}</p>
              </div>

              {/* Inclusions */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selected.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration & Price */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p className="text-lg font-bold text-gray-900">{selected.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-orange-500">₹{selected.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}