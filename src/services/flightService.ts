import axios from "axios";

import type {
  FlightResult,
  FlightSearchRequest,
} from "../types/flight";

const flightClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const flightService = {
  async searchFlights(
    request: FlightSearchRequest
  ): Promise<FlightResult[]> {
    const response =
      await flightClient.post<{
        flights: FlightResult[];
      }>(
        "/api/flights/search",
        request
      );

    return response.data.flights;
  },
};