import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

const hotels = [
  {
    name: "The Riverside Bangkok",
    location: "Bangkok, Thailand",
    rating: "4.8",
    price: "₹4,800",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Siam Garden Hotel",
    location: "Central Bangkok",
    rating: "4.6",
    price: "₹5,200",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Bangkok City Retreat",
    location: "Sukhumvit, Bangkok",
    rating: "4.7",
    price: "₹6,100",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=700&q=80",
  },
];

export function HotelResultsPreview() {
  return (
    <div
      className="
        ai-scroll
        min-h-0
        flex-1
        overflow-y-auto
        p-6
      "
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {hotels.map((hotel) => (
          <article
            key={hotel.name}
            className="
              overflow-hidden
              rounded-[18px]
              border
              transition-transform
              duration-200
              hover:-translate-y-0.5
            "
            style={{
              background:
                "var(--ai-card)",
              borderColor:
                "var(--ai-border)",
              boxShadow:
                "var(--ai-shadow-sm)",
            }}
          >
            <div className="relative h-[170px] overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  left-3
                  top-3
                  flex
                  items-center
                  gap-1
                  rounded-full
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-medium
                "
                style={{
                  background:
                    "rgba(255,255,255,0.94)",
                  color:
                    "var(--ai-ink)",
                }}
              >
                <Star
                  size={11}
                  fill="currentColor"
                />
                {hotel.rating}
              </div>
            </div>

            <div className="p-4">
              <h3
                className="
                  text-[13px]
                  font-semibold
                "
                style={{
                  color:
                    "var(--ai-ink)",
                }}
              >
                {hotel.name}
              </h3>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-1
                  text-[10.5px]
                "
                style={{
                  color:
                    "var(--ai-muted)",
                }}
              >
                <MapPin size={12} />

                {hotel.location}
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span
                    className="
                      text-[16px]
                      font-semibold
                    "
                    style={{
                      color:
                        "var(--ai-ink)",
                    }}
                  >
                    {hotel.price}
                  </span>

                  <span
                    className="
                      ml-1
                      text-[10px]
                    "
                    style={{
                      color:
                        "var(--ai-muted)",
                    }}
                  >
                    / night
                  </span>
                </div>

                <button
                  type="button"
                  className="
                    flex
                    h-8
                    items-center
                    gap-1.5
                    rounded-[9px]
                    px-3
                    text-[10.5px]
                    font-medium
                  "
                  style={{
                    background:
                      "var(--ai-ink)",
                    color: "#ffffff",
                  }}
                >
                  View

                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}