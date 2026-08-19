export interface PlaceLocation {
  latitude: number;

  longitude: number;
}

export interface PlaceOption {
  id: string;

  name: string;

  description?: string;

  imageUrl?: string;

  category?: string;

  rating?: number;

  reviewCount?: number;

  location: PlaceLocation;

  address?: string;

  city?: string;

  country?: string;

  websiteUrl?: string;
}

export interface PlaceSearchParams {
  query: string;

  latitude?: number;

  longitude?: number;

  radiusMeters?: number;

  category?: string;
}

export interface PlaceSearchResponse {
  results: PlaceOption[];

  searchedAt?: string;
}