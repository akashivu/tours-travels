import { Fragment } from "react";

import type {
  ChatVisuals,
  Message,
} from "../../types/ai";

import {
  AIResponse,
  type AIResponseData,
  type ItineraryDayData,
  type ItineraryItem,
  type PlaceData,
} from "./responses/AIResponse";

interface Props {
  message: Message;
}

/* =========================================================
   TIME
========================================================= */

function formatTime(
  timestamp?: string | Date,
) {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}

/* =========================================================
   LIGHTWEIGHT MARKDOWN
========================================================= */

function renderInlineBold(
  text: string,
  keyPrefix: string,
) {
  const parts = text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean);

  return parts.map(
    (part, index) => {
      const match =
        part.match(
          /^\*\*([^*]+)\*\*$/,
        );

      if (match) {
        return (
          <strong
            key={`${keyPrefix}-${index}`}
            className="font-semibold"
          >
            {match[1]}
          </strong>
        );
      }

      return (
        <Fragment
          key={`${keyPrefix}-${index}`}
        >
          {part}
        </Fragment>
      );
    },
  );
}

function renderContent(
  content: string,
) {
  const lines =
    content.split("\n");

  return lines.map(
    (line, index) => {
      const trimmed =
        line.trim();

      const isHeadingLine =
        /^\*\*[^*]+\*\*$/.test(
          trimmed,
        ) &&
        trimmed.length > 4;

      if (isHeadingLine) {
        const headingText =
          trimmed.slice(2, -2);

        return (
          <p
            key={index}
            className="
              mb-1.5
              mt-3
              text-[16px]
              font-semibold
              leading-[1.4]
              first:mt-0
            "
          >
            {headingText}
          </p>
        );
      }

      if (!trimmed) {
        return (
          <br key={index} />
        );
      }

      return (
        <span
          key={index}
          className="block"
        >
          {renderInlineBold(
            line,
            `l${index}`,
          )}
        </span>
      );
    },
  );
}

/* =========================================================
   CLEAN MARKDOWN
========================================================= */

function cleanMarkdownText(
  text: string,
) {
  return text
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/^[-*]\s*/, "")
    .trim();
}

/* =========================================================
   EXTRACT DAY SECTION
========================================================= */

function extractDaySection(
  content: string,
  dayNumber: number,
) {
  const lines =
    content.split("\n");

  const startIndex =
    lines.findIndex(
      (line) =>
        new RegExp(
          `^##\\s*Day\\s*${dayNumber}\\s*:`,
          "i",
        ).test(
          line.trim(),
        ),
    );

  if (startIndex === -1) {
    return "";
  }

  const sectionLines: string[] =
    [];

  for (
    let index =
      startIndex + 1;
    index < lines.length;
    index += 1
  ) {
    const line =
      lines[index];

    /*
     * Stop at next day.
     */
    if (
      new RegExp(
        `^##\\s*Day\\s*${dayNumber + 1}\\s*:`,
        "i",
      ).test(
        line.trim(),
      )
    ) {
      break;
    }

    /*
     * Stop at global sections.
     */
    if (
      /^#{2,3}\s*(Approximate Budget|Budget|Summary)/i.test(
        line.trim(),
      )
    ) {
      break;
    }

    sectionLines.push(
      line,
    );
  }

  return sectionLines.join(
    "\n",
  );
}

/* =========================================================
   BUILD DAY ITEMS
========================================================= */

function buildDayItems(
  content: string,
  dayNumber: number,
): ItineraryItem[] {
  const section =
    extractDaySection(
      content,
      dayNumber,
    );

  if (!section) {
    return [];
  }

  const lines =
    section.split("\n");

  const items: ItineraryItem[] =
    [];

  let currentCategory:
    | string
    | undefined;

  for (const rawLine of lines) {
    const line =
      rawLine.trim();

    if (!line) {
      continue;
    }

    /*
     * Food Recommendations:
     * Local Tips:
     */
    const categoryMatch =
      line.match(
        /^###\s*(.+?)\s*:?\s*$/i,
      );

    if (categoryMatch) {
      currentCategory =
        cleanMarkdownText(
          categoryMatch[1],
        );

      continue;
    }

    /*
     * Ignore headings.
     */
    if (
      /^#{1,3}\s*Day\s*\d+/i.test(
        line,
      )
    ) {
      continue;
    }

    /*
     * Only process bullets.
     */
    if (
      !line.startsWith("-") &&
      !line.startsWith("*")
    ) {
      continue;
    }

    const text =
      cleanMarkdownText(line);

    if (!text) {
      continue;
    }

    /*
     * Main itinerary item.
     *
     * Morning:
     * Afternoon:
     * Evening:
     * Night:
     */
    const timeMatch =
      text.match(
        /^(Morning|Afternoon|Evening|Night)\s*:\s*(.*)$/i,
      );

    if (timeMatch) {
      items.push({
        time:
          timeMatch[1],
        title:
          timeMatch[2].trim(),
      });

      continue;
    }

    /*
     * Food / Local Tips.
     */
    if (currentCategory) {
      items.push({
        title:
          currentCategory,
        description:
          text,
      });

      continue;
    }

    /*
     * Generic itinerary item.
     */
    items.push({
      title: text,
    });
  }

  return items;
}

/* =========================================================
   CONVERT GOOGLE VISUAL PLACES
========================================================= */

function convertPlaces(
  day: NonNullable<
    ChatVisuals["days"]
  >[number],
): PlaceData[] {
  return (
    day.places?.map(
      (
        place,
        index,
      ): PlaceData => ({
        id:
          place.place_id ??
          `${day.day}-${index}-${place.name}`,

        name:
          place.name,

        location:
          place.address ??
          undefined,

        image:
          place.image_url ??
          undefined,
      }),
    ) ?? []
  );
}

/* =========================================================
   EXTRACT BUDGET

   Handles formats such as:

   ### Approximate Budget:
   - Water sports: ₹2500
   - Lunch and dinner: ₹1500
   - Shopping: ₹1000

   AND:

   ### Approximate Budget – Water sports: ₹2500
   Lunch and dinner: ₹1500
   Shopping: ₹1000

   AND:

   ### Approximate Budget
   Total: ₹5000
========================================================= */

function extractBudget(
  content: string,
) {
  /*
   * Find the budget heading.
   */
  const startMatch =
    content.match(
      /^#{2,3}\s*Approximate\s+Budget\b[^\n]*$/im,
    );

  if (!startMatch) {
    return undefined;
  }

  const startIndex =
    startMatch.index ?? -1;

  if (startIndex === -1) {
    return undefined;
  }

  /*
   * Get heading itself.
   */
  const headingEnd =
    content.indexOf(
      "\n",
      startIndex,
    );

  const headingLine =
    headingEnd === -1
      ? content.slice(
          startIndex,
        )
      : content.slice(
          startIndex,
          headingEnd,
        );

  /*
   * Everything after heading.
   */
  const bodyStart =
    headingEnd === -1
      ? content.length
      : headingEnd + 1;

  const remaining =
    content.slice(
      bodyStart,
    );

  /*
   * Stop at the next ## / ### section.
   */
  const nextSection =
    remaining.match(
      /^#{2,3}\s+/m,
    );

  const body =
    nextSection?.index !==
    undefined
      ? remaining.slice(
          0,
          nextSection.index,
        )
      : remaining;

  /*
   * Budget text that may already
   * exist on the heading line.
   *
   * Example:
   * ### Approximate Budget – Water sports: ₹2500
   */
  const headingContent =
    headingLine
      .replace(
        /^#{2,3}\s*Approximate\s+Budget\s*[:\-–—]?\s*/i,
        "",
      )
      .trim();

  /*
   * Clean body.
   */
  const bodyContent =
    body
      .replace(/\*\*/g, "")
      .trim();

  const section =
    [
      headingContent,
      bodyContent,
    ]
      .filter(Boolean)
      .join("\n")
      .trim();

  if (!section) {
    return undefined;
  }

  /*
   * Find all currency values.
   *
   * ₹2500
   * ₹2,500
   * ₹ 2,500
   * $1200
   * €900
   * £800
   * INR 2500
   */
  const currencyMatches =
    section.match(
      /(?:₹|\$|€|£)\s?[\d,]+(?:\.\d+)?|\bINR\s?[\d,]+(?:\.\d+)?/gi,
    ) ?? [];

  /*
   * Convert amounts to numbers.
   */
  const numericAmounts =
    currencyMatches
      .map((value) =>
        Number(
          value
            .replace(
              /[^\d.]/g,
              "",
            ),
        ),
      )
      .filter(
        (value) =>
          Number.isFinite(
            value,
          ),
      );

  /*
   * Try to find an explicit total first.
   */
  const totalMatch =
    section.match(
      /(?:total|estimated\s+total|trip\s+total|overall)\s*[:\-–—]?\s*((?:₹|\$|€|£)\s?[\d,]+(?:\.\d+)?|\bINR\s?[\d,]+(?:\.\d+)?)/i,
    );

  let amount = "";

  if (totalMatch?.[1]) {
    amount =
      totalMatch[1].trim();
  } else if (
    numericAmounts.length > 0
  ) {
    /*
     * If there is no explicit total,
     * sum the listed budget items.
     */
    const total =
      numericAmounts.reduce(
        (
          sum,
          value,
        ) => sum + value,
        0,
      );

    /*
     * Preserve the currency from
     * the first amount.
     */
    const firstCurrency =
      currencyMatches[0]?.match(
        /₹|\$|€|£|INR/i,
      )?.[0] ?? "₹";

    amount =
      `${firstCurrency}${total.toLocaleString(
        "en-IN",
      )}`;
  } else {
    amount = "Estimated";
  }

  /*
   * Clean individual budget lines.
   */
  const description =
    section
      .split("\n")
      .map(
        (line) =>
          line
            .replace(
              /^[-*]\s*/,
              "",
            )
            .replace(
              /\*\*/g,
              "",
            )
            .trim(),
      )
      .filter(Boolean)
      .join("\n");

  return {
    amount,
    description,
  };
}

/* =========================================================
   EXTRACT FOLLOW-UP SUGGESTIONS
========================================================= */

function extractActions(
  content: string,
) {
  /*
   * Only add itinerary suggestions
   * to actual itinerary responses.
   */
  const isItinerary =
    /^##\s*Day\s*1\s*:/im.test(
      content,
    );

  if (!isItinerary) {
    return undefined;
  }

  return [
    {
      label: "Refine this trip",
      prompt:
        "Refine this itinerary and make it more suitable for my preferences.",
    },
    {
      label: "Break down the budget",
      prompt:
        "Give me a detailed budget breakdown for this trip.",
    },
    {
      label: "Find hotels",
      prompt:
        "Suggest good hotels for this itinerary.",
    },
  ];
}

/* =========================================================
   BUILD STRUCTURED RESPONSE
========================================================= */

function buildResponseData(
  message: Message,
): AIResponseData | undefined {
  const visuals =
    message.metadata?.visuals;

  /*
   * If there are no visuals,
   * use the existing Markdown renderer.
   */
  if (!visuals) {
    return undefined;
  }

  const destination =
    visuals.destination;

  /* =======================================================
     TOTAL PLACE COUNT
  ======================================================= */

  const totalPlaces =
    visuals.days?.reduce(
      (total, day) =>
        total +
        (day.places?.length ??
          0),
      0,
    ) ?? 0;

  /* =======================================================
     TRIP SUMMARY
  ======================================================= */

  const tripSummary =
    destination
      ? {
          destination:
            destination.name,

          duration:
            visuals.days?.length
              ? `${visuals.days.length} days`
              : "",

          image:
            destination.image_url ??
            undefined,

          placesCount:
            totalPlaces,
        }
      : undefined;

  /* =======================================================
     DAY-BY-DAY ITINERARY
  ======================================================= */

  const itinerary:
    ItineraryDayData[] =
    visuals.days?.map(
      (day) => ({
        day:
          day.day,

        title:
          day.title,

        items:
          buildDayItems(
            message.content,
            day.day,
          ),

        places:
          convertPlaces(day),
      }),
    ) ?? [];

  /* =======================================================
     GLOBAL PLACE LIST

     Kept for compatibility.
  ======================================================= */

  const places: PlaceData[] =
    itinerary.flatMap(
      (day) =>
        day.places ?? [],
    );

  /* =======================================================
     BUDGET

     IMPORTANT:
     Parse from original backend content.
  ======================================================= */

  const budget =
    extractBudget(
      message.content,
    );

  /* =======================================================
     SUGGESTIONS
  ======================================================= */

  const actions =
    extractActions(
      message.content,
    );

  /* =======================================================
     EMPTY CHECK
  ======================================================= */

  if (
    !tripSummary &&
    itinerary.length === 0 &&
    places.length === 0 &&
    !budget
  ) {
    return undefined;
  }

  /* =======================================================
     FINAL RESPONSE DATA
  ======================================================= */

  return {
    tripSummary,

    itinerary,

    places,

    visuals,

    budget,

    actions,
  };
}

/* =========================================================
   AI MESSAGE
========================================================= */

export function AIMessage({
  message,
}: Props) {
  const isUser =
    message.role === "user";

  /* =======================================================
     USER MESSAGE
  ======================================================= */

  if (isUser) {
    return (
      <div className="mb-5 flex justify-end">
        <div className="max-w-[75%]">
          <div
            className="
              rounded-[18px]
              rounded-br-[6px]
              px-4
              py-2.5
              text-[15px]
              leading-[1.55]
            "
            style={{
  background: "#F1F1F1",

  color: "#171717",

  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}}
>
            {message.content}
          </div>

          {message.timestamp && (
            <p
              className="
                mt-1
                text-right
                text-[11px]
              "
              style={{
                color:
                  "var(--ai-muted)",
              }}
            >
              {formatTime(
                message.timestamp,
              )}
            </p>
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     ASSISTANT RESPONSE
  ======================================================= */

  const responseData =
    buildResponseData(
      message,
    );

  return (
    <div
      className="
        mb-5
        flex
        items-start
        gap-2.5
      "
      style={{
        fontFamily:
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Assistant logo */}

      <div
        className="
          mt-[38px]
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
        "
        aria-label="Elixway AI"
      >
        <img
          src="/image/elixicon.png"
          alt="Elixway"
          className="
            h-7
            w-7
            object-contain
          "
        />
      </div>

      {/* Response */}

      <div
        className="
          min-w-0
          max-w-[90%]
          sm:max-w-[85%]
        "
      >
        {responseData ? (
          <AIResponse
            content={
              message.content
            }
            data={
              responseData
            }
          />
        ) : (
          <div
            className="
              whitespace-pre-wrap
              text-[15px]
              leading-[1.65]
            "
            style={{
              color:
                "var(--ai-ink)",
            }}
          >
            {renderContent(
              message.content,
            )}
          </div>
        )}

        {/* Timestamp */}

        {message.timestamp && (
          <p
            className="
              mt-1.5
              text-[11px]
            "
            style={{
              color:
                "var(--ai-muted)",
            }}
          >
            {formatTime(
              message.timestamp,
            )}
          </p>
        )}
      </div>
    </div>
  );
}