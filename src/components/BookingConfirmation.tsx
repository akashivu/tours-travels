import { useLocation, Link } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No booking found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Booking Confirmed
        </h1>

        <p className="text-gray-700 mb-6">
          Your booking ID is <strong>#{booking.id}</strong>
        </p>

        <div className="text-left space-y-2 mb-6">
          <p><strong>Vehicle:</strong> {booking.vehicleName}</p>
          <p><strong>Pickup:</strong> {booking.pickup}</p>
          <p><strong>Drop:</strong> {booking.dropoff}</p>
          <p><strong>Trip Type:</strong> {booking.tripType}</p>
          <p><strong>Date:</strong> {booking.pickupDate} {booking.pickupTime}</p>
          <p><strong>Mobile:</strong> {booking.mobile}</p>
          <p><strong>Fare:</strong> ₹{booking.fare}</p>
        </div>

        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Book Another Ride
        </Link>
      </div>
    </div>
  );
}
