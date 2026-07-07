import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";

/**
 * Delayed AI-assistant nudge — shows after `delayMs`, bottom-right.
 * Dismisses permanently for `hideForDays` once closed or acted on.
 *
 * Usage: drop <PromoNotification /> once near the top of app/layout.tsx
 * (or on Home, if you only want it on the landing page).
 *
 * Wiring to your chat widget:
 * - If your chat widget exposes a global open function (e.g. window.openChat,
 *   or a hook from your chat provider), pass it in via onCtaClick.
 * - If you don't have that yet, leave onCtaClick unset — the default
 *   dispatches an "open-ai-chat" window event, so your chat widget can just
 *   add: window.addEventListener("open-ai-chat", () => setChatOpen(true))
 *   whenever it's ready, and this component doesn't need to change.
 */

const STORAGE_KEY = "ai-promo-dismissed-at";

type PromoNotificationProps = {
  delayMs?: number; // how long to wait before showing
  hideForDays?: number; // how long to stay hidden after dismissal
  title?: string;
  message?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export default function PromoNotification({
  delayMs = 4000,
  hideForDays = 1,
  title = "Trip Assistant",
  message = "Tell me where you're headed and I'll match you with the right vehicle and rates.",
  ctaLabel = "Start chat",
  onCtaClick,
}: PromoNotificationProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const hoursSince = (Date.now() - Number(dismissedAt)) / 36e5;
      if (hoursSince < hideForDays * 24) return; // still within cooldown
    }

    const timer = setTimeout(() => {
      setMounted(true);
      // mount off-screen first, then flip visible on next tick for a slide-in transition
      requestAnimationFrame(() => setVisible(true));
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs, hideForDays]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setTimeout(() => setMounted(false), 300); // wait for exit transition
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default: fire a global event your chat widget can listen for.
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
    dismiss();
  };

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 w-[340px] max-w-[92vw] transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-3 opacity-0 scale-[0.98]"
      }`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]">
        {/* Header strip */}
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-3.5">
          <div className="relative shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <MessageCircle size={17} className="text-white" strokeWidth={2} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-emerald-600 bg-lime-400" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold leading-tight text-white">{title}</p>
            <p className="text-[11.5px] leading-tight text-teal-50/90">Online now</p>
          </div>

          <button
            onClick={dismiss}
            aria-label="Dismiss notification"
            className="ml-auto shrink-0 rounded-full p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3.5">
          <p className="text-[13.5px] leading-relaxed text-slate-600">{message}</p>

          <button
            onClick={handleCtaClick}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-slate-800"
          >
            <MessageCircle size={15} strokeWidth={2} />
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}