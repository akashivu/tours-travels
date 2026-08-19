import type { Message } from "../../../../types/ai";

export type TravelCanvasView =
  | "empty"
  | "hotels"
  | "flights"
  | "places"
  | "trip";

export function getTravelCanvasView(
  messages: Message[]
): TravelCanvasView {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (!latestUserMessage) {
    return "empty";
  }

  const text = latestUserMessage.content
    .toLowerCase()
    .trim();

  /*
   * HOTEL INTENT
   */

  const hotelKeywords = [
    "hotel",
    "hotels",
    "stay",
    "stays",
    "resort",
    "resorts",
    "accommodation",
    "where should i stay",
    "place to stay",
  ];

  if (
    hotelKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "hotels";
  }

  /*
   * FLIGHT INTENT
   */

  const flightKeywords = [
    "flight",
    "flights",
    "fly",
    "flying",
    "airline",
    "airlines",
    "ticket",
    "tickets",
    "airport",
  ];

  if (
    flightKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "flights";
  }

  /*
   * TRIP / MAP INTENT
   *
   * Keep this before places because a trip
   * request may also contain "places".
   */

  const tripKeywords = [
    "plan a trip",
    "plan my trip",
    "plan trip",
    "itinerary",
    "itinerary for",
    "travel plan",
    "travel itinerary",
    "route from",
    "route to",
    "trip from",
    "trip to",
    "journey from",
    "journey to",
    "bengaluru to",
    "bangalore to",
  ];

  if (
    tripKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "trip";
  }

  /*
   * PLACE / DESTINATION INTENT
   */

  const placeKeywords = [
    "places",
    "place",
    "destination",
    "destinations",
    "things to do",
    "what to do",
    "attractions",
    "explore",
    "tourist spots",
    "sightseeing",
    "visit",
    "discover",
  ];

  if (
    placeKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "places";
  }

  return "empty";
}