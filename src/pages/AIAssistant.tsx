import { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Car,
  Route,
  Building2,
  ArrowUp,
  Compass,
  Clock,
  ShieldCheck,
  Zap,
  Hotel,
  X,
  History,
} from "lucide-react";
import { AIMessageList } from "../components/ai/AIMessageList";
import { AIThemeStyles } from "../components/ai/AITheme";
import { AIChatSidebar } from "../components/ai/AIChatSidebar";
import { useAIChat } from "../hooks/useAIChat";

const EXAMPLES = [
  { icon: MapPin, text: "Plan a weekend trip to Goa" },
  { icon: Car, text: "Find cabs near me right now" },
  { icon: Route, text: "Compare fares for an outstation trip" },
  { icon: Building2, text: "Suggest budget hotels near the airport" },
];

const CAPABILITIES = [
  { icon: Compass, title: "Smart trip planning", detail: "Full itineraries built around your dates and budget." },
  { icon: Route, title: "Route optimization", detail: "The fastest, most sensible path between your stops." },
  { icon: Zap, title: "Fare estimation", detail: "Realistic pricing before you commit to a ride." },
  { icon: Hotel, title: "Hotel recommendations", detail: "Stays matched to your route and price range." },
  { icon: Car, title: "Booking support", detail: "Rides and reservations, confirmed in the conversation." },
];

const TRUST_POINTS = [
  { icon: Clock, label: "Available 24×7" },
  { icon: Zap, label: "Fast, direct responses" },
  { icon: ShieldCheck, label: "Private by design" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Brand({
  compact = false,
  onHistoryClick,
}: {
  compact?: boolean;
  onHistoryClick?: () => void;
}) {
  const size = compact ? 28 : 34;
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center rounded-[10px] shrink-0"
          style={{ width: size, height: size, background: "var(--ink)" }}
        >
          <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
            <path d="M6 18C6 12 18 12 18 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="18" cy="6" r="1.8" fill="var(--signal)" />
          </svg>
        </span>
        <div className="flex flex-col leading-none">
          <span
            className="ai-serif"
            style={{ fontWeight: 600, fontSize: compact ? 16 : 19, color: "var(--ink)", letterSpacing: "-0.01em" }}
          >
            Swiftov
          </span>
          {!compact && (
            <span className="mt-1 text-[11px] font-medium" style={{ color: "var(--muted)" }}>
              AI trip &amp; ride assistant
            </span>
          )}
        </div>
      </div>

      {onHistoryClick && (
        <button
          onClick={onHistoryClick}
          aria-label="Chat history"
          className="ai-no-native-focus flex items-center justify-center rounded-full shrink-0"
          style={{
            width: compact ? 32 : 34,
            height: compact ? 32 : 34,
            background: "var(--mist)",
            border: "1px solid var(--line)",
          }}
        >
          <History size={14} strokeWidth={2} style={{ color: "var(--ink)" }} />
        </button>
      )}
    </div>
  );
}

/** Left column: brand, capabilities, trust — always mounted, never unmounts when chat starts. */
function LeftPanel({
  hiddenOnMobile,
  onHistoryClick,
}: {
  hiddenOnMobile: boolean;
  onHistoryClick: () => void;
}) {
  return (
    <aside
      className={`relative shrink-0 w-full lg:w-[400px] px-7 pt-7 pb-5 lg:py-11 lg:px-9 flex-col overflow-y-auto ai-scroll ${
        hiddenOnMobile ? "hidden lg:flex" : "flex"
      }`}
      style={{ background: "var(--mist)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="lg:border-r lg:pr-9 flex flex-col h-full" style={{ borderColor: "var(--line)" }}>
        <div className="ai-fade-up" style={{ animationDelay: "30ms" }}>
          <Brand onHistoryClick={onHistoryClick} />
        </div>

        <div className="mt-10 hidden lg:flex flex-col flex-1">
          <span
            className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1 ai-fade-up"
            style={{ color: "var(--muted)", animationDelay: "80ms" }}
          >
            What Swiftov AI can do
          </span>
          <p className="text-[12.5px] leading-relaxed mb-6 ai-fade-up" style={{ color: "var(--ink-soft)", animationDelay: "110ms" }}>
            One assistant for the whole trip — from the first idea to the ride that gets you there.
          </p>

          <div className="relative flex flex-col">
            <span
              className="absolute top-2 bottom-2 left-[15px] w-px"
              style={{ background: "var(--line-strong)" }}
              aria-hidden="true"
            />
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="ai-cap-row relative flex items-start gap-3.5 rounded-xl px-2 py-2.5 ai-fade-up"
                  style={{ animationDelay: `${150 + i * 70}ms` }}
                >
                  <span
                    className="relative z-10 flex items-center justify-center rounded-full shrink-0"
                    style={{ width: 30, height: 30, background: "var(--paper)", border: "1px solid var(--line)" }}
                  >
                    <Icon size={13} strokeWidth={1.9} style={{ color: "var(--ink)" }} />
                  </span>
                  <div className="pt-0.5">
                    <div className="text-[13px] font-semibold" style={{ color: "var(--ink)" }}>
                      {cap.title}
                    </div>
                    <div className="text-[11.5px] leading-relaxed mt-0.5" style={{ color: "var(--muted)" }}>
                      {cap.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 ai-fade-up" style={{ borderTop: "1px solid var(--line)", animationDelay: "520ms" }}>
            {TRUST_POINTS.map((t) => {
              const Icon = t.icon;
              return (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium"
                  style={{ background: "var(--paper)", border: "1px solid var(--line)", color: "var(--ink-soft)" }}
                >
                  <Icon size={11} strokeWidth={2} style={{ color: "var(--signal-ink)" }} />
                  {t.label}
                </span>
              );
            })}
          </div>

          <p className="mt-auto pt-8 text-[10.5px]" style={{ color: "var(--muted)" }}>
            Swiftov AI is a planning assistant. Bookings are always confirmed with you before they're made.
          </p>
        </div>

        <div className="flex lg:hidden gap-4 mt-6 overflow-x-auto pb-1">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="flex items-center gap-2 shrink-0">
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 26, height: 26, background: "var(--paper)", border: "1px solid var(--line)" }}
                >
                  <Icon size={12} strokeWidth={2} style={{ color: "var(--ink)" }} />
                </span>
                <span className="text-[12px] font-medium whitespace-nowrap" style={{ color: "var(--ink)" }}>
                  {cap.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default function AIAssistant() {
  const {
    state,
    sessionsState,
    sendMessage,
    startNewChat,
    loadConversation,
    deleteConversation,
  } = useAIChat();

  const [draft, setDraft] = useState("");
  const started = state.messages.length > 0;
  const greeting = useMemo(getGreeting, []);

  // Mobile-only UI toggle: lets the header close button hand the screen
  // back to the left panel without touching chat/session business logic.
  const [mobileChatFocused, setMobileChatFocused] = useState(false);
  useEffect(() => {
    if (started) setMobileChatFocused(true);
  }, [started]);

  // History drawer — UI-only toggle, overlays on top of everything.
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleSend = (text?: string) => {
    const value = (text ?? draft).trim();
    if (!value) return;
    sendMessage(value);
    setDraft("");
  };

  const handleMobileClose = () => {
    // UI-only: return the mobile viewport to the left panel.
    // Session/message state is left completely untouched.
    setMobileChatFocused(false);
  };

  const handleSelectSession = (sessionId: string) => {
    loadConversation(sessionId);
    setHistoryOpen(false);
  };

  const handleNewChat = () => {
    startNewChat();
    setHistoryOpen(false);
  };

  const extraStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

      .ai-page-input {
        transition: border-color 160ms ease, box-shadow 160ms ease;
      }
      .ai-page-input:focus-within {
        border-color: var(--line-strong) !important;
        box-shadow: var(--shadow-sm) !important;
        outline: none;
      }
      .ai-page-send {
        transition: background-color 160ms ease, transform 120ms ease;
      }
      .ai-page-send:active:not(:disabled) { transform: scale(0.94); }

      .ai-cap-row { transition: background-color 160ms ease; }
      .ai-cap-row:hover { background: var(--mist); }

      .ai-example:hover {
        border-color: var(--line-strong) !important;
        box-shadow: var(--shadow-sm);
      }
      .ai-example:hover .ai-example-arrow {
        color: var(--signal-ink) !important;
        transform: translate(1.5px, -1.5px);
      }
      .ai-example-arrow { transition: transform 160ms ease, color 160ms ease; }

      .ai-root textarea, .ai-root input, .ai-root button { outline: none; }
      .ai-root textarea:focus, .ai-root input:focus { outline: none; box-shadow: none; }
      .ai-no-native-focus:focus, .ai-no-native-focus:focus-visible { outline: none; }
      .ai-root button.ai-no-native-focus:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--paper), 0 0 0 4px var(--line-strong);
        border-radius: 9999px;
      }
      .ai-root *, .ai-root *:focus, .ai-root *:focus-visible {
        -webkit-tap-highlight-color: transparent;
      }

      /* Hero -> chat: the SAME right panel morphs. No new container is ever mounted. */
      .ai-hero-block {
        transition: max-height 420ms cubic-bezier(0.16,1,0.3,1),
                    opacity 280ms ease,
                    margin 420ms cubic-bezier(0.16,1,0.3,1);
        overflow: hidden;
      }
      .ai-hero-block--collapsed {
        max-height: 0px;
        opacity: 0;
        margin-bottom: 0 !important;
        pointer-events: none;
      }
      .ai-hero-block--expanded {
        max-height: 640px;
        opacity: 1;
      }

      .ai-messages-region {
        transition: opacity 280ms ease 80ms;
      }

      .ai-right-panel {
        transition: justify-content 300ms ease;
      }

      /* History drawer */
      .ai-history-backdrop {
        transition: opacity 220ms ease;
      }
      .ai-history-drawer {
        transition: transform 260ms cubic-bezier(0.16,1,0.3,1);
      }

      @media (prefers-reduced-motion: reduce) {
        .ai-hero-block, .ai-messages-region, .ai-history-backdrop, .ai-history-drawer { transition: none; }
      }
    `}</style>
  );

  const canSend = draft.trim().length > 0;

  return (
    <div
      className="ai-root h-[90vh] w-full max-w-full overflow-hidden flex flex-col lg:flex-row relative"
      style={{ background: "var(--paper)" }}
    >
      <AIThemeStyles />
      {extraStyles}

      <LeftPanel
        hiddenOnMobile={started && mobileChatFocused}
        onHistoryClick={() => setHistoryOpen(true)}
      />

      <main
        className={`relative flex-1 min-h-0 flex flex-col ${
          started && mobileChatFocused ? "flex" : started ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Mobile-only header with a close affordance back to the left panel */}
        {started && (
          <div
            className="flex lg:hidden items-center justify-between px-4 py-3 shrink-0 gap-2"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <Brand compact onHistoryClick={() => setHistoryOpen(true)} />
            <button
              onClick={handleMobileClose}
              aria-label="Back"
              className="ai-no-native-focus flex items-center justify-center rounded-full shrink-0"
              style={{ width: 32, height: 32, background: "var(--mist)" }}
            >
              <X size={15} strokeWidth={2} style={{ color: "var(--ink)" }} />
            </button>
          </div>
        )}

        {/* The one and only right-panel surface. It never unmounts, never becomes a popup. */}
        <div
          className={`ai-right-panel relative flex-1 min-h-0 flex flex-col px-6 ${
            started ? "justify-start pt-8" : "justify-center py-10"
          } overflow-hidden`}
        >
          <div className="relative z-10 w-full max-w-[560px] mx-auto flex flex-col flex-1 min-h-0">
            {/* Hero heading — fades/collapses away, never unmounted mid-shrink so it feels continuous */}
            <div
              className={`ai-hero-block shrink-0 ${started ? "ai-hero-block--collapsed" : "ai-hero-block--expanded mb-8"}`}
            >
              <h1
                className="ai-serif text-center text-[24px] sm:text-[28px] leading-[1.3]"
                style={{ fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}
              >
                {greeting}. Where are we headed today?
              </h1>
            </div>

            {/* Conversation — appears above the input, grows to fill available space */}
            {started && (
              <div className="ai-messages-region flex-1 min-h-0 -mx-2">
                <AIMessageList messages={state.messages} isLoading={state.isLoading} error={state.error} />
              </div>
            )}

            {/* The permanent command bar — same element before and after the first message */}
            <div className={`w-full shrink-0 ${started ? "mt-2" : ""}`}>
              <div
                className="ai-page-input rounded-[22px]"
                style={{ background: "var(--paper)", border: "1px solid var(--line-strong)", boxShadow: "var(--shadow-sm)" }}
              >
                <div className="px-5 pt-4">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={started ? 1 : 2}
                    disabled={state.isLoading}
                    placeholder="Ask about routes, fares, or plan a trip…"
                    className="ai-no-native-focus w-full resize-none border-none outline-none text-[14.5px] leading-relaxed bg-transparent disabled:opacity-60"
                    style={{ color: "var(--ink)" }}
                  />
                </div>
                <div className="flex items-center justify-between px-4 pb-3.5 pt-2">
                  <span className="text-[11px] hidden sm:block" style={{ color: "var(--muted)" }}>
                    Press <strong style={{ color: "var(--ink-soft)" }}>Enter</strong> to send
                  </span>
                  <button
                    onClick={() => handleSend()}
                    disabled={!canSend || state.isLoading}
                    aria-label="Send"
                    className="ai-page-send ai-no-native-focus ml-auto w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: canSend ? "var(--ink)" : "var(--mist-strong)",
                      color: canSend ? "#fff" : "var(--muted)",
                      cursor: canSend ? "pointer" : "not-allowed",
                    }}
                  >
                    <ArrowUp size={15} strokeWidth={2.3} />
                  </button>
                </div>
              </div>
            </div>

            {/* Example prompts — fade/collapse the same way the heading does */}
            <div
              className={`ai-hero-block shrink-0 ${
                started ? "ai-hero-block--collapsed" : "ai-hero-block--expanded mt-6"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXAMPLES.map((ex, i) => {
                  const Icon = ex.icon;
                  return (
                    <button
                      key={ex.text}
                      onClick={() => handleSend(ex.text)}
                      className="ai-example ai-no-native-focus ai-fade-up flex items-center gap-3 rounded-xl p-3 text-left transition-colors"
                      style={{ background: "var(--paper)", border: "1px solid var(--line)", animationDelay: `${240 + i * 60}ms` }}
                    >
                      <span
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{ width: 28, height: 28, background: "var(--mist)" }}
                      >
                        <Icon size={13} strokeWidth={1.9} style={{ color: "var(--ink)" }} />
                      </span>
                      <span className="flex-1 text-[12.5px] font-medium leading-snug" style={{ color: "var(--ink-soft)" }}>
                        {ex.text}
                      </span>
                      <ArrowUp
                        size={12}
                        strokeWidth={2}
                        className="ai-example-arrow shrink-0 rotate-45"
                        style={{ color: "var(--muted)" }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-[10.5px] mt-4 shrink-0" style={{ color: "var(--muted)" }}>
              Powered by Swiftov
            </p>
          </div>
        </div>
      </main>

      {/* History drawer — overlays both panels, closes on backdrop click or session select */}
      {historyOpen && (
        <>
          <div
            className="ai-history-backdrop fixed inset-0 z-40"
            style={{ background: "rgba(15, 15, 15, 0.35)" }}
            onClick={() => setHistoryOpen(false)}
          />
          <div
            className="ai-history-drawer fixed top-0 left-0 h-full w-[280px] z-50 shadow-xl"
            style={{ background: "var(--paper)", borderRight: "1px solid var(--line)" }}
          >
            <div
              className="flex items-center justify-between px-3.5 py-3"
              style={{ borderBottom: "1px solid var(--line)" }}
            >
              <span
                className="text-[11px] tracking-[0.16em] uppercase font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Chats
              </span>
              <button
                onClick={() => setHistoryOpen(false)}
                aria-label="Close history"
                className="ai-no-native-focus flex items-center justify-center rounded-full"
                style={{ width: 26, height: 26, background: "var(--mist)" }}
              >
                <X size={13} strokeWidth={2} style={{ color: "var(--ink)" }} />
              </button>
            </div>
            <div className="h-[calc(100%-49px)]">
             <AIChatSidebar
  sessions={sessionsState.sessions}
  currentSessionId={state.sessionId}
  isLoading={sessionsState.isLoadingSessions}
  onSelect={handleSelectSession}
  onDelete={deleteConversation}
  onNewChat={handleNewChat}
/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}