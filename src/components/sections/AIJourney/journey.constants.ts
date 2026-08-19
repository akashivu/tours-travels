import {
  MessageSquare,
  BrainCircuit,
  Plane,
  Hotel,
  Car,
  CalendarCheck,
} from "lucide-react";

export const JOURNEY_STEPS = [
  {
    code: "01 · Brief",
    icon: MessageSquare,
    title: "Brief the concierge",
    description:
      "Describe your dream trip in plain language, just like chatting with a travel expert.",
  },
  {
    code: "02 · Parse",
    icon: BrainCircuit,
    title: "AI reads the trip",
    description:
      "Elixway breaks your message into destination, dates, budget and preferences.",
  },
  {
    code: "03 · Flights",
    icon: Plane,
    title: "Scan the routes",
    description: "Airlines and connections are compared for price and time.",
  },
  {
    code: "04 · Stays",
    icon: Hotel,
    title: "Shortlist stays",
    description: "Hotels and villas are matched to your budget and location.",
  },
  {
    code: "05 · Transfers",
    icon: Car,
    title: "Lock transfers",
    description: "Airport pickups and local transport are arranged for you.",
  },
  {
    code: "06 · Departure",
    icon: CalendarCheck,
    title: "Cleared for departure",
    description: "Your full itinerary lands, ready to review and book.",
  },
];