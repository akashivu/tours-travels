import {
  useEffect,
  useRef,
} from "react";

interface AITravelMapProps {
  origin?: string | null;
  destination?: string | null;
}

export function AITravelMap({
  origin,
  destination,
}: AITravelMapProps) {
  const mapRef =
    useRef<HTMLDivElement>(null);

  const googleMapRef =
    useRef<google.maps.Map | null>(null);

  const markersRef =
    useRef<google.maps.Marker[]>([]);

  const attractionMarkersRef =
    useRef<google.maps.Marker[]>([]);

  const routeRef =
    useRef<google.maps.Polyline | null>(
      null
    );

  const airplaneMarkerRef =
    useRef<google.maps.Marker | null>(
      null
    );

  /*
   * Initialize Google Map once.
   */
  useEffect(() => {
    if (
      !mapRef.current ||
      googleMapRef.current ||
      !window.google?.maps
    ) {
      return;
    }

    googleMapRef.current =
      new window.google.maps.Map(
        mapRef.current,
        {
          center: {
            lat: 20.5937,
            lng: 78.9629,
          },
          zoom: 4,

          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,

          /*
           * YOUR EXISTING MAP COLORS
           * These are intentionally unchanged.
           */
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#293243",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#c5c9d1",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#293243",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#596273",
                },
                {
                  weight: 0.8,
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d6d9df",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [
                {
                  color: "#293243",
                },
              ],
            },
            {
              featureType: "poi",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#354052",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#071b36",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#7f94b2",
                },
              ],
            },
          ],
        }
      );
  }, []);

  /*
   * Update map whenever origin and destination
   * change.
   */
  useEffect(() => {
    if (
      !googleMapRef.current ||
      !window.google?.maps ||
      !origin ||
      !destination
    ) {
      return;
    }

    const map =
      googleMapRef.current;

    let cancelled = false;

    const geocoder =
      new window.google.maps.Geocoder();

    /*
     * Remove previous origin/destination markers.
     */
    markersRef.current.forEach(
      (marker) => marker.setMap(null)
    );

    markersRef.current = [];

    /*
     * Remove previous attraction markers.
     */
    attractionMarkersRef.current.forEach(
      (marker) => marker.setMap(null)
    );

    attractionMarkersRef.current = [];

    /*
     * Remove previous route.
     */
    if (routeRef.current) {
      routeRef.current.setMap(null);
      routeRef.current = null;
    }

    /*
     * Remove previous airplane.
     */
    if (airplaneMarkerRef.current) {
      airplaneMarkerRef.current.setMap(null);
      airplaneMarkerRef.current = null;
    }

    const geocodeLocation = (
      location: string
    ): Promise<google.maps.LatLng> => {
      return new Promise(
        (resolve, reject) => {
          geocoder.geocode(
            {
              address: location,
            },
            (results, status) => {
              if (
                status === "OK" &&
                results?.[0]
              ) {
                resolve(
                  results[0].geometry.location
                );
              } else {
                reject(
                  new Error(
                    `Unable to geocode "${location}": ${status}`
                  )
                );
              }
            }
          );
        }
      );
    };

    /*
     * Create a clean attraction marker icon.
     */
    const createAttractionIcon = () => {
      const attractionSvg = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="#ffffff"
            fill-opacity="0.96"
          />
          <path
            d="M12 5.5a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 8.5 4.5 8.5s4.5-5.125 4.5-8.5A4.5 4.5 0 0 0 12 5.5Zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z"
            fill="#334155"
          />
        </svg>
      `;

      return {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(attractionSvg),

        scaledSize:
          new window.google.maps.Size(
            26,
            26
          ),

        anchor:
          new window.google.maps.Point(
            13,
            13
          ),
      };
    };

    /*
     * Load tourist attractions using the same
     * modern Places API approach used by your
     * destination section.
     */
    const loadAttractions = async (
      destinationLocation: google.maps.LatLng
    ) => {
      try {
        const placesLibrary =
          window.google.maps.places;

        if (
          !placesLibrary ||
          !placesLibrary.Place
        ) {
          console.error(
            "Google Places API is loaded, but the Place class is not available."
          );
          return;
        }

        console.log(
          "Searching tourist attractions near:",
          destination
        );

        const result =
          await placesLibrary.Place.searchNearby({
            fields: [
              "displayName",
              "location",
              "formattedAddress",
              "id",
              "primaryType",
            ],

            includedPrimaryTypes: [
              "tourist_attraction",
            ],

            maxResultCount: 8,

            locationRestriction: {
              center: {
                lat: destinationLocation.lat(),
                lng: destinationLocation.lng(),
              },

              radius: 20000,
            },

            rankPreference:
              placesLibrary.SearchNearbyRankPreference
                ?.POPULARITY,
          });

        if (cancelled) {
          return;
        }

        const places =
          result.places || [];

        console.log(
          `Found ${places.length} tourist attractions near ${destination}:`,
          places
        );

        if (places.length === 0) {
          console.warn(
            `No tourist attractions found near ${destination}.`
          );
          return;
        }

        places
          .filter(
            (place) =>
              place.location &&
              place.displayName
          )
          .slice(0, 6)
          .forEach((place) => {
            if (
              !place.location ||
              cancelled
            ) {
              return;
            }

            const attractionMarker =
              new window.google.maps.Marker({
                position: place.location,
                map,

                title:
                  place.displayName?.toString() ||
                  "Tourist attraction",

                icon:
                  createAttractionIcon(),

                zIndex: 5,
              });

            /*
             * Show the attraction name when clicked.
             */
            const infoWindow =
              new window.google.maps.InfoWindow({
                content: `
                  <div style="
                    padding: 5px 7px;
                    font-family: Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    color: #1f2937;
                  ">
                    ${
                      place.displayName?.toString() ||
                      "Tourist attraction"
                    }
                  </div>
                `,
              });

            attractionMarker.addListener(
              "click",
              () => {
                infoWindow.open({
                  map,
                  anchor: attractionMarker,
                });
              }
            );

            attractionMarkersRef.current.push(
              attractionMarker
            );
          });
      } catch (error) {
        /*
         * This will now show the actual Places API
         * error in the browser console.
         */
        console.error(
          "Failed to load tourist attractions:",
          error
        );
      }
    };

    const updateMap = async () => {
      try {
        const [
          originLocation,
          destinationLocation,
        ] = await Promise.all([
          geocodeLocation(origin),
          geocodeLocation(destination),
        ]);

        if (cancelled) {
          return;
        }

        /*
         * ORIGIN MARKER
         */
        const originMarker =
          new window.google.maps.Marker({
            position: originLocation,
            map,
            title: origin,
            label: {
              text: "A",
              color: "#ffffff",
              fontWeight: "600",
            },
          });

        /*
         * DESTINATION MARKER
         */
        const destinationMarker =
          new window.google.maps.Marker({
            position: destinationLocation,
            map,
            title: destination,
            label: {
              text: "B",
              color: "#ffffff",
              fontWeight: "600",
            },
          });

        markersRef.current = [
          originMarker,
          destinationMarker,
        ];

        /* =============================================
           CREATE PRONOUNCED CURVED TRAVEL PATH
        ============================================= */

        const originLat =
          originLocation.lat();

        const originLng =
          originLocation.lng();

        const destinationLat =
          destinationLocation.lat();

        const destinationLng =
          destinationLocation.lng();

        const midLat =
          (originLat + destinationLat) / 2;

        const midLng =
          (originLng + destinationLng) / 2;

        const longitudeDistance =
          Math.abs(
            destinationLng - originLng
          );

        /*
         * Keep your existing pronounced curve.
         */
        const curveAmount =
          Math.max(
            longitudeDistance * 0.22,
            5
          );

        const controlPoint =
          new window.google.maps.LatLng(
            midLat + curveAmount,
            midLng
          );

        /*
         * Generate a smooth quadratic Bézier curve.
         */
        const curvePath:
          google.maps.LatLng[] = [];

        const totalPoints = 100;

        for (
          let i = 0;
          i <= totalPoints;
          i += 1
        ) {
          const t =
            i / totalPoints;

          const inverseT =
            1 - t;

          const lat =
            inverseT *
              inverseT *
              originLat +
            2 *
              inverseT *
              t *
              controlPoint.lat() +
            t *
              t *
              destinationLat;

          const lng =
            inverseT *
              inverseT *
              originLng +
            2 *
              inverseT *
              t *
              controlPoint.lng() +
            t *
              t *
              destinationLng;

          curvePath.push(
            new window.google.maps.LatLng(
              lat,
              lng
            )
          );
        }

        /*
         * CURVED SMALL DOTTED ROUTE
         */
        routeRef.current =
          new window.google.maps.Polyline({
            path: curvePath,

            /*
             * Hide solid line.
             */
            strokeOpacity: 0,

            icons: [
              {
                icon: {
                  path:
                    google.maps.SymbolPath
                      .CIRCLE,

                  scale: 1.5,

                  fillColor: "#f8fafc",
                  fillOpacity: 0.95,

                  strokeColor: "#f8fafc",
                  strokeOpacity: 0.95,

                  strokeWeight: 1,
                },

                offset: "0",
                repeat: "9px",
              },
            ],

            map,
          });

        /*
         * AIRPLANE AT THE CENTER OF THE CURVE
         */
        const centerIndex =
          Math.floor(
            curvePath.length / 2
          );

        const airplanePosition =
          curvePath[centerIndex];

        const beforeAirplane =
          curvePath[centerIndex - 1];

        const afterAirplane =
          curvePath[centerIndex + 1];

        const airplaneAngle =
          Math.atan2(
            afterAirplane.lat() -
              beforeAirplane.lat(),
            afterAirplane.lng() -
              beforeAirplane.lng()
          ) *
          (180 / Math.PI);

        const airplaneSvg = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            style="transform: rotate(${airplaneAngle}deg)"
          >
            <path
              d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z"
              fill="#ffffff"
            />
          </svg>
        `;

        airplaneMarkerRef.current =
          new window.google.maps.Marker({
            position: airplanePosition,
            map,
            title: "Travel route",

            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(
                  airplaneSvg
                ),

              scaledSize:
                new window.google.maps.Size(
                  28,
                  28
                ),

              anchor:
                new window.google.maps.Point(
                  14,
                  14
                ),
            },

            zIndex: 10,
          });

        /*
         * Keep both cities visible.
         */
        const bounds =
          new window.google.maps.LatLngBounds();

        bounds.extend(originLocation);
        bounds.extend(destinationLocation);

        map.fitBounds(bounds, 100);

        /*
         * Load attractions after the destination
         * has been successfully geocoded.
         *
         * This does NOT change the map bounds or
         * your existing map size.
         */
        void loadAttractions(
          destinationLocation
        );
      } catch (error) {
        console.error(
          "Unable to find travel locations:",
          error
        );
      }
    };

    void updateMap();

    /*
     * Cleanup when locations change or
     * component unmounts.
     */
    return () => {
      cancelled = true;

      markersRef.current.forEach(
        (marker) => marker.setMap(null)
      );

      markersRef.current = [];

      attractionMarkersRef.current.forEach(
        (marker) => marker.setMap(null)
      );

      attractionMarkersRef.current = [];

      if (routeRef.current) {
        routeRef.current.setMap(null);
        routeRef.current = null;
      }

      if (airplaneMarkerRef.current) {
        airplaneMarkerRef.current.setMap(null);
        airplaneMarkerRef.current = null;
      }
    };
  }, [
    origin,
    destination,
  ]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full"
      aria-label="Interactive travel map"
    />
  );
}