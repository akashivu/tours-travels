import { POPULAR_SEARCHES } from "./hero.constants";

const PopularSearches = () => {
  return (
    <div className="space-y-4">

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
        Popular Destinations
      </p>

      <div className="flex flex-wrap gap-3">

        {POPULAR_SEARCHES.map((item) => (
          <button
            key={item.label}
            className="rounded-full border border-gray-200 bg-white/80 px-5 py-3 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-lg"
          >
            {item.label}
          </button>
        ))}

      </div>

    </div>
  );
};

export default PopularSearches;