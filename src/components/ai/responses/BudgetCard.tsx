import { Wallet } from "lucide-react";
import type { BudgetData } from "./AIResponse";

interface Props {
  data: BudgetData;
}

export function BudgetCard({ data }: Props) {
  return (
    <section className="mt-9 max-w-[760px]">
      <div className="flex items-center gap-2.5">
        <Wallet size={16} strokeWidth={1.8} className="text-[#2563EB]" />
        <p className="text-[15px] font-semibold tracking-[-0.015em] text-[#202020]">
          Estimated budget
        </p>
      </div>

      <div className="mt-2 pl-[26px]">
        <p className="text-[16px] font-medium leading-[1.6] text-[#292929]">
          {data.amount}
        </p>

        {data.description && (
          <p className="mt-1 text-[15px] leading-[1.75] text-[#666660]">
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
}
