import HotelCard from "./HotelCard";
import { HOTELS } from "./hotels.constants";

const AIHotelsVisual = () => {
  return (
    <div className="relative">

      {/* Hotel cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {HOTELS.map(
          (hotel, index) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              index={index}
            />
          ),
        )}
      </div>

      {/* View all */}

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-950
          "
        >
          View all stays

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default AIHotelsVisual;