import { useEffect, useRef, useState } from "react";
import { importLibrary } from "@googlemaps/js-api-loader";

type PlaceCategory = "hotels" | "tourist" | "things";

interface GoogleDestinationMapProps {
  destination: {
    name: string;
    coordinates: [number, number];
  };
}

interface DestinationPlace {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  address?: string;
  category: PlaceCategory;
  photoUrl?: string;
  primaryType?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/* =========================================================
   PLACE MARKER
========================================================= */

const createMarkerContent = (
  category: PlaceCategory,
) => {
  const wrapper = document.createElement("div");

  wrapper.style.width = "38px";
  wrapper.style.height = "38px";
  wrapper.style.borderRadius = "50%";
  wrapper.style.background = "#111111";
  wrapper.style.border = "2px solid rgba(255,255,255,.95)";
  wrapper.style.boxShadow =
    "0 4px 14px rgba(0,0,0,.35)";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.cursor = "pointer";

  if (category === "hotels") {
    wrapper.innerHTML = `
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 18V7.5C3 6.67 3.67 6 4.5 6H9C10.1 6 11 6.9 11 8V11H18C19.66 11 21 12.34 21 14V18"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 15H21"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
    `;
  } else if (category === "tourist") {
    wrapper.innerHTML = `
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 20H20"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <path
          d="M6 20V10L12 5L18 10V20"
          stroke="white"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
        <path
          d="M9 20V13H15V20"
          stroke="white"
          stroke-width="1.8"
        />
      </svg>
    `;
  } else {
    wrapper.innerHTML = `
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 3L14.2 9.8L21 12L14.2 14.2L12 21L9.8 14.2L3 12L9.8 9.8L12 3Z"
          stroke="white"
          stroke-width="1.7"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }

  return wrapper;
};

/* =========================================================
   DESTINATION MARKER
========================================================= */

const createDestinationMarkerContent = () => {
  const wrapper = document.createElement("div");

  wrapper.style.width = "42px";
  wrapper.style.height = "42px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";

  wrapper.innerHTML = `
    <div
      style="
        width:18px;
        height:18px;
        border-radius:50%;
        background:#111111;
        border:3px solid white;
        box-shadow:0 3px 12px rgba(0,0,0,.4);
      "
    ></div>
  `;

  return wrapper;
};

/* =========================================================
   USER LOCATION MARKER
========================================================= */

const createUserMarkerContent = () => {
  const wrapper = document.createElement("div");

  wrapper.style.width = "42px";
  wrapper.style.height = "42px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";

  wrapper.innerHTML = `
    <div
      style="
        width:34px;
        height:34px;
        border-radius:50%;
        background:#111111;
        border:2px solid white;
        box-shadow:0 3px 14px rgba(0,0,0,.4);
        display:flex;
        align-items:center;
        justify-content:center;
      "
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2V6"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <path
          d="M12 18V22"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <path
          d="M2 12H6"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <path
          d="M18 12H22"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="white"
          stroke-width="1.8"
        />
      </svg>
    </div>
  `;

  return wrapper;
};

/* =========================================================
   CATEGORY LABEL
========================================================= */

const getCategoryLabel = (
  category: PlaceCategory,
) => {
  switch (category) {
    case "hotels":
      return "Hotel";

    case "tourist":
      return "Place to visit";

    case "things":
      return "Thing to do";
  }
};

/* =========================================================
   COMPONENT
========================================================= */

const GoogleDestinationMap = ({
  destination,
}: GoogleDestinationMapProps) => {
  const mapRef =
    useRef<HTMLDivElement | null>(null);

  const mapInstance =
    useRef<google.maps.Map | null>(null);

  const destinationMarker =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(
      null,
    );

  const userMarker =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(
      null,
    );

  const placeMarkers =
    useRef<
      google.maps.marker.AdvancedMarkerElement[]
    >([]);

  const routePolylines =
    useRef<google.maps.Polyline[]>([]);

  const userPositionRef =
    useRef<google.maps.LatLngLiteral | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [locationError, setLocationError] =
    useState<string | null>(null);

  const [places, setPlaces] =
    useState<
      Record<
        PlaceCategory,
        DestinationPlace[]
      >
    >({
      hotels: [],
      tourist: [],
      things: [],
    });

  const [selectedPlace, setSelectedPlace] =
    useState<DestinationPlace | null>(null);

  const [routeLoading, setRouteLoading] =
    useState(false);

  const [routeVisible, setRouteVisible] =
    useState(false);

  const [routeError, setRouteError] =
    useState<string | null>(null);

  const [routeDistance, setRouteDistance] =
    useState<number | null>(null);

  const [routeDuration, setRouteDuration] =
    useState<number | null>(null);

  /* =========================================================
     CLEAR ROUTE
  ========================================================= */

  const clearRoute = () => {
    routePolylines.current.forEach(
      (polyline) => {
        polyline.setMap(null);
      },
    );

    routePolylines.current = [];

    setRouteVisible(false);
    setRouteDistance(null);
    setRouteDuration(null);
  };

  /* =========================================================
     DRAW ROUTE
  ========================================================= */

  const drawRoute = async () => {
    if (
      !mapInstance.current ||
      !userPositionRef.current
    ) {
      setRouteError(
        "Your current location is not available yet.",
      );

      return;
    }

    setRouteLoading(true);
    setRouteError(null);

    try {
      const { Route } =
        (await importLibrary(
          "routes",
        )) as google.maps.RoutesLibrary;

      const destinationPosition = {
        lat: destination.coordinates[1],
        lng: destination.coordinates[0],
      };

      const { routes } =
        await Route.computeRoutes({
          origin:
            userPositionRef.current,

          destination:
            destinationPosition,

          travelMode: "DRIVING",

          computeAlternativeRoutes: false,

          fields: [
            "path",
            "distanceMeters",
            "durationMillis",
          ],
        });

      if (!routes?.length) {
        throw new Error(
          "No route found.",
        );
      }

      const route = routes[0];

      routePolylines.current.forEach(
        (polyline) => {
          polyline.setMap(null);
        },
      );

      routePolylines.current = [];

      const polylines =
        route.createPolylines({
          polylineOptions: {
            strokeColor: "#ffffff",
            strokeOpacity: 0.82,
            strokeWeight: 4,
          },
        });

      polylines.forEach(
        (polyline) => {
          polyline.setMap(
            mapInstance.current,
          );

          routePolylines.current.push(
            polyline,
          );
        },
      );

      if (
        typeof route.distanceMeters ===
        "number"
      ) {
        setRouteDistance(
          route.distanceMeters,
        );
      }

      if (
        typeof route.durationMillis ===
        "number"
      ) {
        setRouteDuration(
          route.durationMillis,
        );
      }

      if (route.path?.length) {
        const bounds =
          new google.maps.LatLngBounds();

        route.path.forEach(
          (point) => {
            bounds.extend(point);
          },
        );

        mapInstance.current.fitBounds(
          bounds,
          70,
        );
      }

      setRouteVisible(true);
    } catch (error) {
      console.error(
        "Route calculation failed:",
        error,
      );

      setRouteError(
        "Unable to calculate the route.",
      );
    } finally {
      setRouteLoading(false);
    }
  };

  /* =========================================================
     INITIALIZE MAP
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const initializeMap = async () => {
      if (!API_KEY) {
        setLocationError(
          "Google Maps API key is missing.",
        );

        setLoading(false);

        return;
      }

      try {
        const [
          mapsLibrary,
          markerLibrary,
          placesLibrary,
        ] = await Promise.all([
          importLibrary("maps"),
          importLibrary("marker"),
          importLibrary("places"),
        ]);

        const { Map } =
          mapsLibrary as google.maps.MapsLibrary;

        const {
          AdvancedMarkerElement,
        } =
          markerLibrary as google.maps.MarkerLibrary;

        const { Place } =
          placesLibrary as google.maps.PlacesLibrary;

        if (
          !mapRef.current ||
          cancelled
        ) {
          return;
        }

        const destinationPosition = {
          lat: destination.coordinates[1],
          lng: destination.coordinates[0],
        };

        /* =================================================
           MAP

           IMPORTANT:
           mapId is used for Google Cloud styling.
           Do not add hardcoded `styles` here.
        ================================================= */

        const map = new Map(
          mapRef.current,
          {
            center:
              destinationPosition,

            zoom: 11,

            mapId: "DEMO_MAP_ID",

            backgroundColor:
              "#00152f",

            mapTypeControl: false,

            streetViewControl: false,

            fullscreenControl: false,

            zoomControl: true,

            gestureHandling:
              "greedy",
          },
        );

        mapInstance.current = map;

        /* =================================================
           DESTINATION MARKER
        ================================================= */

        destinationMarker.current =
          new AdvancedMarkerElement({
            map,

            position:
              destinationPosition,

            title:
              destination.name,

            content:
              createDestinationMarkerContent(),
          });

        /* =================================================
           SEARCH PLACES
        ================================================= */

        const searchCategory =
          async (
            category: PlaceCategory,
          ) => {
            let includedPrimaryTypes: string[];

            switch (category) {
              case "hotels":
                includedPrimaryTypes = [
                  "hotel",
                ];
                break;

              case "tourist":
                includedPrimaryTypes = [
                  "tourist_attraction",
                ];
                break;

              default:
                includedPrimaryTypes = [
                  "museum",
                  "park",
                  "zoo",
                  "aquarium",
                  "amusement_park",
                ];
            }

            try {
              const result =
                await Place.searchNearby({
                  fields: [
                    "displayName",
                    "location",
                    "formattedAddress",
                    "id",
                    "photos",
                    "primaryType",
                  ],

                  includedPrimaryTypes,

                  maxResultCount: 20,

                  locationRestriction: {
                    center:
                      destinationPosition,

                    radius: 25000,
                  },

                  rankPreference:
                    google.maps.places
                      .SearchNearbyRankPreference
                      .POPULARITY,
                });

              if (
                cancelled ||
                !result.places
              ) {
                return;
              }

              const results: DestinationPlace[] =
                result.places
                  .filter(
                    (place) =>
                      place.location &&
                      place.displayName,
                  )
                  .map((place) => {
                    let photoUrl:
                      | string
                      | undefined;

                    try {
                      photoUrl =
                        place.photos?.[0]?.getURI(
                          {
                            maxWidth: 800,
                            maxHeight: 500,
                          },
                        );
                    } catch {
                      photoUrl =
                        undefined;
                    }

                    return {
                      id:
                        place.id ??
                        `${category}-${Math.random()}`,

                      name:
                        place.displayName?.toString() ??
                        "Place",

                      position: {
                        lat:
                          place.location!.lat(),

                        lng:
                          place.location!.lng(),
                      },

                      address:
                        place.formattedAddress ??
                        undefined,

                      category,

                      photoUrl,

                      primaryType:
                        place.primaryType ??
                        undefined,
                    };
                  });

              setPlaces(
                (previous) => ({
                  ...previous,
                  [category]:
                    results,
                }),
              );
            } catch (error) {
              console.error(
                `Failed to search ${category}:`,
                error,
              );
            }
          };

        await Promise.all([
          searchCategory("hotels"),
          searchCategory("tourist"),
          searchCategory("things"),
        ]);

        /* =================================================
           USER LOCATION
        ================================================= */

        if (!navigator.geolocation) {
          setLocationError(
            "Location is not supported by this browser.",
          );

          setLoading(false);

          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (cancelled) {
              return;
            }

            const currentPosition = {
              lat:
                position.coords.latitude,

              lng:
                position.coords.longitude,
            };

            userPositionRef.current =
              currentPosition;

            userMarker.current =
              new AdvancedMarkerElement({
                map,

                position:
                  currentPosition,

                title:
                  "Your location",

                content:
                  createUserMarkerContent(),
              });

            const bounds =
              new google.maps.LatLngBounds();

            bounds.extend(
              currentPosition,
            );

            bounds.extend(
              destinationPosition,
            );

            map.fitBounds(
              bounds,
              70,
            );

            setLoading(false);
          },

          () => {
            if (cancelled) {
              return;
            }

            map.setCenter(
              destinationPosition,
            );

            map.setZoom(11);

            setLocationError(
              "Location access was not available.",
            );

            setLoading(false);
          },

          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000,
          },
        );
      } catch (error) {
        console.error(
          "Google Maps initialization failed:",
          error,
        );

        setLocationError(
          "Unable to load Google Maps.",
        );

        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      cancelled = true;

      userMarker.current?.map &&
        (userMarker.current.map = null);

      destinationMarker.current?.map &&
        (destinationMarker.current.map =
          null);

      placeMarkers.current.forEach(
        (marker) => {
          marker.map = null;
        },
      );

      routePolylines.current.forEach(
        (polyline) => {
          polyline.setMap(null);
        },
      );

      placeMarkers.current = [];
      routePolylines.current = [];

      mapInstance.current = null;
      userPositionRef.current = null;
    };
  }, [destination]);

  /* =========================================================
     CREATE PLACE MARKERS
  ========================================================= */

  useEffect(() => {
    if (!mapInstance.current) {
      return;
    }

    placeMarkers.current.forEach(
      (marker) => {
        marker.map = null;
      },
    );

    placeMarkers.current = [];

    Object.entries(places).forEach(
      ([category, categoryPlaces]) => {
        categoryPlaces.forEach(
          (place) => {
            if (!mapInstance.current) {
              return;
            }

            const marker =
              new google.maps.marker.AdvancedMarkerElement(
                {
                  map:
                    mapInstance.current,

                  position:
                    place.position,

                  title:
                    place.name,

                  content:
                    createMarkerContent(
                      category as PlaceCategory,
                    ),
                },
              );

            marker.addListener(
              "click",
              () => {
                setSelectedPlace(
                  place,
                );

                mapInstance.current?.panTo(
                  place.position,
                );

                mapInstance.current?.setZoom(
                  15,
                );
              },
            );

            placeMarkers.current.push(
              marker,
            );
          },
        );
      },
    );
  }, [places]);

  /* =========================================================
     FORMAT ROUTE
  ========================================================= */

  const formatDistance = (
    meters: number,
  ) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }

    return `${(
      meters / 1000
    ).toFixed(1)} km`;
  };

  const formatDuration = (
    milliseconds: number,
  ) => {
    const minutes = Math.round(
      milliseconds / 60000,
    );

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(
      minutes / 60,
    );

    const remaining =
      minutes % 60;

    return remaining
      ? `${hours} hr ${remaining} min`
      : `${hours} hr`;
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="relative h-full min-h-[560px] w-full overflow-hidden rounded-[26px] bg-[#00152f]">

      <div
        ref={mapRef}
        className="h-[560px] w-full"
      />

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#00152f]/90">
          <div className="rounded-full border border-white/10 bg-black/70 px-5 py-3 text-sm text-white shadow-xl backdrop-blur-md">
            Exploring {destination.name}...
          </div>
        </div>
      )}

      {/* =================================================
          LOCATION MESSAGE
      ================================================= */}

      {locationError && !loading && (
        <div className="absolute right-4 top-4 z-20 max-w-[230px] rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-xs leading-5 text-white shadow-xl backdrop-blur-md">
          {locationError}
        </div>
      )}

      {/* =================================================
          MAP LEGEND
      ================================================= */}

      <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">

          <span className="flex items-center gap-1.5 text-[10px] text-white/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-black">
              H
            </span>
            Hotels
          </span>

          <span className="flex items-center gap-1.5 text-[10px] text-white/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-black">
              P
            </span>
            Places
          </span>

          <span className="flex items-center gap-1.5 text-[10px] text-white/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] text-black">
              ✦
            </span>
            Things
          </span>

        </div>
      </div>

      {/* =================================================
          ASK ELIXWAY
      ================================================= */}

      {!selectedPlace && (
        <div className="absolute bottom-5 right-5 z-20 w-[270px] max-w-[calc(100%-40px)]">

          <div className="rounded-[20px] border border-white/20 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                ✦
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                  Elixway AI
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-950">
                  Planning your trip?
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Ask Elixway what to see, where to stay,
                  or what to do in {destination.name}.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-black px-4 py-3 text-xs font-medium text-white transition hover:bg-gray-800"
            >
              <span>
                Ask Elixway
              </span>

              <span className="text-sm">
                →
              </span>
            </button>

          </div>
        </div>
      )}

      {/* =================================================
          ROUTE BUTTON
      ================================================= */}

      {!routeVisible && (
        <div className="absolute bottom-5 left-5 z-20">

          <button
            type="button"
            onClick={drawRoute}
            disabled={
              routeLoading ||
              !userPositionRef.current
            }
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-medium text-gray-950 shadow-xl transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
              →
            </span>

            {routeLoading
              ? "Finding route..."
              : "Route from here"}
          </button>

        </div>
      )}

      {/* =================================================
          ROUTE INFO
      ================================================= */}

      {routeVisible && (
        <div className="absolute bottom-5 left-5 z-20 rounded-2xl border border-white/10 bg-black/85 px-4 py-3 text-white shadow-xl backdrop-blur-md">

          <div className="flex items-center gap-4">

            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/50">
                Route to {destination.name}
              </p>

              <div className="mt-1 flex items-center gap-2">

                {routeDistance !== null && (
                  <span className="text-sm font-medium">
                    {formatDistance(
                      routeDistance,
                    )}
                  </span>
                )}

                {routeDuration !== null && (
                  <>
                    <span className="text-white/30">
                      ·
                    </span>

                    <span className="text-xs text-white/60">
                      {formatDuration(
                        routeDuration,
                      )}
                    </span>
                  </>
                )}

              </div>
            </div>

            <button
              type="button"
              onClick={clearRoute}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              ×
            </button>

          </div>
        </div>
      )}

      {/* =================================================
          ROUTE ERROR
      ================================================= */}

      {routeError && (
        <div className="absolute bottom-5 left-5 z-30 max-w-[280px] rounded-xl border border-white/10 bg-black/85 px-4 py-3 text-xs text-white shadow-xl backdrop-blur-md">

          {routeError}

          <button
            type="button"
            onClick={() =>
              setRouteError(null)
            }
            className="ml-2 underline underline-offset-2"
          >
            Close
          </button>

        </div>
      )}

      {/* =================================================
          SELECTED PLACE
      ================================================= */}

      {selectedPlace && (
        <div className="absolute bottom-5 left-5 z-30 w-[280px] max-w-[calc(100%-40px)] overflow-hidden rounded-[20px] border border-white/10 bg-[#111111] text-white shadow-2xl">

          {selectedPlace.photoUrl && (
            <div className="relative h-[145px] overflow-hidden">

              <img
                src={selectedPlace.photoUrl}
                alt={selectedPlace.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setSelectedPlace(null)
                }
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur"
              >
                ×
              </button>

            </div>
          )}

          <div className="p-4">

            <p className="text-[9px] uppercase tracking-[0.16em] text-white/45">
              {getCategoryLabel(
                selectedPlace.category,
              )}
            </p>

            <h3 className="mt-1.5 text-lg font-medium tracking-[-0.02em]">
              {selectedPlace.name}
            </h3>

            {selectedPlace.address && (
              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-white/55">
                {selectedPlace.address}
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                mapInstance.current?.panTo(
                  selectedPlace.position,
                );

                mapInstance.current?.setZoom(
                  16,
                );
              }}
              className="mt-4 flex w-full items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-xs font-medium text-black transition hover:bg-gray-100"
            >
              <span>
                View on map
              </span>

              <span>
                →
              </span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default GoogleDestinationMap;