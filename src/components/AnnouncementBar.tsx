import { useEffect, useState, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  BadgeCheck,
  Zap,
  Headphones,
} from "lucide-react";

type AnnouncementBarProps = {
  expanded: boolean;
};

type Announcement = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
};

const MESSAGES: Announcement[] = [
  { icon: Sparkles, text: "India's Smartest AI-Powered Travel Platform" },
  { icon: Zap, text: "Ask Swiftov.ai — Your 24×7 Intelligent Travel Assistant" },
  { icon: MapPin, text: " Airport, Outstation & Local Rentals" },
  { icon: ShieldCheck, text: "Verified Drivers • Sanitized Vehicles • Zero Hidden Charges" },
  { icon: Clock, text: "Instant Booking Confirmation in Under 60 Seconds" },
  { icon: BadgeCheck, text: "Best Price Guarantee — Pay Exactly What You See" },
  { icon: Headphones, text: "Real-Time Trip Tracking & Round-the-Clock Support" },
];

const ROTATE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 400;

export default function AnnouncementBar({ expanded }: AnnouncementBarProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

    setVisible(false);
    fadeTimeoutRef.current = setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, FADE_DURATION_MS);
  }, []);

  const goNext = useCallback(() => {
    setIndex((current) => {
      goTo((current + 1) % MESSAGES.length);
      return current;
    });
  }, [goTo]);

  const goPrev = useCallback(() => {
    setIndex((current) => {
      goTo((current - 1 + MESSAGES.length) % MESSAGES.length);
      return current;
    });
  }, [goTo]);

 
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(goNext, ROTATE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, goNext]);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const CurrentIcon = MESSAGES[index].icon;

  return (
    <div
      role="region"
      aria-label="Announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`fixed top-14 right-0 left-0 h-11 z-30 border-b border-slate-200 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 transition-all duration-300 ${
        expanded ? "lg:left-64" : "lg:left-16"
      }`}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center gap-3 px-4">
        <button
          onClick={goPrev}
          aria-label="Previous announcement"
          className="hidden shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:flex"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <div
            className={`flex items-center gap-2 transition-opacity ease-in-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
          >
            <CurrentIcon className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
            <span className="truncate text-center text-sm font-medium text-slate-800">
              {MESSAGES[index].text}
            </span>
          </div>
        </div>

        <button
          onClick={goNext}
          aria-label="Next announcement"
          className="hidden shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      
      <div className="pointer-events-none absolute bottom-0.5 left-1/2 hidden -translate-x-1/2 gap-1 lg:flex">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-1 rounded-full transition-colors ${
              i === index ? "bg-indigo-500" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}