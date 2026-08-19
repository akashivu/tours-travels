import { CalendarDays, MapPin, BedDouble } from "lucide-react";
import type { TripSummaryData } from "./AIResponse";

interface Props {
  data: TripSummaryData;
}

export function TripSummary({ data }: Props) {
  return (
    <section className="mt-8 max-w-[760px]">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8A8A84]">
        Trip overview
      </p>

      <h2 className="mt-2 text-[21px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#171717]">
        {data.duration} in {data.destination}
      </h2>

      {data.route && (
        <p className="mt-2 max-w-[700px] text-[15px] leading-[1.75] text-[#666660]">
          {data.route}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
        <SummaryItem
          icon={<CalendarDays size={15} strokeWidth={1.8} />}
          value={data.duration}
          label="Duration"
        />

        {data.nights && (
          <SummaryItem
            icon={<BedDouble size={15} strokeWidth={1.8} />}
            value={data.nights}
            label="Stay"
          />
        )}

        {data.placesCount !== undefined && (
          <SummaryItem
            icon={<MapPin size={15} strokeWidth={1.8} />}
            value={String(data.placesCount)}
            label="Places"
          />
        )}
      </div>
    </section>
  );
}

function SummaryItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[#2563EB]">{icon}</span>
      <span className="font-medium text-[#292929]">{value}</span>
      <span className="text-[#858580]">{label}</span>
    </span>
  );
}
