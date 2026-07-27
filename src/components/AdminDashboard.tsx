import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

type Booking = {
  id: number;
  pickup: string;
  dropoff: string;
  tripType: string;
  pickupDate: string;
  pickupTime: string;
  mobile: string;
  vehicleName: string;
  distanceKm: number;
  fare: number;
  status: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login first
      </div>
    );
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosClient.get("/admin/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axiosClient.patch(
        `/admin/bookings/${id}/status`,
        { status }
      );

      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await axiosClient.delete(`/admin/bookings/${id}`);

      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const totalBookings = bookings.length;
  const confirmed = bookings.filter(
    (b) => b.status === "CONFIRMED"
  ).length;
  const cancelled = bookings.filter(
    (b) => b.status === "CANCELLED"
  ).length;

  const vehiclesInUse = new Set(
    bookings
      .filter((b) => b.status === "CONFIRMED")
      .map((b) => b.vehicleName)
  ).size;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          title="Total Bookings Today"
          value={totalBookings}
          icon=""
        />
        <SummaryCard
          title="Confirmed"
          value={confirmed}
          icon=""
        />
        <SummaryCard
          title="Cancelled"
          value={cancelled}
          icon=""
        />
        <SummaryCard
          title="Vehicles in Use"
          value={vehiclesInUse}
          icon=""
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Recent Bookings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              {b.pickup} → {b.dropoff}
            </h3>

            <p className="text-sm text-gray-600">{b.tripType}</p>

            <p className="text-sm text-gray-600">
              {b.pickupDate} {b.pickupTime}
            </p>

            <p className="text-sm text-gray-600">{b.mobile}</p>

            <p className="text-sm text-gray-600">
              {b.vehicleName}
            </p>

            <p className="text-sm text-gray-600">
              {b.distanceKm.toFixed(1)} km
            </p>

            <p className="text-sm text-gray-600">
              ₹{b.fare.toFixed(0)}
            </p>

            <span
              className={`inline-block mt-3 px-3 py-1 text-sm font-medium rounded-full ${
                b.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : b.status === "CANCELLED"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {b.status}
            </span>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  updateStatus(b.id, "CONFIRMED")
                }
                className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(b.id, "CANCELLED")
                }
                className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteBooking(b.id)}
                className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between border">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="text-3xl">{icon}</div>
    </div>
  );
}