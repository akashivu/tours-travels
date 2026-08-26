import {
  searchAirportsLive,
  type Airport,
} from "./airportService";

import type {
  AIFlightSearchRequest,
} from "../types/ai";

import {
  buildFlightResultsUrl,
} from "../utils/flightSearch";

async function resolveAirport(
  query: string,
): Promise<Airport> {
  const results =
    await searchAirportsLive(query);

  if (!results.length) {
    throw new Error(
      `Could not find an airport for "${query}".`,
    );
  }

  /*
   * Prefer an airport result over a city result.
   * Example:
   * Dubai city      → DXB
   * Dubai Airport   → DXB
   * Dubai World Central → DWC
   */
  const airport =
    results.find(
      (item) =>
        item.type === "airport",
    );

  return airport ?? results[0];
}

export async function openAIFlightSearch(
  request: AIFlightSearchRequest,
): Promise<void> {
  const tripType =
    request.trip_type ?? "oneway";

  if (
    tripType === "roundtrip" &&
    !request.return_date
  ) {
    throw new Error(
      "A return date is required for a round trip.",
    );
  }

  if (!request.origin.trim()) {
    throw new Error(
      "Please provide a departure location.",
    );
  }

  if (!request.destination.trim()) {
    throw new Error(
      "Please provide a destination.",
    );
  }

  if (!request.departure_date) {
    throw new Error(
      "Please provide a departure date.",
    );
  }

  const [
    originAirport,
    destinationAirport,
  ] = await Promise.all([
    resolveAirport(
      request.origin,
    ),
    resolveAirport(
      request.destination,
    ),
  ]);

  if (!originAirport.code) {
    throw new Error(
      `Could not resolve "${request.origin}" to an airport code.`,
    );
  }

  if (!destinationAirport.code) {
    throw new Error(
      `Could not resolve "${request.destination}" to an airport code.`,
    );
  }

  const url =
    buildFlightResultsUrl({
      fromCode:
        originAirport.code,

      toCode:
        destinationAirport.code,

      departureDate:
        request.departure_date,

      returnDate:
        request.return_date ??
        "",

      passengers:
        request.passengers ?? 1,

      tripType,
    });

  window.location.assign(url);
}