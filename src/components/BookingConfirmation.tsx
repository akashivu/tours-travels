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

  
  const gst = Math.round(booking.fare * 0.18);
  const discount = 100; 
  const total = booking.fare + gst - discount;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
     
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">At Your Service</h1>
        <Link
          to="/"
          className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
        >
          Cancel Request
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
       
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
            ✅ Booking Confirmed
          </h2>

          <p className="text-gray-600 mb-4">
            Your ride has been successfully booked. A driver will be assigned
            1 hour before pickup.
          </p>

          <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <p className="text-sm text-gray-500">Your booking details</p>
            <p className="font-semibold">
              {booking.pickupDate} at {booking.pickupTime}
            </p>
            <p>
              <strong>Vehicle:</strong> {booking.vehicleName}
            </p>
            <p>
              <strong>Pickup:</strong> {booking.pickup}
            </p>
            <p>
              <strong>Drop:</strong> {booking.dropoff}
            </p>
            <p>
              <strong>Trip Type:</strong> {booking.tripType}
            </p>
            <p>
              <strong>Mobile:</strong> {booking.mobile}
            </p>
          </div>

         
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="font-semibold mb-2">Need our help?</h3>
            <p className="text-gray-600 text-sm">
              Call us in case you face any issue in your ride.
            </p>
            <p className="font-bold mt-2">📞 7022237255</p>
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Fare</span>
              <span>₹{booking.fare}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Amount to Pay</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Pay Now
          </button>

          <div className="text-xs text-gray-500 mt-4 border-t pt-2">
            Your booking is eligible for our Travel Insurance Program.
          </div>
        </div>
      </div>
    </div>
  );
}
