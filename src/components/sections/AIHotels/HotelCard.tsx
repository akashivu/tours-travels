import type { Hotel } from "./hotels.constants";

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

const HotelCard = ({
  hotel,
  index,
}: HotelCardProps) => {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[22px]
        border
        border-gray-200
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]
        ai-hotel-card
      "
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-[235px] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading={
            index === 0
              ? "eager"
              : "lazy"
          }
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.045]
          "
        />

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-md">
          <span className="text-white">
            ★
          </span>

          <span className="font-medium">
            {hotel.rating}
          </span>

          <span className="text-white/70">
            {hotel.ratingLabel}
          </span>
        </div>

        {/* Favourite */}
        <button
          type="button"
          aria-label={`Save ${hotel.name}`}
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-gray-900
            shadow-sm
            transition
            hover:scale-105
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.8 8.6C20.8 13.8 12 20 12 20S3.2 13.8 3.2 8.6C3.2 5.8 5.3 4 7.8 4C9.5 4 11 4.9 12 6.2C13 4.9 14.5 4 16.2 4C18.7 4 20.8 5.8 20.8 8.6Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-[-0.02em] text-gray-950">
              {hotel.name}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 21C16 17 19 13.8 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 13.8 8 17 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <circle
                  cx="12"
                  cy="9"
                  r="2.2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>

              <span>
                {hotel.location}
              </span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-lg font-semibold text-gray-950">
              {hotel.price}
            </p>

            <p className="text-xs text-gray-400">
              / night
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {hotel.amenities.map(
            (amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1.5 text-[11px] text-gray-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

                {amenity}
              </span>
            ),
          )}
        </div>
      </div>
    </article>
  );
};

export default HotelCard;