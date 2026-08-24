import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HotelSearchPanelProps {
  className?: string;
}

export default function HotelSearchPanel({
  className = "",
}: HotelSearchPanelProps) {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanDestination = destination.trim();

    if (!cleanDestination) {
      setError("Please enter a destination.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select your check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setError("");

    const searchParams = new URLSearchParams({
      destination: cleanDestination,
      checkIn,
      checkOut,
      adults: String(adults),
      rooms: String(rooms),
    });

    navigate(`/hotels?${searchParams.toString()}`);
  };

  return (
    <section
      className={className}
      style={{
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 1.6fr) 1fr 1fr 0.8fr 0.7fr auto",
          gap: "12px",
          alignItems: "end",
          padding: "16px",
          background: "#ffffff",
          border: "1px solid #e7e9ee",
          borderRadius: "18px",
          boxShadow: "0 12px 35px rgba(16, 24, 40, 0.08)",
        }}
      >
        {/* Destination */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Destination</span>

          <input
            type="text"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Where are you going?"
            style={inputStyle}
          />
        </label>

        {/* Check-in */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Check-in</span>

          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            style={inputStyle}
          />
        </label>

        {/* Check-out */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Check-out</span>

          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(event) => setCheckOut(event.target.value)}
            style={inputStyle}
          />
        </label>

        {/* Adults */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Guests</span>

          <select
            value={adults}
            onChange={(event) => setAdults(Number(event.target.value))}
            style={inputStyle}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </label>

        {/* Rooms */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Rooms</span>

          <select
            value={rooms}
            onChange={(event) => setRooms(Number(event.target.value))}
            style={inputStyle}
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>

        {/* Search */}
        <button
          type="submit"
          style={{
            minHeight: "48px",
            padding: "0 24px",
            border: "none",
            borderRadius: "12px",
            background: "#101828",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Search stays
        </button>

        {/* Error */}
        {error && (
          <p
            style={{
              gridColumn: "1 / -1",
              margin: "0",
              color: "#dc2626",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </form>

      <style>
        {`
          @media (max-width: 1000px) {
            form {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 600px) {
            form {
              grid-template-columns: 1fr !important;
              padding: 12px !important;
            }
          }
        `}
      </style>
    </section>
  );
}

const labelStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "7px",
};

const labelTextStyle = {
  color: "#667085",
  fontSize: "12px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  height: "48px",
  padding: "0 13px",
  boxSizing: "border-box" as const,
  border: "1px solid #d0d5dd",
  borderRadius: "10px",
  outline: "none",
  background: "#ffffff",
  color: "#101828",
  fontSize: "14px",
};