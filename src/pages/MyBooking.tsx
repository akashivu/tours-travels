import { useEffect, useState } from "react";

type Booking = {
  id: number;
  vehicleName: string;
  fromLocation: string;
  toLocation: string;
  tripType: string;
  distanceKm: number;
  fare: number;
  pickupDate: string;
  pickupTime: string;
  mobileNo: string;
  status: string;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const res = await fetch(`http://localhost:8080/api/bookings/user/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-white shadow-md rounded-lg border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-indigo-700">
                {b.vehicleName} – {b.tripType}
              </h2>
              <p className="text-gray-600">
                {b.fromLocation} ➝ {b.toLocation}
              </p>
              <p className="text-sm text-gray-500">
                {b.pickupDate} at {b.pickupTime}
              </p>
              <p className="text-sm">Fare: ₹{b.fare}</p>
              <span
                className={`px-3 py-1 inline-block mt-2 rounded-full text-sm ${
                  b.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
