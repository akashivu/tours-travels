import {
  Minus,
  Plus,
  X,
  
} from "lucide-react";

interface AIWorkspaceHeaderProps {
  onNewChat?: () => void;
  onClose?: () => void;
  onThemeClick?: () => void;
}

export function AIWorkspaceHeader({
  onNewChat,
  onClose,
  onThemeClick,
}: AIWorkspaceHeaderProps) {
  return (
    <header
      className="
        flex
        h-[55px]
        shrink-0
        items-center
        justify-between
        border-b
        px-5
        lg:px-7
      "
      style={{
        background: "var(--ai-canvas)",
        borderColor: "var(--ai-border)",
      }}
    >
    

      <div className="flex min-w-0 items-center gap-2.5">
        <p
          className="
            flex
            items-center
            text-[20px]
            font-semibold
            tracking-[-0.02em]
          "
          style={{
            color: "var(--ai-ink)",
          }}
        >
          Elixway AI
          <span style={{ color: "var(--ai-accent)" }}>.</span>
        </p>
      </div>



      

      {/* =====================================================
          RIGHT — ACTIONS
      ====================================================== */}

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onNewChat}
          className="
            flex
            h-8
            items-center
            gap-1.5
            rounded-[var(--ai-radius-pill)]
            border
            px-3.5
            text-[14px]
            font-medium
            transition-all
            duration-150
            hover:border-[var(--ai-border-strong)]
            hover:bg-[var(--ai-card-soft)]
          "
          style={{
            background: "var(--ai-card)",
            borderColor: "var(--ai-border)",
            color: "var(--ai-ink)",
          }}
        >
          <Plus
            size={16}
            strokeWidth={2}
          />

          New trip
        </button>

        <button
          type="button"
          onClick={onThemeClick}
          aria-label="Minimize"
          className="
            hidden
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            transition-colors
            duration-150
            hover:bg-[var(--ai-card-soft)]
            sm:flex
          "
          style={{
            color: "var(--ai-muted)",
          }}
        >
          <Minus
            size={16}
            strokeWidth={2}
          />
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              transition-colors
              duration-150
              hover:bg-[var(--ai-card-soft)]
            "
            style={{
              color: "var(--ai-muted)",
            }}
          >
            <X
              size={17}
              strokeWidth={1.8}
            />
          </button>
        )}
      </div>
    </header>
  );
}