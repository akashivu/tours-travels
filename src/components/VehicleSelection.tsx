import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Vehicle = {
  id: number;
  name: string;
  capacity: number;
  ac: boolean;
  oneWayRatePerKm: number;
  roundTripRatePerKm: number;
  imageUrl: string;
  features: string;
};

export default function VehicleSelection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/vehicles")
      .then(res => {
        const mappedVehicles = res.data.map((v: any) => ({
          id: v.id,
          name: v.name,
          capacity: v.capacity,
          ac: v.ac,
          oneWayRatePerKm: v.one_way_rate_per_km,
          roundTripRatePerKm: v.round_trip_rate_per_km,
          imageUrl: v.image_url,
          features: v.features
        }));
        setVehicles(mappedVehicles);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (vehicle: Vehicle) => {
    navigate("/booking", { state: { selectedVehicle: vehicle } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Choose Your Vehicle
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {vehicles.map(v => (
          <div
            key={v.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden"
            onClick={() => handleSelect(v)}
          >
            <div className="relative h-52">
              <img
                src={v.imageUrl}
                alt={v.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                <h3 className="text-white text-lg font-semibold">{v.name}</h3>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-gray-700"><span className="font-semibold">Capacity:</span> {v.capacity} passengers</p>
              <p className="text-gray-700"><span className="font-semibold">AC:</span> {v.ac ? "Yes" : "No"}</p>
              {v.features && <p className="text-gray-700"><span className="font-semibold">Features:</span> {v.features}</p>}

              <div className="flex justify-between items-center mt-2">
                <p className="text-green-700 font-bold">
                  One Way: ₹{v.oneWayRatePerKm}/km
                </p>
                <p className="text-blue-700 font-bold">
                  Round Trip: ₹{v.roundTripRatePerKm}/km
                </p>
              </div>

              <button
                className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => handleSelect(v)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
