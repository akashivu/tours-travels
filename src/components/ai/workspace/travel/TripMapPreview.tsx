import {
  Hotel,
  MapPin,
  Plane,
} from "lucide-react";

export function TripMapPreview() {
  return (
    <div
      className="
        relative
        min-h-0
        flex-1
        overflow-hidden
      "
    >
      {/* Map surface */}

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(135deg, #eef2f0 0%, #e9eeec 48%, #e7ecea 100%)",
        }}
      >
        {/* Map grid */}

        <div
          className="
            absolute
            inset-0
            opacity-30
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(17,19,24,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(17,19,24,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              "55px 55px",
          }}
        />

        {/* Decorative land areas */}

        <div
          className="
            absolute
            left-[7%]
            top-[18%]
            h-[190px]
            w-[270px]
            rounded-[48%_52%_44%_56%]
            opacity-50
          "
          style={{
            background:
              "#dfe8e1",
            transform:
              "rotate(-12deg)",
          }}
        />

        <div
          className="
            absolute
            right-[8%]
            bottom-[12%]
            h-[220px]
            w-[320px]
            rounded-[54%_46%_58%_42%]
            opacity-50
          "
          style={{
            background:
              "#dce6df",
            transform:
              "rotate(18deg)",
          }}
        />

        {/* Route */}

        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
          "
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <path
            d="M180 360 C 340 190, 480 250, 620 310 S 780 370, 850 210"
            fill="none"
            stroke="#111318"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Bengaluru */}

        <MapMarker
          className="left-[15%] top-[57%]"
          icon={<Plane size={15} />}
          label="Bengaluru"
          dark
        />

        {/* Bangkok */}

        <MapMarker
          className="right-[13%] top-[31%]"
          icon={<MapPin size={15} />}
          label="Bangkok"
          dark
        />

        {/* Hotel */}

        <MapMarker
          className="right-[29%] top-[52%]"
          icon={<Hotel size={14} />}
          label="Hotel"
        />

        <MapMarker
          className="right-[37%] top-[30%]"
          icon={<Hotel size={14} />}
          label="Stay"
        />

        {/* Trip summary */}

        <div
          className="
            absolute
            bottom-5
            left-5
            max-w-[300px]
            rounded-[18px]
            border
            p-4
            backdrop-blur-md
          "
          style={{
            background:
              "rgba(255,255,255,0.92)",
            borderColor:
              "var(--ai-border)",
            boxShadow:
              "var(--ai-shadow-md)",
          }}
        >
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
            "
            style={{
              color:
                "var(--ai-muted)",
            }}
          >
            Suggested journey
          </p>

          <p
            className="
              mt-1.5
              text-[14px]
              font-semibold
            "
            style={{
              color:
                "var(--ai-ink)",
            }}
          >
            Bengaluru → Thailand
          </p>

          <p
            className="
              mt-1
              text-[10.5px]
            "
            style={{
              color:
                "var(--ai-muted)",
            }}
          >
            Route, stays and places will
            appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

interface MapMarkerProps {
  className: string;
  icon: React.ReactNode;
  label: string;
  dark?: boolean;
}

function MapMarker({
  className,
  icon,
  label,
  dark = false,
}: MapMarkerProps) {
  return (
    <div
      className={`
        absolute
        ${className}
        flex
        items-center
        gap-2
      `}
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border-2
          border-white
          shadow-md
        "
        style={{
          background:
            dark
              ? "var(--ai-ink)"
              : "var(--ai-card)",
          color:
            dark
              ? "#ffffff"
              : "var(--ai-ink)",
        }}
      >
        {icon}
      </div>

      <span
        className="
          rounded-full
          px-2.5
          py-1
          text-[10px]
          font-medium
        "
        style={{
          background:
            "rgba(255,255,255,0.9)",
          color:
            "var(--ai-ink)",
          boxShadow:
            "0 2px 8px rgba(17,19,24,0.08)",
        }}
      >
        {label}
      </span>
    </div>
  );
}