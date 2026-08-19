import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Section from "../../ui/Section";
import Container from "../../ui/Container";

import DestinationCard from "./DestinationCard";

import type { Destination } from "./destinations.types";

import { getDestinations } from "../../../services/destinationService";

const Destinations = () => {
  const navigate = useNavigate();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadDestinations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getDestinations();

        if (!cancelled) {
          setDestinations(data);
        }
      } catch (error) {
        console.error(
          "Failed to load destinations:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load destinations right now."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleExploreDestination = (
    destination: Destination
  ) => {
    if (!destination.slug) {
      console.error(
        "Destination slug is missing:",
        destination
      );

      return;
    }

    navigate(
      `/destinations/${destination.slug}`
    );
  };

  const scrollNext = () => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrevious = () => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <Section
      className="
        overflow-hidden
        bg-white
        py-12
        lg:py-16
      "
    >
      <Container>
        {/* =========================
            SECTION HEADER
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
          <div>
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
              Discover the world
            </p>

            <h2
              className="
                text-2xl
                font-semibold
                tracking-[-0.03em]
                text-gray-950
                sm:text-3xl
              "
            >
              Explore destinations
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-gray-500
                sm:text-base
              "
            >
              Discover inspiring destinations, iconic places, hidden gems,
  and unforgettable experiences for your next journey.
            </p>
          </div>
        </div>

        {/* =========================
            LOADING STATE
        ========================== */}
        {isLoading ? (
          <div
            className="
              flex
              gap-3
              overflow-hidden
            "
          >
            {Array.from({
              length: 7,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  h-[220px]
                  min-w-[calc(50%-6px)]
                  shrink-0
                  animate-pulse
                  rounded-[20px]
                  bg-gray-100
                  sm:min-w-[calc(33.333%-8px)]
                  md:min-w-[calc(25%-9px)]
                  lg:min-w-[calc((100%-72px)/7)]
                "
              />
            ))}
          </div>
        ) : error ? (
          /* =========================
             ERROR STATE
          ========================== */
          <div
            className="
              py-12
              text-center
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                mt-4
                text-sm
                font-medium
                text-gray-950
                underline
                underline-offset-4
              "
            >
              Try again
            </button>
          </div>
        ) : destinations.length === 0 ? (
          /* =========================
             EMPTY STATE
          ========================== */
          <div
            className="
              py-12
              text-center
            "
          >
            <p
              className="
                text-sm
                text-gray-500
              "
            >
              No destinations available right now.
            </p>
          </div>
        ) : (
          /* =========================
             DESTINATION CAROUSEL
          ========================== */
          <div className="relative">
            <div
              ref={scrollRef}
              className="
                flex
                gap-3
                overflow-x-auto
                scroll-smooth
                scrollbar-none
                snap-x
                snap-mandatory
              "
            >
              {destinations.map(
                (destination) => (
                  <div
                    key={destination.id}
                    className="
                      min-w-[85%]
                      shrink-0
                      snap-start
                      sm:min-w-[calc(50%-6px)]
                      md:min-w-[calc(33.333%-8px)]
                      lg:min-w-[calc((100%-72px)/7)]
                    "
                  >
                    <DestinationCard
                      destination={
                        destination
                      }
                      onExplore={
                        handleExploreDestination
                      }
                    />
                  </div>
                )
              )}
            </div>

            {/* =========================
                PREVIOUS ARROW
            ========================== */}
            {destinations.length > 7 && (
              <button
                type="button"
                onClick={scrollPrevious}
                aria-label="
                  Previous destinations
                "
                className="
                  absolute
                  left-[-18px]
                  top-1/2
                  hidden
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-gray-400
                  transition-all
                  duration-200
                  hover:scale-125
                  hover:text-gray-950
                  lg:flex
                "
              >
                <ChevronLeft
                  size={28}
                  strokeWidth={2}
                />
              </button>
            )}

            {/* =========================
                NEXT ARROW
            ========================== */}
            {destinations.length > 7 && (
              <button
                type="button"
                onClick={scrollNext}
                aria-label="
                  Next destinations
                "
                className="
                  absolute
                  right-[-18px]
                  top-1/2
                  hidden
                  -translate-y-1/2
                  items-center
                  justify-center
                  text-gray-400
                  transition-all
                  duration-200
                  hover:scale-125
                  hover:text-gray-950
                  lg:flex
                "
              >
                <ChevronRight
                  size={28}
                  strokeWidth={2}
                />
              </button>
            )}

            {/* =========================
                MOBILE CONTROLS
            ========================== */}
            {destinations.length > 1 && (
              <div
                className="
                  mt-5
                  flex
                  justify-end
                  gap-3
                  lg:hidden
                "
              >
                <button
                  type="button"
                  onClick={scrollPrevious}
                  aria-label="
                    Previous destinations
                  "
                  className="
                    text-gray-400
                    transition-all
                    duration-200
                    hover:scale-125
                    hover:text-gray-950
                  "
                >
                  <ChevronLeft
                    size={24}
                    strokeWidth={2}
                  />
                </button>

                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="
                    Next destinations
                  "
                  className="
                    text-gray-400
                    transition-all
                    duration-200
                    hover:scale-125
                    hover:text-gray-950
                  "
                >
                  <ChevronRight
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================
            DESTINATION INTRO
        ========================== */}
        <div
          className="
            mx-auto
            mt-14
            max-w-2xl
            text-center
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            Your journey starts here
          </p>

          <p
            className="
              mt-3
              text-xl
              font-medium
              leading-relaxed
              tracking-[-0.02em]
              text-gray-900
              sm:text-2xl
            "
          >
            Travel beyond the destination.
            Discover places, experiences,
            and stays curated around the way
            you want to travel.
          </p>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-gray-500
            "
          >
            Explore a destination, discover
            what is around you, and turn
            inspiration into your next journey.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default Destinations;