import { useState } from "react";
import { Users, Briefcase, DoorOpen, Snowflake, Settings2, CheckCircle2, Info } from "lucide-react";

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
    image: "https://www.usedrive.in/upload/car/WhatsApp%20Image%202024-03-15%20at%206.30.40%20PM.jpeg",
    seats: 5, bags: 2, doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹1,200" },
        { l: "8 hr / 80 km", p: "₹2,000" },
        { l: "12 hr / 120 km", p: "₹3,000" },
      ],
      extra: "₹20/km", extraHr: "₹200/hr", note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹4,200" }],
      extra: "₹15/km", note: "Driver bata & tax included",
    },
  },
  {
    name: "Swift Dzire",
    type: "Compact sedan",
    image: "https://www.usedrive.in/upload/car/swift%20diser%202.png",
    seats: 5, bags: 2, doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹1,200" },
        { l: "8 hr / 80 km", p: "₹2,000" },
        { l: "12 hr / 120 km", p: "₹3,000" },
      ],
      extra: "₹20/km", extraHr: "₹200/hr", note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹4,200" }],
      extra: "₹15/km", note: "Driver bata & tax included",
    },
  },
  {
    name: "Toyota Innova",
    type: "7-seater MPV",
    image: "https://www.usedrive.in/upload/car/20221104124352_Innova.jpg",
    seats: 7, bags: 3, doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,000" },
        { l: "8 hr / 80 km", p: "₹3,200" },
        { l: "12 hr / 120 km", p: "₹4,200" },
      ],
      extra: "₹25/km", extraHr: "₹250/hr", note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹5,699" }],
      extra: "₹18/km", note: "Driver bata & tax included",
    },
  },
  {
    name: "Innova Crysta",
    type: "Premium MPV",
    image: "https://www.kushicabz.com/upload/car/crysta-removebg-preview.png",
    seats: 7, bags: 3, doors: 4,
    tags: ["Free cancellation", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,400" },
        { l: "8 hr / 80 km", p: "₹3,400" },
        { l: "12 hr / 120 km", p: "₹4,400" },
      ],
      extra: "₹30/km", extraHr: "₹275/hr", note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹6,199" }],
      extra: "₹19/km", note: "Driver allowance & tax included",
    },
  },
  {
    name: "Tempo Traveller",
    type: "Group vehicle",
    image: "https://www.usedrive.in/upload/car/tempo%20traveler.jpg",
    seats: 12, bags: 6, doors: 2,
    tags: ["Group travel", "Toll extra"],
    local: {
      pkgs: [
        { l: "4 hr / 40 km", p: "₹2,200" },
        { l: "8 hr / 80 km", p: "₹3,400" },
        { l: "12 hr / 120 km", p: "₹4,400" },
      ],
      extra: "₹30/km", extraHr: "₹275/hr", note: "Toll & parking extra",
    },
    out: {
      pkgs: [{ l: "300 km / day", p: "₹6,799" }],
      extra: "₹21/km", note: "Driver allowance & tax included",
    },
  },
];

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [tab, setTab] = useState<"local" | "out">("local");
  const d: TripData = tab === "local" ? vehicle.local : vehicle.out;
  const basePrice = d.pkgs[0].p;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Main Row */}
      <div className="flex flex-col sm:flex-row">

        {/* Image Column */}
        <div className="sm:w-48 bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-200 flex flex-col items-center justify-center p-4 gap-2">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-36 h-20 object-contain"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
              (e.currentTarget.style.opacity = "0.2")
            }
          />
          <span className="text-xs text-gray-400 text-center">{vehicle.type}</span>
        </div>

        {/* Info Column */}
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
            <p className="text-xs text-gray-400">or similar · {vehicle.type}</p>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={13} className="text-gray-400" />
              {vehicle.seats} seats
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={13} className="text-gray-400" />
              {vehicle.bags} bags
            </span>
            <span className="flex items-center gap-1">
              <DoorOpen size={13} className="text-gray-400" />
              {vehicle.doors} doors
            </span>
            <span className="flex items-center gap-1">
              <Snowflake size={13} className="text-gray-400" />
              A/C
            </span>
            <span className="flex items-center gap-1">
              <Settings2 size={13} className="text-gray-400" />
              Auto
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {vehicle.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${
                  tag === "Free cancellation" || tag === "Group travel"
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                }`}
              >
                {tag === "Free cancellation" || tag === "Group travel" ? (
                  <CheckCircle2 size={11} />
                ) : (
                  <Info size={11} />
                )}
                {tag}
              </span>
            ))}
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setTab("local")}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
                tab === "local"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Local packages
            </button>
            <button
              onClick={() => setTab("out")}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
                tab === "out"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Outstation
            </button>
          </div>
        </div>

        {/* Price Column */}
        <div className="sm:w-44 border-t sm:border-t-0 sm:border-l border-gray-200 p-4 flex flex-col justify-between items-end gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-2xl font-semibold text-gray-900">{basePrice}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {tab === "local" ? "for 4 hr / 40 km" : "per day / 300 km"}
            </p>
          </div>
          <div className="w-full text-right">
            <p className="text-xs text-gray-400 mb-2">
              {tab === "out" ? d.note : "Toll & parking extra"}
            </p>
            <button className="w-full bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Book now
            </button>
          </div>
        </div>
      </div>

      {/* Package Detail Strip */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {d.pkgs.map((pkg: Package, i: number) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-400">{pkg.l}</p>
            <p className="text-sm font-semibold text-gray-900">{pkg.p}</p>
            <p className="text-xs text-gray-400">
              {tab === "local" ? "Excl. extras" : "All-in rate"}
            </p>
          </div>
        ))}
      </div>

      {/* Extra Row */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex flex-wrap gap-4">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Info size={11} className="text-gray-400" />
          Extra km <strong className="text-gray-700 ml-1">{d.extra}</strong>
        </span>
        {tab === "local" && d.extraHr && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Info size={11} className="text-gray-400" />
            Extra hour <strong className="text-gray-700 ml-1">{d.extraHr}</strong>
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <CheckCircle2 size={11} className="text-gray-400" />
          <strong className="text-gray-700">{d.note}</strong>
        </span>
      </div>
    </div>
  );
}

export default function OurVehicles() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col gap-4">
        <div className="mb-10">
  <p className="text-sm font-semibold tracking-widest uppercase text-orange-500">
    Premium Fleet
  </p>

  <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
    Find the Perfect Ride for Every Journey
  </h1>

  <p className="mt-4 max-w-3xl text-gray-600 text-lg leading-relaxed">
    Choose from our professionally maintained fleet for local trips,
    airport transfers, outstation travel, and group journeys with
    transparent pricing and experienced drivers.
  </p>
</div>
        {vehicles.map((vehicle: Vehicle, i: number) => (
          <VehicleCard key={i} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}