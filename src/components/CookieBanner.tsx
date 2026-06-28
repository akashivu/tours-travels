import { useEffect, useState } from "react";
import { initAnalytics, disableAnalytics } from "../utils/analytics";
import {
  COOKIE_EVENT,
  COOKIE_STORAGE_KEY,
} from "../utils/cookie";
import { Link } from "react-router-dom";
import { X, Settings2 } from "lucide-react";

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
};

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_STORAGE_KEY);

    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        const parsed: CookiePreferences = JSON.parse(saved);
        setPreferences(parsed);
        if (parsed.analytics) {
          initAnalytics();
        } else {
          disableAnalytics();
        }
      } catch {
        setIsVisible(true);
      }
    }

    const handler = () => {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as CookiePreferences;
          setPreferences(parsed);
        } catch {
          setPreferences(defaultPreferences);
        }
      }
      setIsVisible(true);
      setShowPreferences(true);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPreferences(false);
      }
    };

    window.addEventListener(COOKIE_EVENT, handler);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(COOKIE_EVENT, handler);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPreferences ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreferences]);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    if (prefs.analytics) {
      initAnalytics();
    } else {
      disableAnalytics();
    }
    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const acceptAll = () => savePreferences({ essential: true, analytics: true });
  const rejectOptional = () => savePreferences({ essential: true, analytics: false });

  if (!isVisible) return null;

  return (
    <>
      {/* ── Floating banner card — gap from bottom, left/right margins, rounded ── */}
      <div className="fixed bottom-4 left-4 right-4 z-[9999] sm:bottom-5 sm:left-6 sm:right-6 md:left-10 md:right-10 lg:left-16 lg:right-16">
        <div
          className="relative overflow-hidden rounded-2xl bg-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
          style={{ border: "1px solid rgba(0,0,0,0.07)" }}
        >
          {/* Top highlight bar */}
          <div className="h-[3px] w-full bg-neutral-200" />

          {/* Content */}
          <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-4">

            {/* Text */}
            <p className="flex-1 text-[12.5px] text-neutral-500 leading-relaxed">
              We use essential cookies to keep the site working and, with your consent, analytics to improve it.{" "}
              <Link
                to="/privacy-policy"
                className="text-neutral-700 underline underline-offset-2 hover:text-neutral-950 transition-colors"
              >
                Privacy Policy
              </Link>
              {" · "}
              <Link
                to="/cookie-policy"
                className="text-neutral-700 underline underline-offset-2 hover:text-neutral-950 transition-colors"
              >
                Cookie Policy
              </Link>
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => { setIsVisible(true); setShowPreferences(true); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 text-[12px] font-medium text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 transition-colors"
              >
                <Settings2 size={12} strokeWidth={1.75} />
                Manage
              </button>

              <button
                onClick={rejectOptional}
                className="px-3 py-2 rounded-xl border border-neutral-200 text-[12px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-800 transition-colors"
              >
                Decline
              </button>

              <button
                onClick={acceptAll}
                className="px-5 py-2 rounded-xl bg-neutral-950 text-[12px] font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Accept all
              </button>

              <button
                onClick={rejectOptional}
                title="Dismiss"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X size={13} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Preferences modal ── */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            {/* Top accent */}
            <div className="h-[3px] w-full bg-neutral-200" />

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-100">
              <div>
                <h2 id="cookie-modal-title" className="text-[14px] font-semibold text-neutral-900">
                  Cookie Preferences
                </h2>
                <p className="text-[12px] text-neutral-400 mt-0.5">
                  Choose what you allow us to store.
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                <X size={15} strokeWidth={1.75} />
              </button>
            </div>

            {/* Cookie rows */}
            <div className="px-6 py-4 space-y-3">
              {/* Essential */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <p className="text-[13px] font-medium text-neutral-800">Essential</p>
                  <p className="text-[11.5px] text-neutral-400 mt-0.5">Required for security and bookings. Always on.</p>
                </div>
                <span className="text-[11px] font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
                  Always on
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <label htmlFor="analytics-cookie" className="text-[13px] font-medium text-neutral-800 cursor-pointer">
                    Analytics
                  </label>
                  <p className="text-[11.5px] text-neutral-400 mt-0.5">Helps us improve using Microsoft Clarity.</p>
                </div>
                <button
                  id="analytics-cookie"
                  role="switch"
                  aria-checked={preferences.analytics}
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                    preferences.analytics ? "bg-neutral-950" : "bg-neutral-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                      preferences.analytics ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Policy note */}
            <p className="px-6 pb-4 text-[11px] text-neutral-400 leading-relaxed">
              By saving, you agree to our{" "}
              <a href="/privacy-policy" className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/cookie-policy" className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900">
                Cookie Policy
              </a>.
            </p>

            {/* Modal actions */}
            <div className="flex gap-2 px-6 pb-5">
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => savePreferences(preferences)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-950 text-[13px] font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}