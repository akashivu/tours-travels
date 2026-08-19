import type { ReactNode } from "react";
import {
  Maximize2,
  MoreHorizontal,
  PanelRightClose,
} from "lucide-react";

interface TravelCanvasHeaderProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  onClose?: () => void;
  onExpand?: () => void;
}

export function TravelCanvasHeader({
  icon,
  eyebrow,
  title,
  description,
  onClose,
  onExpand,
}: TravelCanvasHeaderProps) {
  return (
    <header
      className="
        relative
        flex
        min-h-[76px]
        shrink-0
        items-center
        justify-between
        border-b
        px-5
        py-3
        sm:px-6
      "
      style={{
        background: "var(--ai-card)",
        borderColor: "var(--ai-border)",
      }}
    >
      {/* Left side */}

      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
          "
          style={{
            background: "var(--ai-soft)",
            borderColor: "var(--ai-border)",
            color: "var(--ai-ink)",
          }}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="
                truncate
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {eyebrow}
            </span>

            <span
              className="
                hidden
                h-1
                w-1
                rounded-full
                sm:block
              "
              style={{
                background: "var(--ai-accent)",
              }}
            />
          </div>

          <div className="mt-0.5 flex items-baseline gap-2">
            <h1
              className="
                truncate
                text-sm
                font-semibold
                tracking-tight
                sm:text-[15px]
              "
              style={{
                color: "var(--ai-ink)",
              }}
            >
              {title}
            </h1>

            <p
              className="
                hidden
                truncate
                text-xs
                sm:block
              "
              style={{
                color: "var(--ai-muted)",
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}

      <div className="ml-4 flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            transition
            duration-200
            hover:bg-black/[0.04]
            sm:flex
          "
          style={{
            color: "var(--ai-muted)",
          }}
          onClick={onExpand}
          aria-label="Expand travel canvas"
          title="Expand"
        >
          <Maximize2 size={16} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            transition
            duration-200
            hover:bg-black/[0.04]
          "
          style={{
            color: "var(--ai-muted)",
          }}
          aria-label="More travel canvas options"
          title="More options"
        >
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </button>

        {onClose && (
          <button
            type="button"
            className="
              ml-1
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              transition
              duration-200
              hover:bg-black/[0.04]
            "
            style={{
              color: "var(--ai-muted)",
            }}
            onClick={onClose}
            aria-label="Close travel canvas"
            title="Close"
          >
            <PanelRightClose
              size={17}
              strokeWidth={1.8}
            />
          </button>
        )}
      </div>

      {/* Subtle bottom accent */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-6
          h-px
          w-16
          opacity-70
        "
        style={{
          background: "var(--ai-ink)",
        }}
      />
    </header>
  );
}