import type {
  Destination,
  DestinationCategory,
} from "../components/sections/Destinations/destinations.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://api.elixway.com";

/*
 * =========================================================
 * BACKEND DESTINATION RESPONSE
 * =========================================================
 */

interface DestinationApiResponse {
  id: number;
  name: string;
  slug: string;
  country: string;
  countryCode?: string;
  continent?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  recommendedDays?: number;
  budgetLevel?: string;
  latitude?: number;
  longitude?: number;
  heroImage?: string;
}

/*
 * =========================================================
 * GOOGLE PHOTO
 * =========================================================
 */

export interface GooglePhoto {
  name: string;
  widthPx?: number;
  heightPx?: number;

  authorAttributions?: {
    displayName: string;
    uri: string;
    photoUri?: string;
  }[];
}

/*
 * =========================================================
 * GOOGLE PLACE DETAILS
 * =========================================================
 */

export interface GooglePlaceDetails {
  id: string;

  displayName?: {
    text: string;
    languageCode?: string;
  };

  formattedAddress?: string;

  location?: {
    latitude: number;
    longitude: number;
  };

  rating?: number;

  userRatingCount?: number;

  websiteUri?: string;

  photos?: GooglePhoto[];
}

/*
 * =========================================================
 * GOOGLE NEARBY PLACE
 * =========================================================
 */

export interface NearbyPlace {
  id: string;

  displayName?: {
    text: string;
  };

  formattedAddress?: string;

  location?: {
    latitude: number;
    longitude: number;
  };

  primaryType?: string;

  types?: string[];

  photos?: GooglePhoto[];
}

/*
 * =========================================================
 * DESTINATION CATEGORY VALIDATION
 * =========================================================
 */

const isDestinationCategory = (
  value: string | undefined,
): value is Exclude<
  DestinationCategory,
  "all"
> => {
  return (
    value === "beaches" ||
    value === "mountains" ||
    value === "cities" ||
    value === "adventure" ||
    value === "culture"
  );
};

/*
 * =========================================================
 * GET DESTINATIONS
 * =========================================================
 */

export async function getDestinations(): Promise<
  Destination[]
> {
  const response = await fetch(
    `${API_BASE_URL}/api/destinations`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch destinations: ${response.status}`,
    );
  }

  const data: DestinationApiResponse[] =
    await response.json();

  return data.map(
    (destination): Destination => ({
      id: String(destination.id),

      name: destination.name,

      slug: destination.slug,

      country: destination.country,

      coordinates: [
        destination.longitude ?? 0,
        destination.latitude ?? 0,
      ],

      category: isDestinationCategory(
        destination.category,
      )
        ? destination.category
        : "cities",

      image:
        destination.heroImage ??
        "",

      description:
        destination.description ??
        destination.shortDescription ??
        "",
    }),
  );
}

/*
 * =========================================================
 * DESTINATION GOOGLE DETAILS
 * =========================================================
 */

export async function getGooglePlaceDetails(
  slug: string,
): Promise<GooglePlaceDetails> {
  const response = await fetch(
    `${API_BASE_URL}/api/destinations/${encodeURIComponent(
      slug,
    )}/google-details`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Google place details: ${response.status}`,
    );
  }

  return response.json();
}

/*
 * =========================================================
 * DIRECT GOOGLE PLACE DETAILS
 *
 * Used when the user clicks a nearby place.
 * =========================================================
 */

export async function getPlaceDetails(
  placeId: string,
): Promise<GooglePlaceDetails> {
  if (!placeId) {
    throw new Error(
      "Google Place ID is required",
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/destinations/places/${encodeURIComponent(
      placeId,
    )}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch place details: ${response.status}`,
    );
  }

  return response.json();
}

/*
 * =========================================================
 * GOOGLE NEARBY PLACES
 * =========================================================
 */

export async function getNearbyPlaces(
  slug: string,
  type: string,
): Promise<NearbyPlace[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/destinations/${encodeURIComponent(
      slug,
    )}/nearby?type=${encodeURIComponent(type)}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch nearby places: ${response.status}`,
    );
  }

  return response.json();
}

/*
 * =========================================================
 * GOOGLE PLACE PHOTO
 * =========================================================
 */

export async function getPlacePhoto(
  photoName: string,
): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}/api/destinations/place-photo?photoName=${encodeURIComponent(
      photoName,
    )}`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch place photo",
    );
  }

  return response.text();
}