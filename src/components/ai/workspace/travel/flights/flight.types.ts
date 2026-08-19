export interface FlightSegment {
  id: string;

  airline: {
    code: string;
    name: string;
    logoUrl?: string;
  };

  flightNumber?: string;

  origin: {
    code: string;
    name?: string;
    city?: string;
  };

  destination: {
    code: string;
    name?: string;
    city?: string;
  };

  departure: string;
  arrival: string;

  durationMinutes?: number;

  cabinClass?: string;

  stops: number;

  stopDetails?: Array<{
    airportCode: string;
    airportName?: string;
    durationMinutes?: number;
  }>;
}

export interface FlightOption {
  id: string;

  outbound: FlightSegment[];

  inbound?: FlightSegment[];

  price: {
    amount: number;
    currency: string;
  };

  totalDurationMinutes?: number;

  bookingUrl?: string;

  provider?: string;

  refundable?: boolean;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;

  departureDate: string;

  returnDate?: string;

  adults?: number;

  children?: number;

  infants?: number;

  cabinClass?: string;

  currency?: string;
}

export interface FlightSearchResponse {
  searchId?: string;

  results: FlightOption[];

  currency: string;

  searchedAt?: string;
}