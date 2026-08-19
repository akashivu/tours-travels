export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  label: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Choose where you want to go",
    description:
      "Explore destinations, get inspired, and find a place that fits the kind of trip you want.",
  },
  {
    number: "02",
    label: "PLAN",
    title: "Let AI shape your journey",
    description:
      "Tell Elixway what you have in mind and get a personalized itinerary built around your preferences.",
  },
  {
    number: "03",
    label: "BOOK",
    title: "Bring the trip together",
    description:
      "Find your stays, flights and rides in one place and turn your plan into a real journey.",
  },
];