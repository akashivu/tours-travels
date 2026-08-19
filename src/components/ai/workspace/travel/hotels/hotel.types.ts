export interface HotelLocation {
  address?: string;

  city?: string;

  country?: string;

  latitude?: number;

  longitude?: number;
}

export interface HotelRating {
  value?: number;

  scale?: number;

  reviewCount?: number;
}

export interface HotelPrice {
  amount: number;

  currency: string;

  period?: "night" | "stay";

  originalAmount?: number;
}

export interface HotelRoom {
  id: string;

  name: string;

  description?: string;

  maxGuests?: number;

  bedType?: string;

  price?: HotelPrice;

  refundable?: boolean;

  cancellationPolicy?: string;
}

export interface HotelOption {
  id: string;

  name: string;

  imageUrl?: string;

  images?: string[];

  location: HotelLocation;

  rating?: HotelRating;

  price?: HotelPrice;

  rooms?: HotelRoom[];

  amenities?: string[];

  propertyType?: string;

  bookingUrl?: string;

  provider?: string;
}

export interface HotelSearchParams {
  destination: string;

  checkIn: string;

  checkOut: string;

  adults?: number;

  children?: number;

  rooms?: number;

  currency?: string;
}

export interface HotelSearchResponse {
  searchId?: string;

  results: HotelOption[];

  currency: string;

  searchedAt?: string;
}