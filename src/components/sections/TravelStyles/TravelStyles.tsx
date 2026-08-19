import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TravelStyle {
  title: string;
  description: string;
  image: string;
}

const travelStyles: TravelStyle[] = [
  {
    title: "Beach escapes",
    description:
      "Relax by the sea, slow down and discover beautiful beaches, coastal towns, sunsets and peaceful escapes surrounded by nature.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Mountain getaways",
    description:
      "Find fresh air, breathtaking views and peaceful mountain landscapes while enjoying hiking, nature and unforgettable outdoor experiences.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "Culture & heritage",
    description:
      "Discover fascinating history, architecture, art, traditions, local communities and cultural experiences that bring every destination to life.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
  },
  {
    title: "City breaks",
    description:
      "Experience vibrant cities filled with iconic landmarks, neighbourhoods, restaurants, shopping, nightlife and exciting things to discover.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
  },
  {
    title: "Romantic trips",
    description:
      "Create memorable moments together with beautiful stays, scenic destinations, intimate experiences, sunsets and unforgettable escapes.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  {
    title: "Family holidays",
    description:
      "Enjoy trips designed for everyone with family-friendly attractions, comfortable stays, fun activities and experiences everyone can share.",
    image:
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624",
  },
  {
    title: "Adventure",
    description:
      "Go further and experience something new with thrilling activities, outdoor adventures, exploration, nature and experiences beyond the ordinary.",
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455",
  },
  {
    title: "Luxury escapes",
    description:
      "Travel beautifully with premium stays, exceptional dining, relaxing experiences, beautiful surroundings and carefully planned moments of comfort.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
];

// Splits a description roughly in half by words: the first half stays in
// the card body below the image, the second half is revealed on the image
// itself on hover.
const splitDescription = (description: string) => {
  const words = description.trim().split(" ");
  const mid = Math.ceil(words.length / 2);

  return {
    firstHalf: words.slice(0, mid).join(" "),
    secondHalf: words.slice(mid).join(" "),
  };
};

const TravelStyles = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrevious = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const handleStyleClick = (style: TravelStyle) => {
    navigate("/ai", {
      state: {
        source: "travel-style",

        travelStyle: {
          title: style.title,
          description: style.description,
          image: style.image,
        },
      },
    });
  };

  const handleAskElixway = () => {
    navigate("/ai", {
      state: {
        source: "travel-style-general",
        message:
          "Help me find the perfect travel style and trip based on what I like.",
      },
    });
  };

  return (
    <section
      className="
        overflow-hidden
        bg-white
        py-16
        lg:py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-[1400px]
          px-5
          sm:px-8
          lg:px-10
        "
      >
        {/* =========================
            HEADER
        ========================== */}
        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-6
          "
        >
          <div className="max-w-3xl">
            <p
              className="
                mb-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-gray-400
              "
            >
              Travel your way
            </p>

            <h2
              className="
                text-2xl
                font-semibold
                tracking-[-0.035em]
                text-gray-950
                sm:text-3xl
                lg:text-4xl
              "
            >
              What kind of journey are you looking for?
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-gray-500
                sm:text-base
              "
            >
              Discover a travel style that matches the way
              you want to experience the world, from relaxing
              escapes and mountain adventures to culture,
              romance and luxury.
            </p>
          </div>

          {/* DESKTOP ARROWS */}
          <div
            className="
              hidden
              shrink-0
              items-center
              gap-4
              lg:flex
            "
          >
            <button
              type="button"
              onClick={scrollPrevious}
              aria-label="Previous travel styles"
              className="
                text-gray-300
                transition-all
                duration-200
                hover:scale-125
                hover:text-gray-950
              "
            >
              <ChevronLeft
                size={27}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next travel styles"
              className="
                text-gray-300
                transition-all
                duration-200
                hover:scale-125
                hover:text-gray-950
              "
            >
              <ChevronRight
                size={27}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* =========================
            CAROUSEL
        ========================== */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="
              flex
              gap-4
              overflow-x-auto
              pb-3
              scrollbar-none
              snap-x
              snap-mandatory
            "
          >
            {travelStyles.map((style) => {
              const { firstHalf, secondHalf } = splitDescription(
                style.description
              );

              return (
                <button
                  key={style.title}
                  type="button"
                  onClick={() => handleStyleClick(style)}
                  className="
                    group
                    relative
                    flex
                    min-w-[82%]
                    shrink-0
                    snap-start
                    flex-col
                    overflow-hidden
                    rounded-[18px]
                    bg-white
                    p-0
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                   
                    sm:min-w-[48%]
                    md:min-w-[31.5%]
                    lg:min-w-[calc((100%-64px)/5)]
lg:max-w-[calc((100%-64px)/5)]
                  "
                >
                  {/* =========================
                      IMAGE
                  ========================== */}
                  <div
                    className="
                      relative
                      h-[155px]
                      shrink-0
                      rounded-2xl
                      overflow-hidden
                      sm:h-[165px]
                    "
                  >
                    <img
                      src={style.image}
                      alt={style.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* IMAGE OVERLAY (subtle, always on) */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/30
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* SECOND HALF OF TEXT — revealed on the image on hover */}
                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        flex
                        flex-col
                        justify-end
                        bg-gradient-to-t
                        from-gray-950/90
                        via-gray-950/60
                        to-transparent
                        px-4
                        pb-4
                        pt-10
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    >
                      <p
                        className="
                          text-[13px]
                          leading-[1.45]
                          text-white/90
                        "
                      >
                        …{secondHalf}
                      </p>
                    </div>
                  </div>

                  {/* =========================
                      CONTENT — title + first half of the description
                  ========================== */}
                  <div
                    className="
                      relative
                      flex
                      min-h-[100px]
                      flex-1
                      flex-col
                      bg-white
                      px-4
                      pb-4
                      pt-4
                    "
                  >
                    {/* TITLE */}
                    <h3
                      className="
                        text-[17px]
                        font-semibold
                        tracking-[-0.025em]
                        text-gray-950
                      "
                    >
                      {style.title}
                    </h3>

                    {/* FIRST HALF OF DESCRIPTION — always visible here */}
                    <p
                      className="
                        mt-2
                        text-[13px]
                        leading-[1.45]
                        text-gray-500
                      "
                    >
                      {firstHalf}…
                    </p>

                    {/* ASK ELIXWAY */}
                    <div
                      className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        pt-3
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-gray-400
                        "
                      >
                        Ask Elixway
                      </span>

                      <span
                        className="
                          text-sm
                          text-gray-300
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-gray-950
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* MOBILE ARROWS */}
          <div
            className="
              mt-4
              flex
              justify-end
              gap-4
              lg:hidden
            "
          >
            <button
              type="button"
              onClick={scrollPrevious}
              aria-label="Previous travel styles"
              className="
                text-gray-300
                transition-all
                duration-200
                hover:scale-125
                hover:text-gray-950
              "
            >
              <ChevronLeft
                size={23}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next travel styles"
              className="
                text-gray-300
                transition-all
                duration-200
                hover:scale-125
                hover:text-gray-950
              "
            >
              <ChevronRight
                size={23}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* =========================
            AI CTA
        ========================== */}
        <div
          className="
            mt-8
            text-center
          "
        >
          <p className="text-sm text-gray-400">
            Not sure what fits you?
          </p>

          <button
            type="button"
            onClick={handleAskElixway}
            className="
              mt-1
              text-sm
              font-medium
              text-gray-950
              underline
              underline-offset-4
              transition-colors
              hover:text-gray-500
            "
          >
            Ask Elixway to find your perfect trip →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TravelStyles;