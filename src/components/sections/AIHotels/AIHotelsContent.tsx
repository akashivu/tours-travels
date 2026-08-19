import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import Button from "../../ui/Button";

const features = [
  "Luxury hotels tailored to your budget",
  "AI compares thousands of properties",
  "Personalized recommendations",
  "Best value with verified reviews",
];

const AIHotelsContent = () => {
  return (
    <div className="max-w-xl">

      {/* Badge */}

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">

        <Sparkles
          size={16}
          className="text-blue-600"
        />

        <span className="text-sm font-semibold text-blue-700">
          AI Hotel Discovery
        </span>

      </div>

      {/* Heading */}

      <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl">
        Discover hotels
        <br />
        you'll actually love.
      </h2>

      {/* Description */}

      <p className="mt-6 text-lg leading-8 text-gray-600">
        Tell Elixway what matters most—
        beachfront views, breakfast included,
        family friendly, luxury amenities or budget stays.
        Our AI instantly recommends the best options.
      </p>

      {/* Features */}

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

      {/* CTA */}

      <div className="mt-10">

        <Button className="rounded-full px-7">
          Explore Hotels
        </Button>

      </div>

    </div>
  );
};

export default AIHotelsContent;