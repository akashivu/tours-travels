import { useEffect, useState } from "react";
import axios from "axios";

type Booking = {
  id: number;
  pickup: string;
  dropoff: string;
  distanceKm: number;
  fare: number;
  status: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  
  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.patch(`http://localhost:8080/api/admin/bookings/${id}/status`, { status });
      fetchBookings(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

 
  const deleteBooking = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/bookings/${id}`);
      fetchBookings(); 
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 bg-black shadow-sm rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-black">ID</th>
              <th className="border px-4 py-2  text-black">Pickup</th>
              <th className="border px-4 py-2  text-black">Drop</th>
              <th className="border px-4 py-2  text-black">Distance (km)</th>
              <th className="border px-4 py-2  text-black">Fare</th>
              <th className="border px-4 py-2  text-black">Status</th>
              <th className="border px-4 py-2  text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-blue-50">
                <td className="border px-4 py-2 text-center">{b.id}</td>
                <td className="border px-4 py-2 text-center">{b.pickup}</td>
                <td className="border px-4 py-2 text-center">{b.dropoff}</td>
                <td className="border px-4 py-2 text-center">{b.distanceKm.toFixed(1)}</td>
                <td className="border px-4 py-2 text-center">₹{b.fare.toFixed(0)}</td>
                <td className="border px-4 py-2 text-center font-semibold">{b.status}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => updateStatus(b.id, "CONFIRMED")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, "CANCELLED")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

