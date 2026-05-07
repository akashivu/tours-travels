import { useEffect, useState } from "react";

const AirportRide = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [fare, setFare] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch vehicles from backend
  useEffect(() => {
    fetch("https://adiyogi-travels.onrender.com/api/airport/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Calculate fare
  const handleFare = () => {
    if (!selectedCar || !distance) {
      alert("Please select car and enter distance");
      return;
    }

    setLoading(true);

    fetch(
      `http://localhost:8080/api/airport/fare?carName=${selectedCar}&distance=${distance}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFare(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Airport Ride Booking</h1>

      {/* 🔹 Distance Input */}
      <input
        type="number"
        placeholder="Enter distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "200px"
        }}
      />

      {/* 🔹 Vehicles List */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {vehicles.map((v, index) => (
          <div
            key={index}
            onClick={() => setSelectedCar(v.name)}
            style={{
              border:
                selectedCar === v.name
                  ? "2px solid green"
                  : "1px solid gray",
              padding: "15px",
              margin: "10px",
              width: "200px",
              cursor: "pointer",
              borderRadius: "10px"
            }}
          >
            {/* Image */}
            {v.imageUrl && (
              <img
                src={v.imageUrl}
                alt={v.name}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
            )}

            <h3>{v.name}</h3>
            <p>Seats: {v.seats}</p>
            <p>₹{v.pricePerKm}/km</p>
          </div>
        ))}
      </div>

      {/* 🔹 Button */}
      <button
        onClick={handleFare}
        disabled={!selectedCar || !distance || loading}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        {loading ? "Calculating..." : "Calculate Fare"}
      </button>

      {/* 🔹 Fare Display */}
      {fare && (
        <h2 style={{ marginTop: "20px" }}>
          Total Fare: ₹{fare}
        </h2>
      )}
    </div>
  );
};

export default AirportRide;