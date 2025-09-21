type Vehicle = {
  vehicleName: string;
  capacity: number;
  ac: boolean;
  imageUrl: string;
  features: string;
};

const vehicles: Vehicle[] = [
  {
    vehicleName: "Toyota Etios",
    capacity: 4,
    ac: true,
    imageUrl:
      "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    features: "Compact, Fuel Efficient",
  },
  {
    vehicleName: "Swift Dzire",
    capacity: 4,
    ac: true,
    imageUrl: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    features: "Compact, Fuel Efficient",
  },
  {
    vehicleName: "SUV Toyota Innova",
    capacity: 6,
    ac: true,
    imageUrl: "https://www.usedrive.in/upload/car/20221104124352_Innova.jpg",
    features: "Spacious, Comfortable, Music System",
  },
  {
    vehicleName: "Toyota Crysta",
    capacity: 6,
    ac: true,
    imageUrl: "https://www.usedrive.in/upload/car/Innova%20crista.jpg",
    features: "Luxury, Comfortable, Music System",
  },
  {
    vehicleName: "Tempo Traveller",
    capacity: 12,
    ac: true,
    imageUrl: "https://www.usedrive.in/upload/car/tempo%20traveler.jpg",
    features: "Large group travel, AC, Pushback seats",
  },
  {
    vehicleName: "Ertiga",
    capacity: 6,
    ac: true,
    imageUrl:
      "https://www.kushicabz.com/upload/car/ertiga-removebg-preview%20(1).png",
    features: "Compact, Comfortable, AC",
  },
  {
    vehicleName: "Crysta",
    capacity: 6,
    ac: true,
    imageUrl: "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    features: "Luxury, Comfortable, AC",
  },
];

export default function OurVehicles() {
  return (
    <div className="relative min-h-screen py-12 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          <span className="text-white">Our Available</span>{" "}
          <span className="text-blue-400">Vehicles</span>
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map((v, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-center text-center p-6"
            >
              
              <img
                src={v.imageUrl}
                alt={v.vehicleName}
                className="w-full h-40 object-contain mb-4"
              />

            
              <h3 className="text-xl font-bold text-white">{v.vehicleName}</h3>
              <p className="text-gray-300 text-sm mt-1">
                {v.capacity} Seats • {v.ac ? "AC" : "Non-AC"}
              </p>
              <p className="text-gray-400 text-sm mt-1">{v.features}</p>

             
              <button className="mt-5 px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
