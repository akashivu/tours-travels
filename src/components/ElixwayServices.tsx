import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Category = {
  key: string;
  title: string;
  subtitle: string;
  illustration: ReactNode;
};

type ExploreCategorySectionProps = {
  onSelect?: (key: string) => void;
};

// Original flat-style SVG illustrations, on-brand with Elixway's
// orange (#f97316) + navy (#101828) palette. Each is self-contained
// so it can be swapped independently later.

function FlightsIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <ellipse cx="100" cy="140" rx="70" ry="8" fill="#eef0f3" />
      <circle cx="100" cy="80" r="55" fill="#eaf1fb" />
      <g transform="translate(55 55) rotate(-15)">
        <path
          d="M45 0 L52 18 L90 30 L90 38 L52 32 L45 55 L58 66 L58 72 L38 66 L18 72 L18 66 L31 55 L24 32 L-14 38 L-14 30 L24 18 Z"
          fill="#f97316"
        />
      </g>
      <rect x="118" y="30" width="20" height="28" rx="3" fill="#101828" />
      <circle cx="128" cy="38" r="2.5" fill="#f97316" />
      <circle cx="128" cy="46" r="2.5" fill="#f97316" />
      <path d="M60 105 L75 88 L95 88 L84 105 Z" fill="#2563eb" />
      <path d="M100 105 L115 88 L125 88 L118 105 Z" fill="#98c4f5" />
    </svg>
  );
}

function HotelsIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <ellipse cx="100" cy="140" rx="70" ry="8" fill="#eef0f3" />
      <rect x="55" y="45" width="70" height="80" rx="4" fill="#101828" />
      <rect x="65" y="58" width="14" height="14" rx="2" fill="#f97316" />
      <rect x="93" y="58" width="14" height="14" rx="2" fill="#eef4ff" />
      <rect x="65" y="82" width="14" height="14" rx="2" fill="#eef4ff" />
      <rect x="93" y="82" width="14" height="14" rx="2" fill="#f97316" />
      <rect x="80" y="106" width="20" height="19" rx="2" fill="#2563eb" />
      <path d="M50 45 L90 20 L130 45 Z" fill="#2563eb" />
      <rect x="128" y="70" width="10" height="55" rx="2" fill="#eaf1fb" />
      <path d="M120 70 L133 55 L146 70 Z" fill="#98c4f5" />
    </svg>
  );
}

function CabsIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <ellipse cx="100" cy="140" rx="70" ry="8" fill="#eef0f3" />
      <rect x="45" y="80" width="110" height="35" rx="10" fill="#f97316" />
      <path d="M60 80 L75 55 L125 55 L140 80 Z" fill="#f97316" />
      <path d="M78 60 L88 78 L112 78 L122 60 Z" fill="#eaf1fb" />
      <circle cx="72" cy="118" r="12" fill="#101828" />
      <circle cx="72" cy="118" r="5" fill="#98a2b3" />
      <circle cx="128" cy="118" r="12" fill="#101828" />
      <circle cx="128" cy="118" r="5" fill="#98a2b3" />
      <rect x="90" y="88" width="20" height="10" rx="2" fill="#fff" />
    </svg>
  );
}

function AIPlannerIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <ellipse cx="100" cy="140" rx="70" ry="8" fill="#eef0f3" />
      <circle cx="100" cy="80" r="42" fill="#eef4ff" />
      <path
        d="M100 45 L106 62 L123 68 L106 74 L100 91 L94 74 L77 68 L94 62 Z"
        fill="#2563eb"
      />
      <path
        d="M138 45 L141 53 L149 56 L141 59 L138 67 L135 59 L127 56 L135 53 Z"
        fill="#f97316"
      />
      <path
        d="M58 95 L61 103 L69 106 L61 109 L58 117 L55 109 L47 106 L55 103 Z"
        fill="#f97316"
      />
    </svg>
  );
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    key: "ai-planner",
    title: "Plan with AI",
    subtitle: "Get your itinerary in seconds",
    illustration: <AIPlannerIllustration />,
  },
  {
    key: "flights",
    title: "Flights",
    subtitle: "Book domestic & international",
    illustration: <FlightsIllustration />,
  },
  {
    key: "hotels",
    title: "Hotels",
    subtitle: "Stays for every budget",
    illustration: <HotelsIllustration />,
  },
  {
    key: "cabs",
    title: "Cabs",
    subtitle: "Airport transfers & city rides",
    illustration: <CabsIllustration />,
  },
];

export default function ExploreCategorySection({
  onSelect,
}: ExploreCategorySectionProps) {
  return (
    <section className="w-full bg-white py-14 lg:py-18">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-[26px] font-bold text-[#101828] lg:text-[30px]">
          Explore Elixway
        </h2>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DEFAULT_CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onSelect?.(category.key)}
              className="
                group
                flex
                flex-col
                items-start
                overflow-hidden
                rounded-[20px]
                border
                border-[#eef0f3]
                bg-[#fbfbfc]
                p-6
                text-left
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-[#f97316]/30
                hover:shadow-[0_16px_36px_rgba(16,24,40,0.10)]
              "
            >
              <h3 className="text-[18px] font-bold text-[#101828]">
                {category.title}
              </h3>

              <p className="mt-1 text-[13.5px] text-[#667085]">
                {category.subtitle}
              </p>

              <div className="mt-6 h-[130px] w-full">
                {category.illustration}
              </div>

              <span
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-1
                  text-[13px]
                  font-semibold
                  text-[#f97316]
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                Explore
                <ArrowRight size={14} strokeWidth={2.2} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}