import { Lightbulb, Utensils } from "lucide-react";

interface Props {
  content: string;
}

function extractSection(content: string, heading: string) {
  const regex = new RegExp(
    `###\\s*${heading}\\s*:?\\s*([\\s\\S]*?)(?=\\n###|\\n##|$)`,
    "i",
  );

  const match = content.match(regex);
  if (!match) return [];

  return match[1]
    .split("\\n")
    .map((line) =>
      line
        .replace(/^[-*]\\s*/, "")
        .replace(/\\*\\*/g, "")
        .trim(),
    )
    .filter(Boolean);
}

export function TravelInsights({ content }: Props) {
  const food = extractSection(content, "Food Recommendations");
  const tips = extractSection(content, "Local Tips");

  if (food.length === 0 && tips.length === 0) return null;

  return (
    <section className="mt-9 max-w-[760px] space-y-8">
      {food.length > 0 && (
        <InsightSection
          icon={<Utensils size={16} strokeWidth={1.8} />}
          title="Food to try"
          items={food}
        />
      )}

      {tips.length > 0 && (
        <InsightSection
          icon={<Lightbulb size={16} strokeWidth={1.8} />}
          title="Local tips"
          items={tips}
        />
      )}
    </section>
  );
}

function InsightSection({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="text-[#2563EB]">{icon}</span>
        <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-[#202020]">
          {title}
        </h3>
      </div>

      <div className="mt-3 space-y-2.5 pl-[26px]">
        {items.map((item, index) => (
          <p
            key={`${title}-${index}`}
            className="text-[15px] leading-[1.75] text-[#666660]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
