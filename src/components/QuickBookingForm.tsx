import { useState } from "react";

export default function QuickBookingForm() {
  const [activeTab, setActiveTab] = useState("OUTSTATION");
  const [tripType, setTripType] = useState("oneway");

  return (
    <div className="relative min-h-screen w-screen pt-0">
      {/* Full-screen background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg')",
        }}
      >
        {/* Optional overlay to make form readable */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Form container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white p-8 rounded-xl  shadow-lg w-full max-w-lg">
          {/* Tabs */}
          <div className="flex border-b mb-6 ">
            {["OUTSTATION", "RENTAL", "AIRPORT"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center mr-2 text-white py-2 font-semibold ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } border-r last:border-r-11`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Fields */}
          {activeTab === "OUTSTATION" && (
            <>
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === "oneway"}
                    onChange={() => setTripType("oneway")}
                    className="text-blue-600"
                  />
                  One Way
                </label>
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                    className="text-blue-600"
                  />
                  Round Trip
                </label>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    From:
                  </label>
                  <input
                    type="text"
                    placeholder="Pick Up"
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    To:
                  </label>
                  <input
                    type="text"
                    placeholder="Drop"
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "RENTAL" && (
            <>
              <div className="space-y-4 mb-4 ">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Bangalore, Karnataka, India"
                    className="w-full border border-gray-400  text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pick-Up Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </>
          )}

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pick-Up Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pick-Up Time
              </label>
              <select className="w-full border border-gray-400 rounded-md text-black px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400">
                <option>Select Date First</option>
                <option>06:00 AM</option>
                <option>07:00 AM</option>
                <option>08:00 AM</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile No:
            </label>
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full border border-gray-400 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300">
            SEARCH TAXI
          </button>
        </div>
      </div>
    </div>
  );
}
