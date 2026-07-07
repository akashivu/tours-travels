import type { LucideIcon } from "lucide-react";
import {
  Users,
  Briefcase,
  DoorOpen,
  Snowflake,
  Settings2,
  ShieldCheck,
  Navigation,
  Sparkles,
  BadgeCheck,
  CarFront,
  Clock,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Original data & types — untouched. Do not modify structure or types.  */
/* ---------------------------------------------------------------------- */

type Package = {
  l: string;
  p: string;
};

type TripData = {
  pkgs: Package[];
  extra: string;
  extraHr?: string;
  note: string;
};

type Vehicle = {
  name: string;
  type: string;
  image: string;
  seats: number;
  bags: number;
  doors: number;
  tags: string[];
  local: TripData;
  out: TripData;
};

const vehicles: Vehicle[] = [
  {
    name: "Toyota Etios",
    type: "Compact sedan",
    image:
      "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    seats: 5,
    bags: 2,
    doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹1,200" },
        { l: "8 hr / 80 km", p: "₹2,000" },
        { l: "12 hr / 120 km", p: "₹3,000" },
      ],
      extra: "₹20/km",
      extraHr: "₹200/hr",
      note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹4,200" }],
      extra: "₹15/km",
      note: "Driver bata & tax included",
    },
  },
  {
    name: "Swift Dzire",
    type: "Compact sedan",
    image: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    seats: 5,
    bags: 2,
    doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹1,200" },
        { l: "8 hr / 80 km", p: "₹2,000" },
        { l: "12 hr / 120 km", p: "₹3,000" },
      ],
      extra: "₹20/km",
      extraHr: "₹200/hr",
      note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹4,200" }],
      extra: "₹15/km",
      note: "Driver bata & tax included",
    },
  },
  {
    name: "Toyota Innova",
    type: "7-seater MPV",
    image: "https://www.usedrive.in/upload/car/20221104124352_Innova.jpg",
    seats: 7,
    bags: 3,
    doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,000" },
        { l: "8 hr / 80 km", p: "₹3,200" },
        { l: "12 hr / 120 km", p: "₹4,200" },
      ],
      extra: "₹25/km",
      extraHr: "₹250/hr",
      note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹5,699" }],
      extra: "₹18/km",
      note: "Driver bata & tax included",
    },
  },
  {
    name: "Innova Crysta",
    type: "Premium MPV",
    image:
      "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    seats: 7,
    bags: 3,
    doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,400" },
        { l: "8 hr / 80 km", p: "₹3,400" },
        { l: "12 hr / 120 km", p: "₹4,400" },
      ],
      extra: "₹30/km",
      extraHr: "₹275/hr",
      note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹6,199" }],
      extra: "₹19/km",
      note: "Driver allowance & tax included",
    },
  },
  {
    name: "Tempo Traveller",
    type: "Group vehicle",
    image: "https://www.usedrive.in/upload/car/tempo%20traveler.jpg",
    seats: 12,
    bags: 6,
    doors: 2,
    tags: ["Group travel", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,200" },
        { l: "8 hr / 80 km", p: "₹3,400" },
        { l: "12 hr / 120 km", p: "₹4,400" },
      ],
      extra: "₹30/km",
      extraHr: "₹275/hr",
      note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹6,799" }],
      extra: "₹21/km",
      note: "Driver allowance & tax included",
    },
  },
];

/* ---------------------------------------------------------------------- */
/* Presentation-only content, keyed off vehicle.name.                     */
/* Purely descriptive copy for the catalogue view — no business logic,   */
/* no pricing, no effect on the data above.                               */
/* ---------------------------------------------------------------------- */

type FleetCopy = {
  transmission: string;
  perfectFor: string[];
  bestFor: string[];
  groupNote: string;
};

const fleetCopy: Record<string, FleetCopy> = {
  "Toyota Etios": {
    transmission: "Manual / Automatic",
    perfectFor: [
      "Airport transfers",
      "Business travel",
      "City rides",
      "Short outstation trips",
    ],
    bestFor: ["Solo travelers", "Couples", "Corporate travel", "Airport pickup & drop"],
    groupNote: "Family Friendly",
  },
  "Swift Dzire": {
    transmission: "Manual / Automatic",
    perfectFor: [
      "Airport transfers",
      "Business travel",
      "City rides",
      "Weekend trips",
    ],
    bestFor: ["Solo travelers", "Small families", "Corporate travel", "Outstation trips"],
    groupNote: "Family Friendly",
  },
  "Toyota Innova": {
    transmission: "Manual",
    perfectFor: [
      "Family trips",
      "Airport transfers",
      "Outstation journeys",
      "Group outings",
    ],
    bestFor: ["Families", "Group travel", "Outstation trips", "Airport pickup & drop"],
    groupNote: "Family Friendly",
  },
  "Innova Crysta": {
    transmission: "Automatic",
    perfectFor: [
      "Corporate travel",
      "Long outstation trips",
      "Family vacations",
      "Premium airport transfers",
    ],
    bestFor: ["Corporate executives", "Families", "Outstation trips", "Premium travel"],
    groupNote: "Family Friendly",
  },
  "Tempo Traveller": {
    transmission: "Manual",
    perfectFor: [
      "Group travel",
      "Outstation tours",
      "Corporate events",
      "Pilgrimage trips",
    ],
    bestFor: ["Large groups", "Corporate events", "Family functions", "Outstation tours"],
    groupNote: "Group Friendly",
  },
};

const fallbackCopy: FleetCopy = {
  transmission: "Manual / Automatic",
  perfectFor: ["Airport transfers", "City rides", "Outstation trips", "Group travel"],
  bestFor: ["Travelers", "Families", "Corporate travel", "Outstation trips"],
  groupNote: "Family Friendly",
};

/* ---------------------------------------------------------------------- */

function SpecItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100">
        <Icon size={12} className="text-slate-500" strokeWidth={2} />
      </span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {children}
    </p>
  );
}

function Chip({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
      {Icon && <Icon size={11} className="text-emerald-600" />}
      {children}
    </span>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const copy = fleetCopy[vehicle.name] ?? fallbackCopy;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.16)]">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full shrink-0 overflow-hidden bg-slate-100 sm:w-40 lg:w-56">
          <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-slate-900/90 px-2 py-1 backdrop-blur-sm">
            <CarFront size={10} className="text-white" />
            <span className="text-[10px] font-medium tracking-wide text-white">
              {vehicle.type}
            </span>
          </div>
          <div className="h-32 w-full sm:h-full sm:min-h-[132px]">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                (e.currentTarget.style.opacity = "0.15")
              }
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 border-t border-slate-100 p-3.5 sm:border-t-0 sm:border-l sm:p-4">
          {/* Header */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-slate-900">
              {vehicle.name}
            </h3>
            <span className="text-[11px] text-slate-400">{vehicle.type}</span>
          </div>

          {/* Specs */}
          <div className="mt-2.5 grid grid-cols-3 gap-y-1.5 border-t border-slate-100 pt-2.5">
            <SpecItem icon={Users} label={`${vehicle.seats} pax`} />
            <SpecItem icon={Briefcase} label={`${vehicle.bags} bags`} />
            <SpecItem icon={DoorOpen} label={`${vehicle.doors} doors`} />
            <SpecItem icon={Snowflake} label="A/C" />
            <SpecItem icon={Settings2} label={copy.transmission} />
            <SpecItem icon={Navigation} label="GPS" />
          </div>

          {/* Perfect for */}
          <div className="mt-2.5 border-t border-slate-100 pt-2.5">
            <SectionLabel>Perfect for</SectionLabel>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {copy.perfectFor.map((item: string) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>

          {/* Best for */}
          <div className="mt-2.5 border-t border-slate-100 pt-2.5">
            <SectionLabel>Best for</SectionLabel>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {copy.bestFor.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Assurance + reliability */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5">
            <Chip icon={ShieldCheck}>Sanitized</Chip>
            <Chip icon={Sparkles}>Chauffeur driven</Chip>
            <Chip icon={Users}>{copy.groupNote}</Chip>
            <Chip icon={Clock}>24×7</Chip>
            <Chip icon={BadgeCheck}>Well maintained</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurVehicles() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Premium Fleet
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Our Premium Fleet
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Choose from our professionally maintained fleet designed for airport
          transfers, corporate travel, family trips, outstation journeys, and
          group transportation. Every vehicle is chauffeur-driven, regularly
          serviced, and maintained to provide a safe, comfortable, and
          reliable travel experience.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {vehicles.map((vehicle: Vehicle) => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}