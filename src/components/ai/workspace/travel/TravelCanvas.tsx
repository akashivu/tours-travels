import { Compass } from "lucide-react";

import { FlightResults } from "./flights/FlightResults";
import { HotelResults } from "./hotels/HotelResults";
import { PlaceResults } from "./places/PlaceResults";
import { TripMap } from "./map/TripMap";

import type { FlightSearchResponse } from "./flights/flight.types";
import type { HotelSearchResponse } from "./hotels/hotel.types";
import type { PlaceSearchResponse } from "./places/place.types";
import type { TripMapData } from "./map/map.types";

type TravelCanvasView =
  | "empty"
  | "hotels"
  | "flights"
  | "places"
  | "trip";

interface TravelCanvasProps {
  view?: TravelCanvasView;

  flights?: FlightSearchResponse;
  hotels?: HotelSearchResponse;
  places?: PlaceSearchResponse;
  map?: TripMapData;

  isLoading?: boolean;

  error?: string | null;

  onFlightSelect?: (
    flightId: string
  ) => void;

  onHotelSelect?: (
    hotelId: string
  ) => void;

  onPlaceSelect?: (
    placeId: string
  ) => void;
}

export function TravelCanvas({
  view = "empty",
  flights,
  hotels,
  places,
  map,
  isLoading = false,
  error = null,
  onFlightSelect,
  onHotelSelect,
  onPlaceSelect,
}: TravelCanvasProps) {
  const renderContent = () => {
    switch (view) {
      case "flights":
        return (
          <FlightResults
            data={flights}
            isLoading={isLoading}
            error={error}
            onSelect={(flight) =>
              onFlightSelect?.(flight.id)
            }
          />
        );

      case "hotels":
        return (
          <HotelResults
            data={hotels}
            isLoading={isLoading}
            error={error}
            onSelect={(hotel) =>
              onHotelSelect?.(hotel.id)
            }
          />
        );

      case "places":
        return (
          <PlaceResults
            data={places}
            isLoading={isLoading}
            error={error}
            onSelect={(place) =>
              onPlaceSelect?.(place.id)
            }
          />
        );

      case "trip":
        return (
          <div className="h-full min-h-0">
            <TripMap
  data={map}
  isLoading={isLoading}
  error={error}
/>
          </div>
        );

      case "empty":
      default:
        return (
          <div
            className="
              flex
              h-full
              min-h-0
              items-center
              justify-center
              px-8
              py-10
            "
          >
            <div
              className="
                w-full
                max-w-xl
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                "
                style={{
                  background:
                    "var(--ai-card)",
                  borderColor:
                    "var(--ai-border)",
                  color:
                    "var(--ai-ink)",
                  boxShadow:
                    "0 8px 30px rgba(15, 23, 42, 0.04)",
                }}
              >
                <Compass
                  size={23}
                  strokeWidth={1.7}
                />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-semibold
                  tracking-tight
                "
                style={{
                  color:
                    "var(--ai-ink)",
                }}
              >
                Your travel workspace
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                "
                style={{
                  color:
                    "var(--ai-muted)",
                }}
              >
                Ask Elixway to find a flight,
                discover hotels, explore places
                or plan your complete journey.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      className="
        relative
        flex
        h-full
        min-h-0
        w-full
        min-w-0
        flex-1
        flex-col
        overflow-hidden
      "
      style={{
        background:
          "var(--ai-canvas)",
      }}
    >
      {/* Travel canvas content only */}

      <div
        className="
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {renderContent()}
      </div>
    </section>
  );
}