import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState("outstation");
  const [tripType, setTripType] = useState("oneway");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSearchRide = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/quotes", {
        pickup,
        dropoff: drop,
        tripType,
      });

      navigate("/vehicles", {
        state: {
          quotes: res.data,
          pickup,
          drop,
          tripType,
          pickupDate,
          pickupTime,
          mobile,
        },
      });
    } catch {
      alert("Error fetching vehicles");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex w-full max-w-7xl mx-auto px-6">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
          <div className="flex border-b mb-6">
            {["airport", "outstation", "rental"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-center font-semibold ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {activeTab === "airport" && (
            <div className="grid gap-4">
              <select className="border p-2 rounded">
                <option>Select Terminal</option>
                <option>Terminal 1</option>
                <option>Terminal 2</option>
              </select>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="airport" defaultChecked /> Airport Pickup
                </label>
                <label>
                  <input type="radio" name="airport" /> Airport Drop
                </label>
                <label>
                  <input type="radio" name="airport" /> Round Trip
                </label>
              </div>
              <input
                type="text"
                placeholder="Search Drop Location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={handleSearchRide}
                className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                Search Ride
              </button>
            </div>
          )}

          {activeTab === "outstation" && (
            <div className="grid gap-4">
              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={() => setTripType("oneway")}
                  />{" "}
                  One Way
                </label>
                <label>
                  <input
                    type="radio"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                  />{" "}
                  Round Trip
                </label>
              </div>
              <input
                type="text"
                placeholder="From"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="To"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={handleSearchRide}
                className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                Search Ride
              </button>
            </div>
          )}

          {activeTab === "rental" && (
            <div className="grid gap-4">
              <input type="text" placeholder="City" className="border p-2 rounded" />
              <input
                type="text"
                placeholder="Pick-Up Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
              <input
                type="tel"
                placeholder="Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-2 rounded"
              />
              <button
                onClick={handleSearchRide}
                className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              >
                Search Ride
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:flex w-1/2 flex-col justify-center items-start pl-10 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Call Now To Book Your Ride
          </h2>
          <p className="mb-6">
            Bangalore Airport Taxi, Outstation Taxi & Local Package rides at your
            convenience.
          </p>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}
