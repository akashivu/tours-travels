import {
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import type { Session } from "../../../../types/ai";

interface ConversationItemProps {
  session: Session;
  active?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

function formatSessionDate(
  dateString: string
) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recent trip";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  ).format(date);
}

function formatSessionTime(
  dateString: string
) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(date);
}

export function ConversationItem({
  session,
  active = false,
  onClick,
  onDelete,
}: ConversationItemProps) {
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className="
        group
        relative
        flex
        w-full
        items-center
        rounded-[var(--ai-radius-sm)]
        transition-all
        duration-200
      "
      style={{
        background: active
          ? "var(--ai-card)"
          : "transparent",
        boxShadow: active
          ? "var(--ai-shadow-sm)"
          : "none",
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-3
          rounded-[var(--ai-radius-sm)]
          px-3
          py-2.5
          text-left
          transition-all
          duration-200
        "
        style={{
          color: "var(--ai-ink)",
        }}
      >
        {/* Session icon */}

        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-[var(--ai-radius-xs)]
            text-[11px]
            font-medium
          "
          style={{
            background: active
              ? "var(--ai-ink)"
              : "var(--ai-card)",
            color: active
              ? "#ffffff"
              : "var(--ai-accent)",
            border: active
              ? "none"
              : "1px solid var(--ai-border)",
          }}
        >
          ✦
        </div>

        {/* Session information */}

        <div className="min-w-0 flex-1">
          <p
            className="
              truncate
              text-[11.5px]
              font-medium
            "
          >
            Travel conversation
          </p>

          <div
            className="
              mt-0.5
              flex
              items-center
              gap-1.5
              text-[9.5px]
            "
            style={{
              color: "var(--ai-muted)",
            }}
          >
            <span>
              {formatSessionDate(
                session.last_active
              )}
            </span>

            <span>·</span>

            <span>
              {formatSessionTime(
                session.last_active
              )}
            </span>
          </div>
        </div>
      </button>

      {/* Session actions */}

      <div
        className="
          absolute
          right-2
          flex
          items-center
          opacity-0
          transition-opacity
          duration-200
          group-hover:opacity-100
          group-focus-within:opacity-100
        "
      >
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete conversation"
          title="Delete conversation"
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            transition
            duration-200
            hover:bg-black/[0.05]
          "
          style={{
            color: "var(--ai-muted)",
          }}
        >
          <Trash2
            size={14}
            strokeWidth={1.8}
          />
        </button>

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
          "
          style={{
            color: "var(--ai-muted)",
          }}
        >
          <MoreHorizontal
            size={15}
            strokeWidth={1.8}
          />
        </span>
      </div>
    </div>
  );
}