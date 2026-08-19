import type {
  DestinationCategory,
} from "./destinations.types";

export const DESTINATION_CATEGORIES: {
  id: DestinationCategory;
  label: string;
}[] = [

  {
    id: "all",
    label: "All",
  },

  {
    id: "beaches",
    label: "Beaches",
  },

  {
    id: "mountains",
    label: "Mountains",
  },

  {
    id: "cities",
    label: "Cities",
  },

  {
    id: "adventure",
    label: "Adventure",
  },

  {
    id: "culture",
    label: "Culture",
  },

];


/*
 * =========================================================
 * DESTINATION ROUTES
 * =========================================================
 *
 * These can still be used by other parts of the frontend
 * for destination recommendations/navigation.
 *
 * The actual destination data now comes from:
 *
 * PostgreSQL
 *    ↓
 * Spring Boot
 *    ↓
 * /api/destinations
 *    ↓
 * React
 *
 * Therefore we don't keep a second DESTINATIONS array here.
 * =========================================================
 */

export const DESTINATION_ROUTES: Record<
  string,
  string[]
> = {

  "new-york": [
    "new-york",
    "paris",
    "dubai",
  ],

  "paris": [
    "paris",
    "switzerland",
    "dubai",
  ],

  "dubai": [
    "dubai",
    "tokyo",
    "bali",
  ],

  "tokyo": [
    "tokyo",
    "bali",
  ],

  "bali": [
    "bali",
    "tokyo",
  ],

  "switzerland": [
    "switzerland",
    "paris",
  ],

};
