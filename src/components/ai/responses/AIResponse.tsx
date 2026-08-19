import ReactMarkdown from "react-markdown";

import { AIResponseIntro } from "./AIResponseIntro";
import { ItineraryDay } from "./ItineraryDay";
import { BudgetCard } from "./BudgetCard";
import { TravelInsights } from "./TravelInsights";
import { PlaceCards } from "./PlaceCards";
import { TripSummary } from "./TripSummary";

import type { ChatVisuals } from "../../../types/ai";

export interface TripSummaryData {
  destination: string;
  duration: string;
  nights?: string;
  route?: string;
  placesCount?: number;
  budget?: string;
  image?: string;
}

export interface ItineraryItem {
  time?: string;
  title: string;
  description?: string;
}

export interface PlaceData {
  id: string;
  name: string;
  location?: string;
  rating?: number;
  duration?: string;
  image?: string;
}

export interface ItineraryDayData {
  day: number;
  title: string;
  subtitle?: string;
  image?: string;
  items: ItineraryItem[];
  places?: PlaceData[];
}

export interface BudgetData {
  amount: string;
  description?: string;
}

export interface AIResponseData {
  intro?: string;
  tripSummary?: TripSummaryData;
  itinerary?: ItineraryDayData[];
  places?: PlaceData[];
  budget?: BudgetData;
  visuals?: ChatVisuals;
  actions?: {
    label: string;
    prompt: string;
  }[];
}

interface AIResponseProps {
  content: string;
  data?: AIResponseData;
  onAction?: (prompt: string) => void;
}

export function AIResponse({
  content,
  data,
}: AIResponseProps) {
  if (data) {
    // Keep the existing data model, but deliberately keep the response
    // content-first. Images are not used as the primary trip presentation.
    const places = data.places?.length
      ? data.places
      : (data.itinerary ?? []).flatMap(
          (day) => day.places ?? [],
        );

    const uniquePlaces = Array.from(
      new Map(places.map((place) => [place.id, place])).values(),
    );

    return (
      <div
        className="w-full"
        style={{
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* =================================================
            INTRO
        ================================================= */}
        {data.intro && (
          <AIResponseIntro>
            {data.intro}
          </AIResponseIntro>
        )}

        {/* =================================================
            ITINERARY — CONTENT FIRST
        ================================================= */}
        {data.itinerary && data.itinerary.length > 0 && (
          <section className="mt-8">
            <div className="mb-5">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "#8A8A84" }}
              >
                Your itinerary
              </p>

              <h2
                className="mt-1.5 text-[21px] font-semibold leading-[1.25] tracking-[-0.025em]"
                style={{ color: "#171717" }}
              >
                {data.itinerary.length} day
                {data.itinerary.length !== 1 ? "s" : ""} planned for you
              </h2>
            </div>

            <div className="space-y-8">
              {data.itinerary.map((day) => (
                <ItineraryDay
                  key={day.day}
                  data={day}
                />
              ))}
            </div>
          </section>
        )}

        {/* =================================================
            TRIP OVERVIEW — COMPACT, NO HERO IMAGE
        ================================================= */}
        {data.tripSummary && (
          <TripSummary data={data.tripSummary} />
        )}

        {/* =================================================
            TRAVEL INSIGHTS
        ================================================= */}
        <TravelInsights content={content} />

        {/* =================================================
            BUDGET
        ================================================= */}
        {data.budget && (
          <BudgetCard data={data.budget} />
        )}

        {/* =================================================
            PLACES — LAST, FIRST 2 ONLY
        ================================================= */}
        {uniquePlaces.length > 0 && (
          <PlaceCards places={uniquePlaces} />
        )}
      </div>
    );
  }

  /* =========================================================
     FALLBACK MARKDOWN
  ========================================================= */
  return (
    <div
      className="max-w-[760px] text-[15px] leading-[1.75]"
      style={{
        color: "#4F4F4A",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-4 last:mb-0">
              {children}
            </p>
          ),

          h1: ({ children }) => (
            <h1
              className="mb-4 mt-2 text-[21px] font-semibold leading-[1.3] tracking-[-0.025em]"
              style={{ color: "#171717" }}
            >
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2
              className="mb-3 mt-7 text-[18px] font-semibold leading-[1.35] tracking-[-0.02em]"
              style={{ color: "#171717" }}
            >
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3
              className="mb-2 mt-6 text-[15.5px] font-semibold leading-[1.4]"
              style={{ color: "#202020" }}
            >
              {children}
            </h3>
          ),

          ul: ({ children }) => (
            <ul className="mb-5 list-disc space-y-2 pl-6">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-5 list-decimal space-y-2 pl-6">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1">
              {children}
            </li>
          ),

          strong: ({ children }) => (
            <strong
              className="font-semibold"
              style={{ color: "#171717" }}
            >
              {children}
            </strong>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "#2563EB" }}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
