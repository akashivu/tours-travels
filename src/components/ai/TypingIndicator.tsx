import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
        "
        style={{
          background: "var(--ai-card-soft)",
          color: "var(--ai-ink-soft)",
        }}
      >
        <Sparkles size={13} strokeWidth={1.9} />
      </div>

      <div className="flex items-center gap-1 py-1">
        <span
          className="ai-typing-dot h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--ai-ink-soft)" }}
        />

        <span
          className="ai-typing-dot h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--ai-ink-soft)",
            animationDelay: "0.15s",
          }}
        />

        <span
          className="ai-typing-dot h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--ai-ink-soft)",
            animationDelay: "0.3s",
          }}
        />
      </div>
    </div>
  );
}