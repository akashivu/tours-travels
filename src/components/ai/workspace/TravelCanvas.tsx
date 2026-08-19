import { Compass, Hotel, MapPinned, Plane } from "lucide-react";

export function TravelCanvas() {
  return (
    <section className="relative hidden min-w-0 flex-1 overflow-hidden lg:block" style={{ background: "var(--ai-canvas)" }}>
      {/* Background atmosphere */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 75% 25%,
              var(--ai-accent-glow),
              transparent 32%
            ),
            radial-gradient(
              circle at 25% 75%,
              var(--ai-blue-glow),
              transparent 28%
            )
          `,
        }}
      />

      {/* Main empty state */}

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        {/* Icon */}

        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-[22px]"
          style={{
            background: "var(--ai-card)",
            border: "1px solid var(--ai-border)",
            boxShadow: "var(--ai-shadow-sm)",
          }}
        >
          <Compass size={27} strokeWidth={1.5} style={{ color: "var(--ai-accent)" }} />
        </div>

        <h2 className="text-[20px] font-semibold tracking-tight" style={{ color: "var(--ai-ink)" }}>
          Your travel canvas
        </h2>

        <p className="mt-2 max-w-[360px] text-[13px] leading-6" style={{ color: "var(--ai-muted)" }}>
          Ask Elixway to find flights, discover hotels,
          explore places or plan your complete journey.
        </p>

        {/* Capability cards */}

        <div className="mt-8 grid w-full max-w-[560px] grid-cols-3 gap-3">
          <CanvasCapability
            icon={<Plane size={17} />}
            title="Flights"
            description="Compare options"
          />

          <CanvasCapability
            icon={<Hotel size={17} />}
            title="Hotels"
            description="Find stays"
          />

          <CanvasCapability
            icon={<MapPinned size={17} />}
            title="Explore"
            description="Places & routes"
          />
        </div>
      </div>
    </section>
  );
}

interface CanvasCapabilityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CanvasCapability({
  icon,
  title,
  description,
}: CanvasCapabilityProps) {
  return (
    <div
      className="rounded-2xl p-4 text-left"
      style={{
        background: "var(--ai-card)",
        border: "1px solid var(--ai-border)",
      }}
    >
      <div
        className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "var(--ai-accent-soft)",
          color: "var(--ai-accent)",
        }}
      >
        {icon}
      </div>

      <p className="text-[12px] font-medium" style={{ color: "var(--ai-ink)" }}>
        {title}
      </p>

      <p className="mt-1 text-[10.5px]" style={{ color: "var(--ai-muted)" }}>
        {description}
      </p>
    </div>
  );
}