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
    imageUrl: "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
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
    imageUrl: "https://www.kushicabz.com/upload/car/ertiga-removebg-preview%20(1).png",
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
   <div
      className="relative min-h-screen py-10 px-6"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    
      <div className="absolute inset-0 bg-black opacity-40"></div>

      
      <div className="relative z-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Available Vehicles
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {vehicles.map((v, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            <img
              src={v.imageUrl}
              alt={v.vehicleName}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-black">
                {v.vehicleName}
              </h3>
              <p className="text-gray-600 text-sm mt-1 mb-2">
                {v.capacity} Seats • {v.ac ? "AC" : "Non-AC"}
              </p>
              <p className="text-gray-500 text-sm flex-grow">{v.features}</p>
              <button className="mt-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
