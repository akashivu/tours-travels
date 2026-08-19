import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import Button from "../../ui/Button";

const features = [
  "Find the cheapest flight combinations",
  "AI suggests the best departure times",
  "Airport pickup included automatically",
  "No manual comparison needed",
];

const AIFlightsContent = () => {
  return (
    <div className="max-w-xl">

      <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2">

        <Sparkles
          size={16}
          className="text-sky-600"
        />

        <span className="text-sm font-semibold text-sky-700">
          AI Flight Assistant
        </span>

      </div>

      <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl">
        Find smarter flights.
        <br />
        Arrive stress free.
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        Elixway compares routes, airlines, prices and airport
        transfers to create one seamless journey.
      </p>

      <div className="mt-10 space-y-4">

        {features.map((feature) => (

          <div
            key={feature}
            className="flex items-center gap-3"
          >

            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />

            <span className="text-gray-700">
              {feature}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-10">

        <Button className="rounded-full px-7">
          Search Flights
        </Button>

      </div>

    </div>
  );
};

export default AIFlightsContent;