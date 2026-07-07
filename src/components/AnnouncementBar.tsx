import { useEffect, useState, useCallback, useRef } from "react";

type AnnouncementBarProps = {
  expanded: boolean;
};

const MESSAGES = [
  " Travel Smarter with AdiyogiCabz",
  " Ask Swiftov.ai for Instant Travel Assistance",
  " Airport • Outstation • Local Rentals",
  "✓ Professional Drivers • Clean Vehicles • Transparent Pricing",
  "Instant Booking Confirmation • 24×7 Customer Support",
];

const ROTATE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 500;

export default function AnnouncementBar({ expanded }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const changeIndex = useCallback((next: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, FADE_DURATION_MS);
  }, []);

  const goNext = useCallback(() => {
    changeIndex((index + 1) % MESSAGES.length);
  }, [index, changeIndex]);

  const goPrev = useCallback(() => {
    changeIndex((index - 1 + MESSAGES.length) % MESSAGES.length);
  }, [index, changeIndex]);

  // Auto rotation
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
      setVisible(false);
      window.setTimeout(() => setVisible(true), 10);
    }, ROTATE_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed top-14 right-0 h-11 bg-white border-b border-slate-200 z-30 transition-all duration-300 ${
        expanded ? "lg:left-64" : "lg:left-16"
      } left-0`}
    >
      <div className="h-full px-4 flex items-center justify-center gap-4 max-w-full">
        {/* Desktop: prev */}
        <button
          onClick={goPrev}
          aria-label="Previous announcement"
          className="hidden lg:block text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
        >
          Prev
        </button>

        {/* Message */}
        <span
          className={`text-sm font-medium text-slate-900 text-center truncate transition-opacity ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
        >
          {MESSAGES[index]}
        </span>

        {/* Desktop: next */}
        <button
          onClick={goNext}
          aria-label="Next announcement"
          className="hidden lg:block text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}