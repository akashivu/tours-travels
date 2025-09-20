import { useState } from "react";

type Package = {
  id: number;
  title: string;
  duration: string;
  price: number;
  imageUrl: string;
  inclusions: string[];
  description: string;
};

const packages: Package[] = [
  {
    id: 1,
    title: "Ooty 3 Days 2 Nights",
    duration: "3D/2N",
    price: 7999,
    imageUrl: "https://images.pexels.com/photos/32366710/pexels-photo-32366710.jpeg",
    inclusions: ["Hotel Stay", "Breakfast & Dinner", "Sightseeing", "Cab Transfers"],
    description: "Explore the Queen of Hills with visits to Botanical Garden, Ooty Lake, Dodabetta Peak and more."
  },
  {
    id: 2,
    title: "Coorg Nature Escape",
    duration: "2D/1N",
    price: 5999,
    imageUrl: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg",
    inclusions: ["Resort Stay", "Meals Included", "Coffee Plantation Tour", "Local Sightseeing"],
    description: "Perfect weekend getaway with waterfalls, lush greenery, and coffee estates."
  },
  {
    id: 3,
    title: "Mysore Heritage Tour",
    duration: "2D/1N",
    price: 4999,
    imageUrl: "https://images.pexels.com/photos/164209/pexels-photo-164209.jpeg",
    inclusions: ["Hotel Stay", "Meals", "Palace Visit", "Transport"],
    description: "Experience royal Mysore with palace tour, Chamundi Hills, and Brindavan Gardens."
  },
  {
  id: 4,
  title: "Chikmagalur Coffee Retreat",
  duration: "3D/2N",
  price: 6999,
  imageUrl: "https://images.pexels.com/photos/29890282/pexels-photo-29890282.jpeg",
  inclusions: ["Homestay in Coffee Estate", "Meals Included", "Trekking", "Waterfalls Visit"],
  description: "Relax amidst coffee plantations, enjoy trekking, Mullayanagiri peak visit, and hidden waterfalls."
},
{
  id: 5,
  title: "Goa Beach Getaway",
  duration: "4D/3N",
  price: 9999,
  imageUrl: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  inclusions: ["Beach Resort Stay", "Breakfast", "Cruise Ride", "Water Sports"],
  description: "Sun, sand, and sea – enjoy water sports, cruise rides, nightlife, and famous beaches of Goa."
},
{
  id: 6,
  title: "Kerala Backwater Tour",
  duration: "3D/2N",
  price: 11999,
  imageUrl: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  inclusions: ["Houseboat Stay", "Meals Included", "Backwater Cruise", "Cultural Programs"],
  description: "Experience serene backwaters of Alleppey in a traditional houseboat with authentic Kerala cuisine."
},
{
  id: 7,
  title: "Hampi Heritage Trail",
  duration: "2D/1N",
  price: 5499,
  imageUrl: "https://images.pexels.com/photos/27719238/pexels-photo-27719238.jpeg",
  inclusions: ["Hotel Stay", "Meals", "Guided Temple Tour", "Transport"],
  description: "Explore the UNESCO World Heritage site with ancient ruins, Virupaksha temple, and coracle rides."
}

];

export default function HolidayPackages() {
  const [selected, setSelected] = useState<Package | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Holiday Packages</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
            onClick={() => setSelected(pkg)}
          >
            <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-52 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-gray-600 text-sm">{pkg.duration}</p>
              <p className="text-indigo-600 font-bold text-xl mt-2">₹{pkg.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <img src={selected.imageUrl} alt={selected.title} className="w-full h-56 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{selected.title}</h2>
            <p className="text-gray-600">{selected.description}</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              {selected.inclusions.map((inc, i) => (
                <li key={i}>{inc}</li>
              ))}
            </ul>
            <p className="text-indigo-600 font-bold text-xl mt-4">₹{selected.price}</p>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              Book Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
