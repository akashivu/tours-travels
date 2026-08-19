export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  tripType: "roundtrip" | "oneway";
  cabinClass: "economy" | "premium_economy" | "business" | "first";
}

export interface FlightSegment {
  departureAirport: string;
  departureCode: string;
  departureTime: string;

  arrivalAirport: string;
  arrivalCode: string;
  arrivalTime: string;

  duration: string;
  stops: number;
}

export interface FlightResult {
  id: string;

  airline: string;
  airlineCode?: string;

  logo?: string;

  price: number;
  currency: string;

  segments: FlightSegment[];

  totalDuration: string;

  stops: number;

  bookingUrl?: string;

  provider: "travelpayouts";
}