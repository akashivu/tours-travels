import {
  ArrowDownUp,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface HotelFiltersProps {
  onSort?: () => void;
  onFilters?: () => void;
}

export function HotelFilters({
  onSort,
  onFilters,
}: HotelFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onSort}
        className="
          flex
          items-center
          gap-1.5
          rounded-[9px]
          border
          px-2.5
          py-1.5
          text-[10px]
          font-medium
        "
        style={{
          background:
            "var(--ai-card)",
          borderColor:
            "var(--ai-border)",
          color:
            "var(--ai-ink-soft)",
        }}
      >
        <ArrowDownUp size={13} />

        Sort
      </button>

      <button
        type="button"
        onClick={onFilters}
        className="
          flex
          items-center
          gap-1.5
          rounded-[9px]
          border
          px-2.5
          py-1.5
          text-[10px]
          font-medium
        "
        style={{
          background:
            "var(--ai-card)",
          borderColor:
            "var(--ai-border)",
          color:
            "var(--ai-ink-soft)",
        }}
      >
        <SlidersHorizontal size={13} />

        Filters
      </button>

      <button
        type="button"
        className="
          hidden
          items-center
          gap-1.5
          rounded-[9px]
          border
          px-2.5
          py-1.5
          text-[10px]
          font-medium
          sm:flex
        "
        style={{
          background:
            "var(--ai-card)",
          borderColor:
            "var(--ai-border)",
          color:
            "var(--ai-ink-soft)",
        }}
      >
        <Filter size={13} />

        Price
      </button>
    </div>
  );
}