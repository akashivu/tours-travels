export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: string;
  date: string;
}

export const FLIGHTS: Flight[] = [
  {
    id: "flight-1",
    airline: "IndiGo",
    airlineCode: "6E",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "DXB",
    destinationCity: "Dubai",
    departure: "06:40",
    arrival: "09:20",
    duration: "3h 10m",
    stops: "Non-stop",
    price: "₹18,420",
    date: "18 Sep",
  },
  {
    id: "flight-2",
    airline: "Emirates",
    airlineCode: "EK",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "DXB",
    destinationCity: "Dubai",
    departure: "08:15",
    arrival: "11:05",
    duration: "3h 20m",
    stops: "Non-stop",
    price: "₹24,100",
    date: "18 Sep",
  },
  {
    id: "flight-3",
    airline: "Air India",
    airlineCode: "AI",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "DXB",
    destinationCity: "Dubai",
    departure: "14:30",
    arrival: "17:20",
    duration: "3h 15m",
    stops: "Non-stop",
    price: "₹17,890",
    date: "18 Sep",
  },
];