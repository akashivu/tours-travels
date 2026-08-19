import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

import type { TripMapData } from "./map.types";

interface TripMapProps {
  data?: TripMapData;
  isLoading?: boolean;
  error?: string | null;
  onPlaceSelect?: (placeId: string) => void;
}

export function TripMap({
  data,
  isLoading = false,
  error = null,
}: TripMapProps) {
  const mapContainerRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /*
     * Real map SDK initialization will be added here.
     *
     * The component intentionally does not:
     * - create fake coordinates
     * - create fake markers
     * - expose API keys
     *
     * TripMapData will be supplied by the
     * connected map provider/backend.
     */

    if (!mapContainerRef.current) {
      return;
    }

    if (!data) {
      return;
    }

    // Real map initialization goes here.
  }, [data]);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <div
        className="
          relative
          h-full
          min-h-[360px]
          w-full
          overflow-hidden
        "
        style={{
          background:
            "#111D30",
        }}
      >
        <div
          className="
            absolute
            inset-0
            animate-pulse
          "
          style={{
            background:
              "linear-gradient(135deg, #17263D 0%, #111D30 50%, #0D1829 100%)",
            opacity: 0.8,
          }}
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded-xl
            border
            px-4
            py-3
          "
          style={{
            background:
              "rgba(20, 34, 55, 0.92)",
            borderColor:
              "rgba(148, 163, 184, 0.18)",
            color:
              "#CBD5E1",
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.25)",
          }}
        >
          <p className="text-xs">
            Preparing your route...
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {
    return (
      <div
        className="
          flex
          h-full
          min-h-[360px]
          items-center
          justify-center
          p-6
        "
        style={{
          background:
            "#111D30",
        }}
      >
        <div className="max-w-sm text-center">
          <div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
            "
            style={{
              background:
                "rgba(255,255,255,0.06)",
              borderColor:
                "rgba(148,163,184,0.18)",
              color:
                "#CBD5E1",
            }}
          >
            <MapPin
              size={19}
              strokeWidth={1.7}
            />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-medium
            "
            style={{
              color: "#F8FAFC",
            }}
          >
            We couldn't load the map
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
            "
            style={{
              color: "#94A3B8",
            }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * MAP CONTAINER
   * =========================================================
   */

  return (
    <div
      ref={mapContainerRef}
      className="
        relative
        h-full
        min-h-[360px]
        w-full
        overflow-hidden
      "
      style={{
        background:
          "#111D30",
      }}
    >
      {/* =====================================================
          MAP SURFACE

          This is intentionally only the map surface.
          The real map provider will render inside this
          container.
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(135deg, #17263D 0%, #142238 45%, #0E192B 100%)",
        }}
      />

      {/* Subtle map-grid treatment.
          This does NOT represent real geographic data. */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          opacity: 0.16,
          backgroundImage: `
            linear-gradient(
              30deg,
              transparent 48%,
              rgba(148,163,184,0.35) 49%,
              transparent 50%
            ),
            linear-gradient(
              120deg,
              transparent 48%,
              rgba(148,163,184,0.22) 49%,
              transparent 50%
            )
          `,
          backgroundSize:
            "90px 90px",
        }}
      />

      {/* =====================================================
          MAP STATUS CARD
      ====================================================== */}

      <div
        className="
          absolute
          left-5
          top-5
          z-20
          rounded-2xl
          border
          px-4
          py-3
        "
        style={{
          background:
            "rgba(17, 29, 48, 0.88)",
          borderColor:
            "rgba(148, 163, 184, 0.18)",
          backdropFilter:
            "blur(12px)",
          boxShadow:
            "0 12px 35px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
            "
            style={{
              background:
                "rgba(59,130,246,0.16)",
              color:
                "#60A5FA",
            }}
          >
            <MapPin
              size={14}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <p
              className="
                text-[11px]
                font-semibold
              "
              style={{
                color: "#F8FAFC",
              }}
            >
              Live travel map
            </p>

            <p
              className="
                mt-0.5
                text-[9.5px]
              "
              style={{
                color: "#94A3B8",
              }}
            >
              Explore your journey visually
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE

          Keep this until the actual map SDK is connected.
      ====================================================== */}

      {!data && (
        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-6
          "
        >
          <div className="text-center">
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
                  "rgba(255,255,255,0.06)",
                borderColor:
                  "rgba(148,163,184,0.18)",
                color:
                  "#E2E8F0",
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.2)",
              }}
            >
              <MapPin
                size={22}
                strokeWidth={1.6}
              />
            </div>

            <p
              className="
                mt-4
                text-sm
                font-semibold
              "
              style={{
                color: "#F8FAFC",
              }}
            >
              Your travel map
            </p>

            <p
              className="
                mx-auto
                mt-1
                max-w-xs
                text-xs
                leading-5
              "
              style={{
                color: "#94A3B8",
              }}
            >
              Your location and trip
              destinations will appear here.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          FUTURE MAP CONTROLS

          These are only visual placeholders until the
          actual map SDK is connected.
      ====================================================== */}

      <div
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          flex-col
          gap-2
        "
      >
        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
          "
          style={{
            background:
              "rgba(17,29,48,0.88)",
            borderColor:
              "rgba(148,163,184,0.18)",
            color:
              "#E2E8F0",
            backdropFilter:
              "blur(12px)",
          }}
          aria-label="Locate me"
        >
          <MapPin
            size={16}
            strokeWidth={1.8}
          />
        </button>

        <div
          className="
            overflow-hidden
            rounded-xl
            border
          "
          style={{
            background:
              "rgba(17,29,48,0.88)",
            borderColor:
              "rgba(148,163,184,0.18)",
            backdropFilter:
              "blur(12px)",
          }}
        >
          <button
            type="button"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-sm
            "
            style={{
              color:
                "#E2E8F0",
            }}
            aria-label="Zoom in"
          >
            +
          </button>

          <div
            className="h-px"
            style={{
              background:
                "rgba(148,163,184,0.15)",
            }}
          />

          <button
            type="button"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-sm
            "
            style={{
              color:
                "#E2E8F0",
            }}
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>

      {/* =====================================================
          EXPLORE AROUND YOU
      ====================================================== */}

      <div
        className="
          absolute
          bottom-5
          left-5
          right-5
          z-20
          rounded-2xl
          border
          p-4
        "
        style={{
          background:
            "rgba(17,29,48,0.90)",
          borderColor:
            "rgba(148,163,184,0.18)",
          backdropFilter:
            "blur(14px)",
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.28)",
        }}
      >
        <p
          className="
            text-[11px]
            font-semibold
          "
          style={{
            color: "#F8FAFC",
          }}
        >
          Explore around you
        </p>

        <p
          className="
            mt-0.5
            text-[9.5px]
          "
          style={{
            color: "#94A3B8",
          }}
        >
          Discover what's nearby
        </p>

        <div
          className="
            mt-3
            grid
            grid-cols-4
            gap-2
          "
        >
          {[
            "Flights",
            "Hotels",
            "Places",
            "Food",
          ].map((item) => (
            <button
              key={item}
              type="button"
              className="
                rounded-xl
                border
                px-2
                py-2.5
                text-[9px]
                transition-colors
              "
              style={{
                background:
                  "rgba(255,255,255,0.045)",
                borderColor:
                  "rgba(148,163,184,0.14)",
                color:
                  "#CBD5E1",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}