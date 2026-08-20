import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressAutocomplete from "./AddressAutocomplete";
import FlightSearchPanel from "./FlightSearchPanel";
import HotelSearchPanel from "./HotelSearchPanel";
import FlightResults from "../pages/Flights/FlightResults";
import axiosClient from "../api/axiosClient";
import HotelResults from "../pages/Hotels/HotelResults";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeftRight,
  Car,
  Plane,
  Building2,
  ShieldCheck,
  Tag,
  Headphones,
  ThumbsUp
} from "lucide-react";

import toast from "react-hot-toast";

import backgroundImage from "/image/elixx.png";

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

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const date = new Date();

  let hours = date.getHours();

  let minutes =
    Math.ceil(date.getMinutes() / 5) * 5;

  if (minutes >= 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}`;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function QuickBookingForm() {
  const navigate = useNavigate();

  /* =======================================================
     MAIN SERVICE

     Flights / Hotels / Cabs
  ======================================================= */

  const [serviceTab, setServiceTab] =
    useState<"flights" | "hotels" | "cabs">("cabs");

  /* =======================================================
     SEARCH CALLBACKS

     Keep these thin so FlightSearchPanel and
     HotelSearchPanel remain responsible for their own UI.

     API integration can be connected here later.
  ======================================================= */
const [hotelResults, setHotelResults] =
  useState<any[]>([]);
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
    const response = await axiosClient.post(
      "/flights/search",
      {
        origin: data.from,
        destination: data.to,
        departureDate: data.departureDate,
        returnDate:
          data.tripType === "roundtrip"
            ? data.returnDate
            : null,
        passengers: data.passengers,
        cabinClass: "economy",
        tripType: data.tripType,
        currency: "INR",
      }
    );

    setFlightResults(
      response.data?.flights ?? []
    );

  } catch (error) {
    console.error(
      "Flight search failed:",
      error
    );

    toast.error(
      "Unable to search flights. Please try again."
    );
  }
};
  const handleHotelSearch = async (data: {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
}) => {
  try {
    const response = await axiosClient.post(
      "/hotels/search",
      {
        destination: data.destination,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        adults: data.adults,
        rooms: data.rooms,
        currency: "INR",
      }
    );

    console.log(
      "Hotel results:",
      response.data
    );

    setHotelResults(
      response.data?.hotels ?? []
    );

  } catch (error) {
    console.error(
      "Hotel search failed:",
      error
    );

    toast.error(
      "Unable to search hotels. Please try again."
    );
  }
};

  /* =======================================================
     BOOKING TYPE
  ======================================================= */

  const [activeTab, setActiveTab] =
    useState<"outstation" | "airport">(
      "outstation"
    );

  const [tripType, setTripType] =
    useState<"oneway" | "roundtrip">(
      "oneway"
    );

  /* =======================================================
     LOCATIONS
  ======================================================= */

  const [
    outstationPickup,
    setOutstationPickup,
  ] = useState("");

  const [
    outstationDrop,
    setOutstationDrop,
  ] = useState("");

  const [
    airportPickup,
    setAirportPickup,
  ] = useState("");

  const [
    airportDrop,
    setAirportDrop,
  ] = useState("");

  const [pickupLat, setPickupLat] =
    useState<number | null>(null);

  const [pickupLng, setPickupLng] =
    useState<number | null>(null);

  const [dropLat, setDropLat] =
    useState<number | null>(null);

  const [dropLng, setDropLng] =
    useState<number | null>(null);

  /* =======================================================
     DATE / TIME
  ======================================================= */

  const [pickupDate, setPickupDate] =
    useState(getTodayDate);

  const [pickupTime, setPickupTime] =
    useState(getCurrentTime);

  const [returnDate, setReturnDate] =
    useState("");

  const [returnTime, setReturnTime] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const {
          latitude,
          longitude,
        } = coords;

        setPickupLat(latitude);
        setPickupLng(longitude);

        const googleMaps =
          (window as any).google?.maps;

        if (!googleMaps?.Geocoder) {
          return;
        }

        const geocoder =
          new googleMaps.Geocoder();

        geocoder.geocode(
          {
            location: {
              lat: latitude,
              lng: longitude,
            },
          },
          (
            results: any[],
            status: string
          ) => {
            if (
              status !== "OK" ||
              !results?.length
            ) {
              return;
            }

            const address =
              results[0].formatted_address;

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
      toast.error(
        "Please enter both pickup and drop locations"
      );

      return false;
    }

    if (
      !pickupDate ||
      pickupDate < today
    ) {
      toast.error(
        "Please select a valid pickup date"
      );

      return false;
    }

    if (!pickupTime) {
      toast.error(
        "Please select pickup time"
      );

      return false;
    }

    if (
      activeTab === "outstation" &&
      tripType === "roundtrip"
    ) {
      if (
        !returnDate ||
        returnDate <= pickupDate
      ) {
        toast.error(
          "Please select a valid return date"
        );

        return false;
      }

      if (!returnTime) {
        toast.error(
          "Please select return time"
        );

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

    if (
      !pickupLat ||
      !pickupLng ||
      !dropLat ||
      !dropLng
    ) {
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
        const res =
          await axiosClient.post(
            "/quotes",
            {
              pickup,
              dropoff: drop,
              tripType: "airport",
              pickupLat,
              pickupLng,
              dropLat,
              dropLng,
            }
          );

        const distanceKm =
          res.data?.[0]?.distanceKm || 0;

        navigate(
          "/airport-vehicles",
          {
            state: {
              pickup,
              drop,
              pickupDate,
              pickupTime,
              distanceKm,
            },
          }
        );

        return;
      }

      /* ===================================================
         OUTSTATION
      =================================================== */

      const res =
        await axiosClient.post(
          "/quotes",
          {
            pickup,
            dropoff: drop,
            tripType,
            pickupLat,
            pickupLng,
            dropLat,
            dropLng,
          }
        );

      const bookingState: BookingState = {
        quotes: res.data,
        pickup,
        drop,
        tripType,
        pickupDate,
        pickupTime,
      };

      if (
        tripType === "roundtrip"
      ) {
        bookingState.returnDate =
          returnDate;

        bookingState.returnTime =
          returnTime;
      }

      navigate(
        "/vehicles",
        {
          state: bookingState,
        }
      );
    } catch (error) {
      console.error(
        "Error fetching vehicles:",
        error
      );

      toast.error(
        "Unable to fetch vehicles. Please try again."
      );
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
      {/* Background image */}

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

      {/* Professional subtle overlay */}

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

      {/* =================================================
          OPTIONAL HERO CONTENT
          Keep minimal — no giant headline
      ================================================= */}

      <div
  className="
    relative
    z-10
    mx-auto
    flex
    h-full
    w-full
    max-w-[1280px]
    items-center
    px-5
pb-24
sm:px-8
sm:pb-28
lg:px-10
lg:pb-28
lg:ml-35
  "
>
  <div className="max-w-[560px]">

    <p
      className="
        mb-3
        text-[13px]
        font-medium
        tracking-[0.08em]
        text-white/90
        drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]
        sm:text-[14px]
      "
    >
      Simple. Seamless. Travel.
    </p>

    <h1
      className="
        
        font-semibold
        leading-[1.08]
        tracking-[-0.035em]
        text-white
        drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
       text-[32px]
sm:text-[46px]
lg:text-[56px]
      "
    >
      Your journey starts here.
    </h1>

    <p
      className="
        mt-4
        max-w-[440px]
        text-[15px]
        leading-6
        text-white/90
        drop-shadow-[0_1px_5px_rgba(0,0,0,0.22)]
        sm:text-[16px]
      "
    >
      Flights, hotels and cabs — all in one place.
    </p>

  </div>
</div>
    </div>


    {/* =================================================
        BOOKING AREA
        OVERLAPS THE HERO
    ================================================= */}

    <div
      className="
        relative
        z-30
        mx-auto
        -mt-[65px]
w-full
max-w-[1240px]
px-3
sm:-mt-[105px]
sm:px-6
lg:-mt-[123px]
lg:px-8
      "
    >

      {/* =================================================
          SERVICE TABS
          FLOATING ABOVE CARD
      ================================================= */}

      <div
        className="
          flex
          items-end
          gap-2
          px-1
          overflow-x-auto
          pb-0
          scrollbar-hide
        "
      >

        {/* FLIGHTS */}

        <button
          type="button"
          onClick={() =>
            setServiceTab("flights")
          }
          className={`
            flex
            h-[45px]
            min-w-[112px]
            items-center
            justify-center
            gap-2.5
            mb-3
            rounded-t-[16px]
            px-6
            text-[14px]
            font-semibold
            transition-all
            duration-200
            sm:min-w-[145px]

            ${
              serviceTab === "flights"
                ? `
                  bg-white
                  text-[#475467]
                  shadow-[0_-3px_15px_rgba(15,23,42,0.06)]
                `
                : `
                  bg-white/90
                  text-[#667085]
                  hover:bg-white
                  hover:text-[#172033]
                `
            }
          `}
        >
          <Plane
            size={18}
            strokeWidth={1.8}
          />

          Flights
        </button>


        {/* HOTELS */}

        <button
          type="button"
          onClick={() =>
            setServiceTab("hotels")
          }
          className={`
            flex
            h-[45px]
            min-w-[112px]
            items-center
            justify-center
            gap-2.5
            rounded-t-[16px]
            px-6
            mb-3
            text-[14px]
            font-semibold
            transition-all
            duration-200
            sm:min-w-[145px]

            ${
              serviceTab === "hotels"
                ? `
                  bg-white
                  text-[#475467]
                  shadow-[0_-3px_15px_rgba(15,23,42,0.06)]
                `
                : `
                  bg-white/90
                  text-[#667085]
                  hover:bg-white
                  hover:text-[#172033]
                `
            }
          `}
        >
          <Building2
            size={18}
            strokeWidth={1.8}
          />

          Hotels
        </button>


        {/* CABS */}

        <button
          type="button"
          onClick={() =>
            setServiceTab("cabs")
          }
          className={`
            flex
            h-[45px]
            min-w-[112px]
            items-center
            justify-center
            gap-2.5
            rounded-t-[16px]
            mb-3
            px-6
            text-[14px]
            font-semibold
            transition-all
            duration-200
            sm:min-w-[145px]

            ${
              serviceTab === "cabs"
                ? `
                  bg-white
                  text-[#475467]
                  shadow-[0_-3px_15px_rgba(15,23,42,0.06)]
                `
                : `
                  bg-white/90
                  text-[#667085]
                  hover:bg-white
                  hover:text-[#172033]
                `
            }
          `}
        >
          <Car
            size={18}
            strokeWidth={1.8}
          />

          Cabs
        </button>

      </div>


      {/* =================================================
          MAIN BOOKING CARD
      ================================================= */}

      <div
  className="
    rounded-b-[20px]
    rounded-t-[20px]
    border
    border-white
    bg-white
    p-4
    shadow-[0_18px_50px_rgba(15,23,42,0.12)]
    sm:p-4
    lg:p-4
  "
>
  <div className="flex items-center justify-end">
    <span
      className="
        text-[15px]
        font-medium
        tracking-[-0.01em]
        text-[#667085]
      "
    >
      Book International and Domestic Flights
    </span>
  </div>

  {/* =================================================
      FLIGHTS
  ================================================= */}

  {serviceTab === "flights" && (
    <>
      <FlightSearchPanel
        onSearch={handleFlightSearch}
      />

      {flightResults.length > 0 && (
        <FlightResults
          flights={flightResults}
        />
      )}
    </>
  )}



{serviceTab === "hotels" && (
  <>
    <HotelSearchPanel
      onSearch={handleHotelSearch}
    />

    {hotelResults.length > 0 && (
      <HotelResults
        hotels={hotelResults}
      />
    )}
  </>
)}
        {/* =================================================
            CABS
            Same visual system as Flights / Hotels
            Logic preserved
        ================================================= */}

        {serviceTab === "cabs" && (
          <>
            {/* CAB TYPE + TRIP TYPE */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("outstation");
                  setTripType("oneway");
                }}
                className={`
                  rounded-full
                  px-5
                  py-1.5
                  text-[13px]
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    activeTab === "outstation"
                      ? "border-2 border-[#475467] bg-[#f5f6f8] text-[#344054]"
                      : "border border-[#d0d5dd] text-[#344054] hover:border-[#98a2b3]"
                  }
                `}
              >
                Outstation
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("airport")}
                className={`
                  rounded-full
                  px-5
                  py-1.5
                  text-[13px]
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    activeTab === "airport"
                      ? "border-2 border-[#475467] bg-[#f5f6f8] text-[#344054]"
                      : "border border-[#d0d5dd] text-[#344054] hover:border-[#98a2b3]"
                  }
                `}
              >
                Airport
              </button>

              {activeTab === "outstation" && (
                <>
                  <span className="mx-1 hidden h-5 w-px bg-[#e4e7ec] sm:block" />

                  <button
                    type="button"
                    onClick={() => setTripType("oneway")}
                    className={`
                      text-[13px]
                      font-medium
                      transition-colors
                      ${
                        tripType === "oneway"
                          ? "text-[#172033]"
                          : "text-[#98a2b3] hover:text-[#475467]"
                      }
                    `}
                  >
                    One Way
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripType("roundtrip")}
                    className={`
                      text-[13px]
                      font-medium
                      transition-colors
                      ${
                        tripType === "roundtrip"
                          ? "text-[#172033]"
                          : "text-[#98a2b3] hover:text-[#475467]"
                      }
                    `}
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

            {/* TRUST BADGES */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f6f8] px-3 py-1.5 text-[12.5px] font-medium text-[#475467]">
                <ShieldCheck size={13} strokeWidth={2} />
                Free Cancellation
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f6f8] px-3 py-1.5 text-[12.5px] font-medium text-[#475467]">
                <Tag size={13} strokeWidth={2} />
                Transparent Fares
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f6f8] px-3 py-1.5 text-[12.5px] font-medium text-[#475467]">
                <Headphones size={13} strokeWidth={2} />
                24/7 Support
              </span>
            </div>

            {/* MAIN CAB SEARCH BAR */}
            <div className="relative w-full rounded-[16px] bg-[#f5f6f8] lg:pr-[150px]">
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
                <div className="relative flex min-w-0 flex-1 flex-col justify-center border-t border-[#e6e8eb] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
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
                    className="absolute -left-4 top-1/2 z-20 hidden h-15 w-15 -translate-y-1/2 items-center justify-center  text-[#475467]  transition-all duration-200 hover:text-[#101828] lg:flex"
                    aria-label="Swap locations"
                  >
                    <ArrowLeftRight size={15} strokeWidth={2} />
                  </button>
                </div>

                {/* DATE */}
                <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e6e8eb] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
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
                <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e6e8eb] px-5 py-3.5 lg:border-t-0 lg:border-l lg:py-4">
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

              {/* SEARCH */}
              <button
                type="button"
                onClick={handleSearchRide}
                disabled={isLoading}
                className="group mt-3 flex h-[52px] w-full items-center justify-center gap-1.5 rounded-full bg-[#101828] px-8 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(16,24,40,0.18)] transition-all duration-200 hover:bg-black hover:shadow-[0_10px_24px_rgba(16,24,40,0.22)] disabled:cursor-not-allowed disabled:opacity-60 lg:absolute lg:right-2 lg:top-1/2 lg:mt-0 lg:w-auto lg:-translate-y-1/2"
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

            {/* ROUND TRIP RETURN FIELDS */}
            {activeTab === "outstation" && tripType === "roundtrip" && (
              <div className="mt-3 w-full rounded-[16px] bg-[#f5f6f8]">
                <div className="flex w-full flex-col sm:flex-row">

                  {/* RETURN DATE */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-3.5 sm:border-r sm:border-[#e6e8eb] sm:py-4">
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
                  <div className="flex min-w-0 flex-1 flex-col justify-center border-t border-[#e6e8eb] px-5 py-3.5 sm:border-t-0 sm:py-4">
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

      {/* =================================================
          TRUST STRIP
      ================================================= */}

</div>

    
</div>
  </section>
);
}