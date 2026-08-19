import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
}

const FeatureCard = ({ icon: Icon, title, description, code }: FeatureCardProps) => {
  return (
    <div className="group relative h-full rounded-2xl border border-[#16213A]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16213A]/20 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#16213A]/25 text-[#16213A] transition-colors duration-300 group-hover:border-[#FF5A36]/50 group-hover:text-[#FF5A36]">
          <Icon size={22} />
        </div>
        <span className="rotate-3 rounded-md border border-[#16213A]/15 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#16213A]/40 transition-colors duration-300 group-hover:border-[#FF5A36]/30 group-hover:text-[#FF5A36]/70">
          {code}
        </span>
      </div>

      <h3 className="mt-6 font-display text-xl font-bold text-[#16213A]">{title}</h3>
      <p className="mt-2 leading-7 text-[#4A5568]">{description}</p>
    </div>
  );
};

export default FeatureCard;