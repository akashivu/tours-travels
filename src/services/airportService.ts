export type Airport = {
  code: string;
  city: string;
  airport: string;
  country: string;
  countryCode?: string;
  type: "airport" | "city";
  latitude?: number;
  longitude?: number;
};

type TravelpayoutsPlace = {
  type?: string;
  code?: string;
  name?: string;
  country_code?: string;
  country_name?: string;
  city_code?: string;
  city_name?: string;
  coordinates?: {
    lat?: number;
    lon?: number;
  };
};

const AUTOCOMPLETE_URL =
  "https://autocomplete.travelpayouts.com/places2";

const CACHE = new Map<
  string,
  Airport[]
>();

function normalizePlace(
  place: TravelpayoutsPlace
): Airport | null {
  if (!place.code) {
    return null;
  }

  const type =
    place.type === "airport"
      ? "airport"
      : place.type === "city"
      ? "city"
      : null;

  if (!type) {
    return null;
  }

  const city =
    place.city_name ||
    (type === "city"
      ? place.name
      : "");

  const airport =
    type === "airport"
      ? place.name || "Airport"
      : "All airports";

  return {
    code: place.code.toUpperCase(),
    city:
      city ||
      place.name ||
      place.code,
    airport,
    country:
      place.country_name || "",
    countryCode:
      place.country_code,
    type,
    latitude:
      place.coordinates?.lat,
    longitude:
      place.coordinates?.lon,
  };
}

export async function searchAirportsLive(
  term: string,
  signal?: AbortSignal
): Promise<Airport[]> {
  const query = term.trim();

  if (query.length < 2) {
    return [];
  }

  const cacheKey =
    query.toLowerCase();

  const cached =
    CACHE.get(cacheKey);

  if (cached) {
    return cached;
  }

  const params =
    new URLSearchParams();

  params.set(
    "term",
    query
  );

  params.set(
    "locale",
    "en"
  );

  params.append(
    "types[]",
    "airport"
  );

  params.append(
    "types[]",
    "city"
  );

  const response =
    await fetch(
      `${AUTOCOMPLETE_URL}?${params.toString()}`,
      {
        method: "GET",
        signal,
        headers: {
          Accept:
            "application/json",
        },
      }
    );

  if (!response.ok) {
    throw new Error(
      `Airport search failed: ${response.status}`
    );
  }

  const data =
    (await response.json()) as TravelpayoutsPlace[];

  const results = data
    .map(normalizePlace)
    .filter(
      (
        airport
      ): airport is Airport =>
        airport !== null
    )
    /*
     * Prefer actual airports over
     * city-only results.
     */
    .sort((a, b) => {
      if (
        a.type === "airport" &&
        b.type !== "airport"
      ) {
        return -1;
      }

      if (
        a.type !== "airport" &&
        b.type === "airport"
      ) {
        return 1;
      }

      return 0;
    })
    .slice(0, 8);

  CACHE.set(
    cacheKey,
    results
  );

  return results;
}

export function clearAirportCache() {
  CACHE.clear();
}