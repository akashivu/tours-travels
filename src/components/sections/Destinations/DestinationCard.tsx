import type { Destination } from "./destinations.types";

interface DestinationCardProps {
  destination: Destination;
  onExplore: (destination: Destination) => void;
}

const DestinationCard = ({
  destination,
  onExplore,
}: DestinationCardProps) => {
  return (
    <article className="group relative h-[250px] overflow-hidden rounded-[22px] bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Explore button */}
      <button
        type="button"
        onClick={() => onExplore(destination)}
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[10px] font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-100"
      >
        Explore
        <span className="text-xs">→</span>
      </button>

      {/* Destination information */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/70">
          {destination.country}
        </p>

        <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
          {destination.name}
        </h3>
      </div>
    </article>
  );
};

export default DestinationCard;