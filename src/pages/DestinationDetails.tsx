import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Container from "../components/ui/Container";
import Section from "../components/ui/Section";

import GoogleDestinationMap from "../components/sections/Destinations/GoogleDestinationMap";
import PlacePhoto from "../components/sections/Destinations/PlacePhoto";

import type { Destination } from "../components/sections/Destinations/destinations.types";

import {
  getDestinations,
  getGooglePlaceDetails,
  getNearbyPlaces,
  getPlaceDetails,
} from "../services/destinationService";

import type {
  GooglePlaceDetails,
  NearbyPlace,
} from "../services/destinationService";

const NEARBY_CATEGORIES = [
  { id: "tourist_attraction", label: "Attractions" },
  { id: "restaurant", label: "Restaurants" },
  { id: "cafe", label: "Cafes" },
  { id: "shopping_mall", label: "Shopping" },
  { id: "park", label: "Parks" },
];

// how long the drawer's slide transition takes — keep in sync with the
// duration-300 classes below so we don't clear the place mid-animation
const DRAWER_TRANSITION_MS = 300;

const DestinationDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [googleDetails, setGoogleDetails] = useState<GooglePlaceDetails | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [nearbyType, setNearbyType] = useState("tourist_attraction");
  const [isLoading, setIsLoading] = useState(true);
  const [isNearbyLoading, setIsNearbyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * =========================================================
   * SELECTED PLACE (drawer)
   * =========================================================
   */

  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<GooglePlaceDetails | null>(null);
  const [isPlaceDetailsLoading, setIsPlaceDetailsLoading] = useState(false);
  const [placeDetailsError, setPlaceDetailsError] = useState<string | null>(null);

  // drives the slide transform + backdrop fade, decoupled from selectedPlace
  // so the drawer can animate OUT before we unmount its content
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /*
   * =========================================================
   * LOAD DESTINATION
   * =========================================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadDestination = async () => {
      if (!slug) {
        setError("Destination was not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const destinations = await getDestinations();
        const selected = destinations.find((item) => item.slug === slug);

        if (!selected) {
          throw new Error("Destination not found.");
        }

        const [details, nearby] = await Promise.all([
          getGooglePlaceDetails(selected.slug),
          getNearbyPlaces(selected.slug, "tourist_attraction"),
        ]);

        if (cancelled) return;

        setDestination(selected);
        setGoogleDetails(details);
        setNearbyPlaces(nearby);
      } catch (err) {
        console.error("Failed to load destination:", err);
        if (!cancelled) {
          setError("Unable to load destination information right now.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadDestination();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  /*
   * =========================================================
   * CHANGE NEARBY CATEGORY
   * =========================================================
   */

  const handleNearbyCategoryChange = async (type: string) => {
    if (!destination) return;

    try {
      setNearbyType(type);
      setIsNearbyLoading(true);
      const places = await getNearbyPlaces(destination.slug, type);
      setNearbyPlaces(places);
    } catch (err) {
      console.error("Failed to load nearby places:", err);
    } finally {
      setIsNearbyLoading(false);
    }
  };

  /*
   * =========================================================
   * OPEN / CLOSE DRAWER
   * =========================================================
   */

  const handlePlaceClick = async (place: NearbyPlace) => {
    setSelectedPlace(place);
    setSelectedPlaceDetails(null);
    setPlaceDetailsError(null);
    setIsPlaceDetailsLoading(true);

    // mount first, then flip the transform on the next frame so the
    // browser actually animates the slide-in instead of snapping open
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsDrawerOpen(true));
    });

    try {
      const details = await getPlaceDetails(place.id);
      setSelectedPlaceDetails(details);
    } catch (err) {
      console.error("Failed to load place details:", err);
      setPlaceDetailsError("Unable to load details for this place right now.");
    } finally {
      setIsPlaceDetailsLoading(false);
    }
  };

  const closePlaceDetails = () => {
    // animate out first, then clear the data once the transition ends
    // so the drawer doesn't visibly go blank before it slides away
    setIsDrawerOpen(false);

    window.setTimeout(() => {
      setSelectedPlace(null);
      setSelectedPlaceDetails(null);
      setPlaceDetailsError(null);
      setIsPlaceDetailsLoading(false);
    }, DRAWER_TRANSITION_MS);
  };

  /*
   * =========================================================
   * ESCAPE KEY
   * =========================================================
   */

  useEffect(() => {
    if (!selectedPlace) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePlaceDetails();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlace]);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Section className="pb-0 pt-8 lg:pt-10">
          <Container>
            <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
          </Container>
        </Section>

        <Section className="pt-6">
          <Container>
            <div className="h-[480px] animate-pulse rounded-[32px] bg-gray-100" />
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
                <div className="h-10 w-80 animate-pulse rounded bg-gray-100" />
                <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-gray-100" />
              </div>
              <div className="h-72 animate-pulse rounded-[24px] bg-gray-100" />
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error || !destination) {
    return (
      <main className="min-h-screen bg-white">
        <Section className="py-16 lg:py-24">
          <Container>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
            >
              <span className="text-lg">←</span>
              Back to destinations
            </Link>

            <div className="flex min-h-[50vh] items-center justify-center text-center">
              <div>
                <p className="text-sm text-gray-500">
                  {error ?? "Destination not found."}
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Back to destinations
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  /*
   * =========================================================
   * DESTINATION VALUES
   * =========================================================
   */

  const placeName = googleDetails?.displayName?.text ?? destination.name;

  const rating =
    googleDetails?.rating != null ? googleDetails.rating.toFixed(1) : null;

  const reviewCount =
    googleDetails?.userRatingCount != null
      ? googleDetails.userRatingCount.toLocaleString()
      : null;

  const address =
    googleDetails?.formattedAddress ??
    `${destination.name}, ${destination.country}`;

  /*
   * =========================================================
   * SELECTED PLACE VALUES
   * =========================================================
   */

  const selectedPlaceName =
    selectedPlaceDetails?.displayName?.text ??
    selectedPlace?.displayName?.text ??
    "Place";

  const selectedPlaceRating =
    selectedPlaceDetails?.rating != null
      ? selectedPlaceDetails.rating.toFixed(1)
      : null;

  const selectedPlaceReviewCount =
    selectedPlaceDetails?.userRatingCount != null
      ? selectedPlaceDetails.userRatingCount.toLocaleString()
      : null;

  const selectedPlacePhoto =
    selectedPlaceDetails?.photos?.[0]?.name ?? selectedPlace?.photos?.[0]?.name;

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      <main className="bg-white">
        {/* BACK */}
        <Section className="pb-0 pt-8 lg:pt-10">
          <Container>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
            >
              <span className="text-lg">←</span>
              Back to destinations
            </Link>
          </Container>
        </Section>

        {/* HERO */}
        <Section className="pb-0 pt-6 lg:pt-8">
          <Container>
            <div className="relative h-[62vh] max-h-[560px] min-h-[380px] overflow-hidden rounded-[32px] bg-gray-100">
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
                <div>
                  {rating !== null && (
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/80">
                      <span className="text-white">★</span>
                      <span>{rating}</span>
                      {reviewCount !== null && (
                        <span className="text-white/50">
                          · {reviewCount} reviews
                        </span>
                      )}
                    </div>
                  )}

                  <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    {placeName}
                  </h1>

                  <p className="mt-2 text-sm text-white/70">
                    {destination.country}
                  </p>
                </div>

                {googleDetails?.websiteUri && (
                  <a
                    href={googleDetails.websiteUri}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-3 rounded-full bg-white/95 px-5 py-3 text-sm font-medium text-black transition hover:bg-white"
                  >
                    Official website
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* OVERVIEW */}
        <Section className="py-16 lg:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-400">
                  About the destination
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl">
                  Discover {destination.name}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-gray-500">
                  {destination.description}
                </p>

                <div className="mt-10 rounded-[24px] border border-gray-100 bg-gray-50 p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs text-white">
                      ✦
                    </span>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-400">
                      Elixway AI insight · Why visit
                    </p>
                  </div>

                  <p className="mt-5 max-w-xl text-base leading-8 text-gray-600">
                    {destination.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-gray-950 hover:text-gray-950"
                    >
                      Explore
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-gray-950 hover:text-gray-950"
                    >
                      Experiences
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-gray-950 hover:text-gray-950"
                    >
                      Local discovery
                    </button>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <aside className="lg:sticky lg:top-8 lg:h-fit">
                <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-gray-100">
                  <div className="h-[420px] sm:h-[480px]">
                    <GoogleDestinationMap
                      destination={{
                        name: destination.name,
                        coordinates: destination.coordinates,
                      }}
                    />
                  </div>

                  <div className="flex items-start gap-2 border-t border-gray-100 bg-white px-5 py-4">
                    <span className="mt-0.5 text-gray-300">📍</span>
                    <p className="line-clamp-2 text-xs leading-5 text-gray-500">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-gray-400">
                  {rating !== null && (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-gray-950">★</span>
                      <span className="font-medium text-gray-700">{rating}</span>
                      {reviewCount !== null && <span>({reviewCount})</span>}
                    </span>
                  )}

                  <span>
                    {destination.name}, {destination.country}
                  </span>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {/* DISCOVER PLACES */}
        <Section className="border-y border-gray-100 bg-gray-50 py-16 lg:py-20">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-400">
                  Discover around {destination.name}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-4xl">
                  Places worth exploring
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                  Find attractions, food, cafes and experiences around the
                  destination.
                </p>
              </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {NEARBY_CATEGORIES.map((category) => {
                const isActive = nearbyType === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleNearbyCategoryChange(category.id)}
                    disabled={isNearbyLoading}
                    className={`
                      whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition
                      ${
                        isActive
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-950"
                      }
                      ${isNearbyLoading ? "cursor-wait opacity-50" : ""}
                    `}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* PLACE CARDS */}
            {isNearbyLoading ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[330px] animate-pulse rounded-[24px] bg-gray-200"
                  />
                ))}
              </div>
            ) : nearbyPlaces.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {nearbyPlaces.slice(0, 8).map((place) => {
                  const photoName = place.photos?.[0]?.name;
                  const isSelected = selectedPlace?.id === place.id;

                  return (
                    <article
                      key={place.id}
                      onClick={() => handlePlaceClick(place)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handlePlaceClick(place);
                        }
                      }}
                      className={`group cursor-pointer overflow-hidden rounded-[24px] border bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                        isSelected ? "border-gray-950" : "border-gray-200"
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {photoName ? (
                          <PlacePhoto
                            photoName={photoName}
                            alt={place.displayName?.text ?? "Place"}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image available
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                          <span className="text-xs font-medium text-white">
                            View details →
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                          {place.primaryType?.replaceAll("_", " ") ?? "Place"}
                        </p>

                        <h3 className="mt-2 line-clamp-1 text-base font-semibold tracking-[-0.02em] text-gray-950">
                          {place.displayName?.text ?? "Unnamed place"}
                        </h3>

                        {place.formattedAddress && (
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                            {place.formattedAddress}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-[24px] border border-gray-200 bg-white p-12 text-center">
                <p className="text-sm text-gray-500">
                  No places were found nearby.
                </p>
              </div>
            )}
          </Container>
        </Section>

        {/* ASK ELIXWAY */}
        <Section className="py-20 lg:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-[32px] bg-black px-7 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
              <div className="relative max-w-3xl">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                  Your trip, your way
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  Plan {destination.name} with Elixway.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  Tell Elixway what kind of trip you want, and let your travel
                  assistant help you turn this destination into a plan.
                </p>

                <Link
                  to="/ai"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-gray-100"
                >
                  Ask Elixway AI
                  <span>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* =======================================================
          PLACE DETAILS — RIGHT-SIDE DRAWER
          Always mounted while selectedPlace exists so the slide-out
          transition can play before the content unmounts.
      ======================================================= */}

      {selectedPlace && (
        <div className="fixed inset-0 z-[200]" aria-hidden={!isDrawerOpen}>
          {/* BACKDROP — click to close, fades in/out with the drawer */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}
            onMouseDown={closePlaceDetails}
          />

          {/* DRAWER PANEL */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPlaceName}
            className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-[-30px_0_80px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={closePlaceDetails}
              aria-label="Close place details"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-lg text-white backdrop-blur transition hover:bg-black"
            >
              ×
            </button>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto">
              {/* PHOTO */}
              <div className="relative h-[240px] flex-shrink-0 bg-gray-100 sm:h-[280px]">
                {selectedPlacePhoto ? (
                  <PlacePhoto
                    photoName={selectedPlacePhoto}
                    alt={selectedPlaceName}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    No image available
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 left-5 right-16">
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">
                    {selectedPlace.primaryType?.replaceAll("_", " ") ?? "Place"}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {selectedPlaceName}
                  </h2>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-6 sm:p-8">
                {isPlaceDetailsLoading ? (
                  <div className="space-y-5">
                    <div className="h-6 w-40 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />

                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                      <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                    </div>
                  </div>
                ) : placeDetailsError ? (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">{placeDetailsError}</p>

                    <button
                      type="button"
                      onClick={() => handlePlaceClick(selectedPlace)}
                      className="mt-4 text-sm font-medium text-gray-950 underline underline-offset-4"
                    >
                      Try again
                    </button>
                  </div>
                ) : selectedPlaceDetails ? (
                  <>
                    {/* RATING + ADDRESS */}
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                          About this place
                        </p>

                        {selectedPlaceDetails.formattedAddress && (
                          <p className="mt-3 text-sm leading-6 text-gray-500">
                            {selectedPlaceDetails.formattedAddress}
                          </p>
                        )}
                      </div>

                      {selectedPlaceRating !== null && (
                        <div className="flex w-fit flex-shrink-0 items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
                          <span className="text-lg">★</span>

                          <div>
                            <p className="text-sm font-semibold text-gray-950">
                              {selectedPlaceRating}
                            </p>

                            {selectedPlaceReviewCount !== null && (
                              <p className="text-[10px] text-gray-400">
                                {selectedPlaceReviewCount} ratings
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* QUICK INFO */}
                    <div className="mt-7 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-gray-400">
                          Location
                        </p>

                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {destination.name}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-gray-400">
                          Category
                        </p>

                        <p className="mt-2 line-clamp-1 text-sm font-medium capitalize text-gray-900">
                          {selectedPlace.primaryType?.replaceAll("_", " ") ??
                            "Place"}
                        </p>
                      </div>
                    </div>

                    {/* WEBSITE */}
                    {selectedPlaceDetails.websiteUri && (
                      <a
                        href={selectedPlaceDetails.websiteUri}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-950 underline underline-offset-4"
                      >
                        Visit official website
                        <span>↗</span>
                      </a>
                    )}

                    {/* ELIXWAY AI */}
                    <div className="mt-8 overflow-hidden rounded-[24px] bg-black p-5 text-white sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm text-black">
                          ✦
                        </div>

                        <div>
                          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                            Elixway AI
                          </p>

                          <h3 className="mt-2 text-lg font-medium tracking-[-0.02em]">
                            Want to know more about this place?
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-white/55">
                            Ask Elixway why you should visit, what to see
                            nearby, the best time to go, or whether it fits
                            your trip.
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/ai"
                        className="mt-5 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-black transition hover:bg-gray-100"
                      >
                        <span>Ask Elixway about this place</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DestinationDetails;