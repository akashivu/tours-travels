
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, MapPin, Calendar, Clock, Car } from "lucide-react";
import toast from "react-hot-toast";

interface AirportRide {
  id: number;
  vehicleName: string;
  pricePerKm: number;
  imageUrl: string;
  capacity: number;
  luggage: number;
}

export default function Airport() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state as any;

  const {
    pickup,
    drop,
    pickupDate,
    pickupTime,
    mobile,
  } = bookingData || {};

  const [vehicles, setVehicles] = useState<AirportRide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pickup || !drop) {
      navigate("/");
      return;
    }

    fetchAirportVehicles();
  }, []);

  const fetchAirportVehicles = async () => {
    try {
      setLoading(true);

     const response = await axios.get(
  "https://adiyogi-travels.onrender.com/api/airport/vehicles"
);

      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch airport vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle: AirportRide) => {
    navigate("/booking", {
      state: {
        selectedVehicle: vehicle,
        pickup,
        drop,
        pickupDate,
        pickupTime,
        mobile,
        tripType: "airport",
        totalFare: vehicle.pricePerKm,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-blue-600 text-lg font-semibold">
          <Loader2 className="animate-spin w-6 h-6" />
          Loading airport vehicles...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Airport Transfer Vehicles
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <MapPin className="text-green-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-semibold text-gray-800">{pickup}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <MapPin className="text-red-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Drop</p>
                <p className="font-semibold text-gray-800">{drop}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <Calendar className="text-blue-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-800">{pickupDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <Clock className="text-purple-600 w-5 h-5 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-800">{pickupTime}</p>
              </div>
            </div>
          </div>
        </div>


        {vehicles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <Car className="mx-auto w-14 h-14 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Vehicles Available
            </h2>
            <p className="text-gray-500">
              Please try another route or time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.vehicleName}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {vehicle.vehicleName}
                  </h2>

                  <div className="space-y-2 text-gray-600 mb-5">
                    <p>👥 Capacity: {vehicle.capacity} People</p>
                    <p>🧳 Luggage: {vehicle.luggage} Bags</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{vehicle.pricePerKm}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelectVehicle(vehicle)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Select Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
