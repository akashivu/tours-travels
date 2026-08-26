import {
  Loader2,
  Plus,
  Plane,
  MapPin,
} from "lucide-react";

import type { Session } from "../../../../types/ai";

import { ConversationItem } from "./ConversationItem";

interface ConversationHistoryProps {
  sessions: Session[];

  isLoading?: boolean;

  activeConversationId?: string;

  onNewChat?: () => void;

  onSelectConversation?: (
    conversation: Session
  ) => void;

  onDeleteConversation?: (
    conversation: Session
  ) => void;

  /*
   * Optional — lets the empty-state quick-start
   * prompts send a message directly, the same
   * way SuggestedTrips does on the main pane.
   */
  onSelectPrompt?: (prompt: string) => void;

  /*
   * Opens the website authentication popup.
   */
  onSignIn?: () => void;
}

const quickStarts = [
  {
    id: "weekend-trip",
    icon: MapPin,
    label: "Weekend trip from Bengaluru",
    prompt: "Plan a weekend trip from Bengaluru",
  },
  {
    id: "find-flights",
    icon: Plane,
    label: "Find flights to Delhi",
    prompt: "Find flights from Bengaluru to Delhi",
  },
  
];

export function ConversationHistory({
  sessions,
  isLoading = false,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onSelectPrompt,
  onSignIn,
}: ConversationHistoryProps) {
  return (
    <aside
      className="
        hidden
        h-full
        w-[250px]
        shrink-0
        flex-col
        border-r
        md:flex
      "
      style={{
        background: "var(--ai-card-soft)",
        borderColor: "var(--ai-border)",
      }}
    >
      {/* =====================================================
          NEW TRIP
      ====================================================== */}

      <div className="px-4 pb-3 pt-4">
        <button
          type="button"
          onClick={onNewChat}
          className="
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-[var(--ai-radius-pill)]
            text-[12px]
            font-medium
            transition-all
            duration-200
            hover:-translate-y-0.5
            active:translate-y-0
          "
          style={{
            background: "var(--ai-ink)",
            color: "#ffffff",
            boxShadow: "var(--ai-shadow-sm)",
          }}
        >
          <Plus size={15} strokeWidth={2} />
          New trip
        </button>
      </div>

      {/* =====================================================
          CONVERSATIONS / EMPTY STATE
      ====================================================== */}

      <div
        className="
          ai-scroll
          min-h-0
          flex-1
          overflow-y-auto
          px-3
          pb-4
        "
      >
        {isLoading ? (
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              py-8
              text-[11px]
            "
            style={{ color: "var(--ai-muted)" }}
          >
            <Loader2 size={14} className="animate-spin" />
            Loading conversations...
          </div>
        ) : sessions.length === 0 ? (
          <EmptyHistory onSelectPrompt={onSelectPrompt} />
        ) : (
          <section>
            <p
              className="
                mb-2
                px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
              "
              style={{ color: "var(--ai-muted)" }}
            >
              Conversations
            </p>

            <div className="space-y-0.5">
              {sessions.map((session) => (
                <ConversationItem
                  key={session.session_id}
                  session={session}
                  active={
                    session.session_id === activeConversationId
                  }
                  onClick={() =>
                    onSelectConversation?.(session)
                  }
                  onDelete={() =>
                    onDeleteConversation?.(session)
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================
          SIDEBAR FOOTER
      ====================================================== */}

      <SidebarFooter onSignIn={onSignIn} />
    </aside>
  );
}

/* =========================================================
   EMPTY HISTORY — quick-start prompts, not a dead centered
   state. Keeps the sidebar useful even with zero history.
========================================================= */

function EmptyHistory({
  onSelectPrompt,
}: {
  onSelectPrompt?: (prompt: string) => void;
}) {
  return (
    <div className="px-1 pt-2">
      <p
        className="
          mb-1
          px-3
          text-[10px]
          leading-4
        "
        style={{ color: "var(--ai-muted)" }}
      >
        Your trips will show up here.
      </p>

      <p
        className="
          mb-2
          mt-4
          px-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.16em]
        "
        style={{ color: "var(--ai-muted)" }}
      >
        Suggested
      </p>

      <div className="space-y-0.5">
        {quickStarts.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPrompt?.(item.prompt)}
              className="
                flex
                w-full
                items-center
                gap-2.5
                rounded-[var(--ai-radius-sm)]
                px-3
                py-2.5
                text-left
                transition-colors
                duration-150
                hover:bg-[var(--ai-card)]
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-[10px]
                "
                style={{
                  background: "var(--ai-card)",
                  color: "var(--ai-ink-soft)",
                  border: "1px solid var(--ai-border)",
                }}
              >
                <Icon size={13} strokeWidth={1.9} />
              </span>

              <span
                className="
                  text-[11.5px]
                  font-medium
                  leading-[1.35]
                "
                style={{ color: "var(--ai-ink)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR FOOTER
========================================================= */

function SidebarFooter({
  onSignIn,
}: {
  onSignIn?: () => void;
}) {
  return (
    <div
      className="shrink-0 border-t px-4 pb-4 pt-4"
      style={{
        borderColor: "var(--ai-border)",
      }}
    >
      {/* =====================================================
          SIGN IN CARD
      ====================================================== */}

      <div
        className="
          mb-4
          rounded-[var(--ai-radius-md)]
          border
          p-3.5
        "
        style={{
          background: "var(--ai-card)",
          borderColor: "var(--ai-border)",
        }}
      >
        <p
          className="text-[12.5px] font-medium"
          style={{ color: "var(--ai-ink)" }}
        >
          Save your trips
        </p>

        <p
          className="mt-1 text-[10.5px] leading-[1.5]"
          style={{ color: "var(--ai-ink-soft)" }}
        >
          Sign in to pick up where you left off, on any
          device.
        </p>

        <button
          type="button"
          onClick={onSignIn}
          className="
            mt-3
            h-[34px]
            w-full
            rounded-[var(--ai-radius-pill)]
            text-[11.5px]
            font-medium
            transition-all
            duration-200
            hover:-translate-y-0.5
          "
          style={{
            background: "var(--ai-ink)",
            color: "#ffffff",
          }}
        >
          Sign in
        </button>
      </div>

      {/* =====================================================
          BRAND
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2.5
          border-t
          pt-3.5
        "
        style={{ borderColor: "var(--ai-border)" }}
      >
        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-[9px]
            text-[12px]
            font-semibold
          "
          style={{
            background: "var(--ai-ink)",
            color: "#ffffff",
          }}
        >
          E
        </div>

        <div>
          <p
            className="text-[11px] font-semibold tracking-[-0.01em]"
            style={{ color: "var(--ai-ink)" }}
          >
            Elixway
          </p>

          <p
            className="mt-0.5 text-[9px]"
            style={{ color: "var(--ai-muted)" }}
          >
            AI travel Intelligence
          </p>
        </div>
      </div>

      {/* Legal links — quiet, secondary, not accent-colored */}

      <div
        className="mt-3 flex items-center gap-2 text-[9px]"
        style={{ color: "var(--ai-muted)" }}
      >
        <a
          href="/terms"
          className="transition-colors hover:text-[var(--ai-ink-soft)]"
        >
          Terms &amp; Conditions
        </a>

        <span aria-hidden="true" style={{ opacity: 0.5 }}>
          &middot;
        </span>

        <a
          href="/privacy"
          className="transition-colors hover:text-[var(--ai-ink-soft)]"
        >
          Privacy
        </a>
      </div>

      {/* Copyright */}

      <p
        className="mt-1.5 text-[8.5px]"
        style={{ color: "var(--ai-muted)", opacity: 0.75 }}
      >
        &copy; {new Date().getFullYear()} Elixway
      </p>
    </div>
  );
}