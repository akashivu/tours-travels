import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

type Quote = {
  vehicleName: string;
  capacity: number;
  ac: boolean;
  ratePerKm: number;
  distanceKm: number;
  totalFare: number;
  imageUrl: string;
  features: string;
};

export default function VehicleSelection() {
  const location = useLocation();
   const navigate = useNavigate();
  const { quotes, pickup, drop, tripType, pickupDate, pickupTime, mobile } =
    location.state || { quotes: [] };

  const handleBook = async (quote: Quote) => {
    try {
      const res = await axios.post("http://localhost:8080/api/bookings/confirm", {
        pickup,
        dropoff: drop,
        distanceKm: quote.distanceKm,
        fare: quote.totalFare,
        vehicleName: quote.vehicleName,
        pickupDate,
        pickupTime,
        mobile,
      });
      navigate("/confirmation", { state: { booking: res.data } });
    } catch {
      alert("Error confirming booking");
    }
  };
  console.log("Rendering VehicleSelection component");
  if (!quotes || quotes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">No vehicles available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Booking Info Card */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
          <p><span className="font-semibold">Pickup:</span> {pickup}</p>
          <p><span className="font-semibold">Drop:</span> {drop}</p>
          <p><span className="font-semibold">Trip Type:</span> {tripType}</p>
          <p><span className="font-semibold">Date & Time:</span> {pickupDate} {pickupTime}</p>
          <p><span className="font-semibold">Mobile:</span> {mobile}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {quotes.map((q: Quote, i: number) => (
          <div
            key={i}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            <img
              src={q.imageUrl}
              alt={q.vehicleName}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-black ">{q.vehicleName}</h3>
              <p className="text-gray-600 text-sm mt-1 mb-2">
                {q.capacity} Seats • {q.ac ? "AC" : "Non-AC"}
              </p>
              <p className="text-gray-500 text-sm flex-grow">{q.features}</p>
              <div className="mt-4">
                <p className="text-indigo-600 font-bold text-xl">₹{q.totalFare.toFixed(0)}</p>
                <p className="text-xs text-gray-500">{q.distanceKm.toFixed(1)} km</p>
              </div>
              <button
                onClick={() => handleBook(q)}
                className="mt-5 py-2.5 rounded-xl bg-indigo-600 text-black font-medium hover:bg-indigo-700 transition"
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
