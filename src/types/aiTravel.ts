import type { FlightSearchResponse } from "../components/ai/workspace/travel/flights/flight.types";
import type { HotelSearchResponse } from "../components/ai/workspace/travel/hotels/hotel.types";
import type { PlaceSearchResponse } from "../components/ai/workspace/travel/places/place.types";
import type { TripMapData } from "../components/ai/workspace/travel/map/map.types";

export type TravelView =
  | "empty"
  | "hotels"
  | "flights"
  | "places"
  | "trip";

export interface AITravelState {
  view: TravelView;

  flights?: FlightSearchResponse;

  hotels?: HotelSearchResponse;

  places?: PlaceSearchResponse;

  map?: TripMapData;

  isLoading: boolean;

  error: string | null;
}

export const initialAITravelState: AITravelState = {
  view: "empty",

  flights: undefined,

  hotels: undefined,

  places: undefined,

  map: undefined,

  isLoading: false,

  error: null,
};