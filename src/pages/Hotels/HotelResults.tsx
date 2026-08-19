import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";

type HotelResult = {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  roomType: string;
  bookingUrl?: string | null;
};

type HotelResultsProps = {
  hotels: HotelResult[];
};

export default function HotelResults({
  hotels,
}: HotelResultsProps) {
  if (!hotels.length) {
    return (
      <div className="mt-6 rounded-[12px] border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-sm font-medium text-gray-950">
          No hotels found
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Try another destination or date.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">

      <div>
        <h3 className="text-base font-semibold tracking-tight text-gray-950">
          Available hotels
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Compare stays for your trip
        </p>
      </div>

      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="
            overflow-hidden
            rounded-[12px]
            border
            border-gray-200
            bg-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-gray-300
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]
          "
        >
          <div className="grid lg:grid-cols-[220px_1fr_auto]">

            {/* Image */}

            <div className="h-48 lg:h-full">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* Details */}

            <div className="p-5">

              <h4 className="text-base font-semibold text-gray-950">
                {hotel.name}
              </h4>

              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={14} />

                {hotel.location}
              </div>

              <div className="mt-4 flex items-center gap-2">

                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  {hotel.rating}
                </span>

                <span className="text-xs text-gray-400">
                  {hotel.reviewCount} reviews
                </span>

              </div>

              <p className="mt-4 text-xs text-gray-500">
                {hotel.roomType}
              </p>

            </div>

            {/* Price */}

            <div className="flex min-w-[170px] flex-col justify-between border-t border-gray-100 p-5 lg:border-l lg:border-t-0">

              <div>
                <p className="text-xl font-semibold tracking-tight text-gray-950">
                  {hotel.currency}{" "}
                  {hotel.pricePerNight.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  per night
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (hotel.bookingUrl) {
                    window.location.href =
                      hotel.bookingUrl;
                  }
                }}
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-gray-950
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  transition
                  hover:bg-gray-800
                "
              >
                View hotel

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}