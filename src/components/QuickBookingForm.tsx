import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import FlightSearchPanel from "./FlightSearchPanel";

import FlightResults from "../pages/Flights/FlightResults";
import axiosClient from "../api/axiosClient";


import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeftRight,
  Car,
  Plane,
  ShieldCheck,
  Tag,
  Headphones,
  ThumbsUp,
} from "lucide-react";

import toast from "react-hot-toast";

import backgroundImage from "/image/back.png";

interface BookingState {
  quotes: any;
  pickup: string;
  drop: string;
  tripType: "oneway" | "roundtrip";
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
}

/* =========================================================
   DATE HELPERS
========================================================= */

const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = Math.ceil(date.getMinutes() / 5) * 5;

  if (minutes >= 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function QuickBookingForm() {
  const navigate = useNavigate();

  /* =======================================================
     MAIN SERVICE
     Flights /  / Cabs
  ======================================================= */

  const [serviceTab, setServiceTab] = useState<
    "flights" | "hotels" | "cabs"
  >("cabs");

  /* =======================================================
     SEARCH CALLBACKS
  ======================================================= */

 
  const [flightResults, setFlightResults] = useState<any[]>([]);

  const handleFlightSearch = async (data: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    passengers: number;
    tripType: "oneway" | "roundtrip";
  }) => {
    try {
      const response = await axiosClient.post("/flights/search", {
        origin: data.from,
        destination: data.to,
        departureDate: data.departureDate,
        returnDate:
          data.tripType === "roundtrip" ? data.returnDate : null,
        passengers: data.passengers,
        cabinClass: "economy",
        tripType: data.tripType,
        currency: "INR",
      });

      setFlightResults(response.data?.flights ?? []);
    } catch (error) {
      console.error("Flight search failed:", error);
      toast.error("Unable to search flights. Please try again.");
    }
  };



  

  /* =======================================================
     BOOKING TYPE
  ======================================================= */

  const [activeTab, setActiveTab] = useState<
    "outstation" | "airport"
  >("outstation");

  const [tripType, setTripType] = useState<
    "oneway" | "roundtrip"
  >("oneway");

  /* =======================================================
     LOCATIONS
  ======================================================= */

  const [outstationPickup, setOutstationPickup] = useState("");
  const [outstationDrop, setOutstationDrop] = useState("");

  const [airportPickup, setAirportPickup] = useState("");
  const [airportDrop, setAirportDrop] = useState("");

  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);

  const [dropLat, setDropLat] = useState<number | null>(null);
  const [dropLng, setDropLng] = useState<number | null>(null);

  /* =======================================================
     DATE / TIME
  ======================================================= */

  const [pickupDate, setPickupDate] = useState(getTodayDate);
  const [pickupTime, setPickupTime] = useState(getCurrentTime);

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        setPickupLat(latitude);
        setPickupLng(longitude);

        const googleMaps = (window as any).google?.maps;

        if (!googleMaps?.Geocoder) {
          return;
        }

        const geocoder = new googleMaps.Geocoder();

        geocoder.geocode(
          {
            location: {
              lat: latitude,
              lng: longitude,
            },
          },
          (results: any[], status: string) => {
            if (status !== "OK" || !results?.length) {
              return;
            }

            const address = results[0].formatted_address;

            setOutstationPickup(address);
            setAirportPickup(address);
          }
        );
      },
      () => {
        // User denied location.
        // Manual autocomplete remains available.
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 300000,
      }
    );
  }, []);

  /* =======================================================
     TAB CHANGE
  ======================================================= */

  const handleTabChange = (
    tab: "outstation" | "airport"
  ) => {
    setActiveTab(tab);

    setPickupLat(null);
    setPickupLng(null);
    setDropLat(null);
    setDropLng(null);
  };

  /* =======================================================
     CURRENT VALUES
  ======================================================= */

  const getCurrentPickup = () =>
    activeTab === "outstation"
      ? outstationPickup
      : airportPickup;

  const getCurrentDrop = () =>
    activeTab === "outstation"
      ? outstationDrop
      : airportDrop;

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = (): boolean => {
    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();

    const today = getTodayDate();

    if (!pickup.trim() || !drop.trim()) {
      toast.error("Please enter both pickup and drop locations");
      return false;
    }

    if (!pickupDate || pickupDate < today) {
      toast.error("Please select a valid pickup date");
      return false;
    }

    if (!pickupTime) {
      toast.error("Please select pickup time");
      return false;
    }

    if (activeTab === "outstation" && tripType === "roundtrip") {
      if (!returnDate || returnDate <= pickupDate) {
        toast.error("Please select a valid return date");
        return false;
      }

      if (!returnTime) {
        toast.error("Please select return time");
        return false;
      }
    }

    return true;
  };

  /* =======================================================
     SEARCH / API LOGIC
     EXISTING LOGIC PRESERVED
  ======================================================= */

  const handleSearchRide = async () => {
    if (!validateForm()) {
      return;
    }

    const pickup = getCurrentPickup();
    const drop = getCurrentDrop();

    if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
      toast.error(
        "Please select locations from Google suggestions for accurate distance."
      );
      return;
    }

    setIsLoading(true);

    try {
      /* ===================================================
         AIRPORT
      =================================================== */

      if (activeTab === "airport") {
        const res = await axiosClient.post("/quotes", {
          pickup,
          dropoff: drop,
          tripType: "airport",
          pickupLat,
          pickupLng,
          dropLat,
          dropLng,
        });

        const distanceKm = res.data?.[0]?.distanceKm || 0;

        navigate("/airport-vehicles", {
          state: {
            pickup,
            drop,
            pickupDate,
            pickupTime,
            distanceKm,
          },
        });

        return;
      }

      /* ===================================================
         OUTSTATION
      =================================================== */

      const res = await axiosClient.post("/quotes", {
        pickup,
        dropoff: drop,
        tripType,
        pickupLat,
        pickupLng,
        dropLat,
        dropLng,
      });

      const bookingState: BookingState = {
        quotes: res.data,
        pickup,
        drop,
        tripType,
        pickupDate,
        pickupTime,
      };

      if (tripType === "roundtrip") {
        bookingState.returnDate = returnDate;
        bookingState.returnTime = returnTime;
      }

      navigate("/vehicles", {
        state: bookingState,
      });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Unable to fetch vehicles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-white">
      {/* =================================================
          HERO / BACKGROUND
      ================================================= */}

      <div
        className="
          relative
          h-[470px]
          min-h-[470px]
          w-full
          overflow-hidden
          sm:h-[470px]
        "
      >
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/10
          "
        />
      </div>

      {/* =================================================
          BOOKING AREA
      ================================================= */}

      <div
        className="
          relative
          z-30
          mx-auto
          w-full
          max-w-[1240px]
          px-3
          sm:px-6
          lg:px-8
          pb-8
          -mt-[65px]
          sm:-mt-[105px]
          lg:-mt-[380px]
        "
      >
        {/* =================================================
            SERVICE CATEGORY SELECTOR
            Separate from the booking card — its own row.
            Flat icon + label, no pill / shadow
        ================================================= */}

       <div className="relative z-30 mb-4 flex items-start gap-4 px-1 sm:gap-5">
  {/* FLIGHTS */}
  <button
    type="button"
    onClick={() => setServiceTab("flights")}
    className="group flex flex-col items-center gap-2 outline-none"
  >
    <span
      className={`
        flex h-[66px] w-[66px] items-center justify-center rounded-[18px]
        border transition-all duration-300 ease-out
        ${
          serviceTab === "flights"
            ? "border-orange-500 bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.28)]"
            : "border-white/70 bg-white/95 text-[#475467] shadow-[0_6px_18px_rgba(15,23,42,0.10)] backdrop-blur-sm group-hover:-translate-y-0.5 group-hover:border-[#d0d5dd] group-hover:text-[#101828]"
        }
      `}
    >
      <Plane size={21} strokeWidth={1.8} />
    </span>

    <span
      className={`
        text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200
        ${
          serviceTab === "flights"
            ? "text-[#101828]"
            : "text-[#667085] group-hover:text-[#344054]"
        }
      `}
    >
      Flights
    </span>
  </button>

  {/* CABS */}
  <button
    type="button"
    onClick={() => setServiceTab("cabs")}
    className="group flex flex-col items-center gap-2 outline-none"
  >
    <span
      className={`
        flex h-[66px] w-[66px] items-center justify-center rounded-[18px]
        border transition-all duration-300 ease-out
        ${
          serviceTab === "cabs"
            ? "border-orange-500 bg-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.28)]"
            : "border-white/70 bg-white/95 text-[#475467] shadow-[0_6px_18px_rgba(15,23,42,0.10)] backdrop-blur-sm group-hover:-translate-y-0.5 group-hover:border-[#d0d5dd] group-hover:text-[#101828]"
        }
      `}
    >
      <Car size={21} strokeWidth={1.8} />
    </span>

    <span
      className={`
        text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200
        ${
          serviceTab === "cabs"
            ? "text-[#101828]"
            : "text-[#667085] group-hover:text-[#344054]"
        }
      `}
    >
      Cabs
    </span>
  </button>


          {/* =================================================
              HOTELS — TEMPORARILY DISABLED
              Logic is preserved above.
          ================================================= */}

          {/*
          <button
            type="button"
            onClick={() => setServiceTab("hotels")}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={`
                flex h-11 w-11 items-center justify-center rounded-xl
                transition-colors duration-150
                ${
                  serviceTab === "hotels"
                    ? "bg-orange-500 text-white"
                    : "border border-[#e4e7ec] bg-white text-[#667085] hover:border-[#98a2b3] hover:text-[#344054]"
                }
              `}
            >
              <Building2 size={19} strokeWidth={1.8} />
            </span>
            <span className="text-[13px] font-medium text-[#667085]">
              Hotels
            </span>
          </button>
          */}
        </div>

        {/* =================================================
            MAIN BOOKING CARD
        ================================================= */}

        <div
          className="
            relative
            z-20
            w-full
            rounded-[20px]
            border
            border-[#e4e7ec]
            bg-white
            p-5
            shadow-[0_18px_50px_rgba(15,23,42,0.10)]
            sm:p-6
            lg:p-7
          "
        >
          {/* FLIGHTS */}

          {serviceTab === "flights" && (
            <>
              <FlightSearchPanel onSearch={handleFlightSearch} />

              {flightResults.length > 0 && (
                <FlightResults flights={flightResults} />
              )}
            </>
          )}

          {/* =================================================
              HOTELS — TEMPORARILY DISABLED
              Search and result logic is intentionally preserved.
          ================================================= */}

          {/*
          {serviceTab === "hotels" && (
            <>
              <HotelSearchPanel />
              {hotelResults.length > 0 && (
                <HotelResults hotels={hotelResults} />
              )}
            </>
          )}
          */}

          {/* =================================================
              CABS
              EXISTING LOGIC PRESERVED
          ================================================= */}

          {serviceTab === "cabs" && (
            <>
              {/* TRIP TYPE ROW — flat text, no boxes, like "One-way ⌄" */}

              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("outstation");
                    setTripType("oneway");
                  }}
                  className={`text-[13.5px] font-semibold transition-colors ${
                    activeTab === "outstation"
                      ? "text-[#101828]"
                      : "text-[#98a2b3] hover:text-[#475467]"
                  }`}
                >
                  Outstation
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange("airport")}
                  className={`text-[13.5px] font-semibold transition-colors ${
                    activeTab === "airport"
                      ? "text-[#101828]"
                      : "text-[#98a2b3] hover:text-[#475467]"
                  }`}
                >
                  Airport
                </button>

                {activeTab === "outstation" && (
                  <>
                    <span className="hidden h-4 w-px bg-[#e4e7ec] sm:block" />

                    <button
                      type="button"
                      onClick={() => setTripType("oneway")}
                      className={`text-[13.5px] font-medium transition-colors ${
                        tripType === "oneway"
                          ? "text-[#101828]"
                          : "text-[#98a2b3] hover:text-[#475467]"
                      }`}
                    >
                      One Way
                    </button>

                    <button
                      type="button"
                      onClick={() => setTripType("roundtrip")}
                      className={`text-[13.5px] font-medium transition-colors ${
                        tripType === "roundtrip"
                          ? "text-[#101828]"
                          : "text-[#98a2b3] hover:text-[#475467]"
                      }`}
                    >
                      Round Trip
                    </button>
                  </>
                )}

                <div className="ml-auto hidden items-center gap-1.5 text-[13px] text-[#475467] sm:flex">
                  <ThumbsUp
                    size={15}
                    strokeWidth={1.8}
                    className="text-[#16a34a]"
                  />
                  Hassle-Free Bookings
                </div>
              </div>

              {/* TRUST ROW — flat text, no pill backgrounds */}

              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12.5px] font-medium text-[#667085]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} strokeWidth={2} />
                  Free Cancellation
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Tag size={13} strokeWidth={2} />
                  Transparent Fares
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Headphones size={13} strokeWidth={2} />
                  24/7 Support
                </span>
              </div>

              {/* MAIN CAB SEARCH BAR — white, thin dividers, no gray fill */}

              <div className="relative w-full rounded-2xl border border-[#e4e7ec] bg-white lg:pr-[150px]">
                <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
                  {/* FROM */}

                  <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-3.5 lg:py-4">
                    <label className="text-[11px] font-medium text-[#98a2b3]">
                      From
                    </label>

                    <div className="mt-0.5 flex min-w-0 items-center gap-2">
                      <MapPin
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#475467]"
                      />

                      <div className="min-w-0 flex-1">
                        <AddressAutocomplete
                          showCurrentLocation={false}
                          placeholder="Current location"
                          value={
                            activeTab === "outstation"
                              ? outstationPickup
                              : airportPickup
                          }
                          onChange={
                            activeTab === "outstation"
                              ? setOutstationPickup
                              : setAirportPickup
                          }
                          onSelect={(
                            address: string,
                            lat: number,
                            lng: number
                          ) => {
                            if (activeTab === "outstation") {
                              setOutstationPickup(address);
                            } else {
                              setAirportPickup(address);
                            }

                            setPickupLat(lat);
                            setPickupLng(lng);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TO */}

                  <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
                    <label className="text-[11px] font-medium text-[#98a2b3]">
                      To
                    </label>

                    <div className="mt-0.5 flex min-w-0 items-center gap-2">
                      <MapPin
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#475467]"
                      />

                      <div className="min-w-0 flex-1">
                        <AddressAutocomplete
                          showCurrentLocation={false}
                          placeholder="Where are you going?"
                          value={
                            activeTab === "outstation"
                              ? outstationDrop
                              : airportDrop
                          }
                          onChange={
                            activeTab === "outstation"
                              ? setOutstationDrop
                              : setAirportDrop
                          }
                          onSelect={(
                            address: string,
                            lat: number,
                            lng: number
                          ) => {
                            if (activeTab === "outstation") {
                              setOutstationDrop(address);
                            } else {
                              setAirportDrop(address);
                            }

                            setDropLat(lat);
                            setDropLng(lng);
                          }}
                        />
                      </div>
                    </div>

                    {/* SWAP */}

                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "outstation") {
                          const oldPickup = outstationPickup;

                          setOutstationPickup(outstationDrop);
                          setOutstationDrop(oldPickup);
                        } else {
                          const oldPickup = airportPickup;

                          setAirportPickup(airportDrop);
                          setAirportDrop(oldPickup);
                        }

                        const oldLat = pickupLat;
                        const oldLng = pickupLng;

                        setPickupLat(dropLat);
                        setPickupLng(dropLng);

                        setDropLat(oldLat);
                        setDropLng(oldLng);
                      }}
                      className="absolute -left-4 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7ec] bg-white text-[#475467] transition-all duration-200 hover:border-[#98a2b3] hover:text-[#101828] lg:flex"
                      aria-label="Swap locations"
                    >
                      <ArrowLeftRight size={14} strokeWidth={2} />
                    </button>
                  </div>

                  {/* DATE */}

                  <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
                    <label className="text-[11px] font-medium text-[#98a2b3]">
                      Date
                    </label>

                    <div className="mt-0.5 flex items-center gap-2">
                      <Calendar
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#475467]"
                      />

                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={getTodayDate()}
                        className="h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* TIME */}

                  <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
                    <label className="text-[11px] font-medium text-[#98a2b3]">
                      Time
                    </label>

                    <div className="mt-0.5 flex items-center gap-2">
                      <Clock
                        size={17}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#475467]"
                      />

                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                {/* SEARCH — solid orange, rounded-xl (not pill) like reference */}

                <button
                  type="button"
                  onClick={handleSearchRide}
                  disabled={isLoading}
                  className="group mt-3 flex h-[52px] w-full items-center justify-center gap-1.5 rounded-b-2xl rounded-t-none bg-orange-500 px-8 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 lg:absolute lg:right-2 lg:top-1/2 lg:mt-0 lg:w-auto lg:-translate-y-1/2 lg:rounded-xl"
                >
                  {isLoading ? "Searching..." : "Explore Cabs"}

                  {!isLoading && (
                    <ArrowRight
                      size={18}
                      strokeWidth={2.1}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  )}
                </button>
              </div>

              {/* ROUND TRIP RETURN FIELDS — white, matches main bar */}

              {activeTab === "outstation" && tripType === "roundtrip" && (
                <div className="mt-3 w-full rounded-2xl border border-[#e4e7ec] bg-white">
                  <div className="flex w-full flex-col sm:flex-row">
                    {/* RETURN DATE */}

                    <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-3.5 sm:border-r sm:border-[#e4e7ec] sm:py-4">
                      <label className="text-[11px] font-medium text-[#98a2b3]">
                        Return Date
                      </label>

                      <div className="mt-0.5 flex items-center gap-2">
                        <Calendar
                          size={17}
                          strokeWidth={1.8}
                          className="shrink-0 text-[#475467]"
                        />

                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={pickupDate || getTodayDate()}
                          className="h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none focus:ring-0"
                        />
                      </div>
                    </div>

                    {/* RETURN TIME */}

                    <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e4e7ec] px-5 py-3.5 sm:border-t-0 sm:py-4">
                      <label className="text-[11px] font-medium text-[#98a2b3]">
                        Return Time
                      </label>

                      <div className="mt-0.5 flex items-center gap-2">
                        <Clock
                          size={17}
                          strokeWidth={1.8}
                          className="shrink-0 text-[#475467]"
                        />

                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="h-[25px] w-full border-0 bg-transparent p-0 text-[15px] font-semibold text-[#101828] outline-none focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}