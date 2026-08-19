import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Hotel,
  Map,
  Plane,
  Sparkles,
} from "lucide-react";

import { AIMessage } from "./AIMessage";
import { TypingIndicator } from "./TypingIndicator";

import type { Message } from "../../types/ai";

interface Props {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend?: (message: string) => void;
}

const quickActions = [
  {
    label: "Find flights",
    description: "Compare flight options",
    icon: Plane,
    prompt: "Find flights for my trip",
  },
  {
    label: "Find hotels",
    description: "Discover places to stay",
    icon: Hotel,
    prompt: "Find hotels for my trip",
  },
  {
    label: "Plan a trip",
    description: "Build my itinerary",
    icon: Map,
    prompt: "Help me plan a trip",
  },
];

export function AIMessageList({
  messages,
  isLoading,
  error,
  onSend,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length, isLoading]);

  const isEmpty =
    messages.length === 0 &&
    !isLoading;

  return (
    <div
      className="
        ai-scroll
        flex
        min-h-0
        flex-1
        flex-col
        overflow-y-auto
        px-5
        pb-5
        pt-6
      "
    >
      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {isEmpty && (
        <div
          className="
            flex
            min-h-full
            flex-col
            justify-center
            py-8
          "
        >
          {/* AI identity */}

          <div
            className="
              mb-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[var(--ai-radius-sm)]
            "
            style={{
              background:
                "var(--ai-ink)",
              color: "#ffffff",
            }}
          >
            <Sparkles
              size={17}
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}

          <h2
            className="
              max-w-[320px]
              text-[24px]
              font-semibold
              leading-[1.15]
              tracking-[-0.035em]
            "
            style={{
              color:
                "var(--ai-ink)",
            }}
          >
            Where are you
            going next?
          </h2>

          <p
            className="
              mt-3
              max-w-[330px]
              text-[13px]
              leading-6
            "
            style={{
              color:
                "var(--ai-muted)",
            }}
          >
            Tell me what you want to
            do and I&apos;ll help you
            discover, plan and book
            your journey.
          </p>

          {/* Quick actions */}

          <div className="mt-7 space-y-1.5">
            {quickActions.map(
              ({
                label,
                description,
                icon: Icon,
                prompt,
              }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    onSend?.(prompt)
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-[var(--ai-radius-md)]
                    border
                    px-3.5
                    py-3
                    text-left
                    transition-all
                    duration-200
                    hover:-translate-y-[1px]
                  "
                  style={{
                    background:
                      "var(--ai-card)",
                    borderColor:
                      "var(--ai-border)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor =
                      "var(--ai-border-strong)";
                    event.currentTarget.style.boxShadow =
                      "var(--ai-shadow-sm)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor =
                      "var(--ai-border)";
                    event.currentTarget.style.boxShadow =
                      "none";
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[var(--ai-radius-sm)]
                      "
                      style={{
                        background:
                          "var(--ai-card-soft)",
                        color:
                          "var(--ai-ink-soft)",
                      }}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="flex flex-col">
                      <span
                        className="
                          text-[12.5px]
                          font-medium
                        "
                        style={{
                          color:
                            "var(--ai-ink)",
                        }}
                      >
                        {label}
                      </span>

                      <span
                        className="
                          mt-0.5
                          text-[10.5px]
                        "
                        style={{
                          color:
                            "var(--ai-muted)",
                        }}
                      >
                        {description}
                      </span>
                    </span>
                  </span>

                  <ArrowRight
                    size={15}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                    style={{
                      color:
                        "var(--ai-muted)",
                    }}
                  />
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          CONVERSATION
      ====================================================== */}

      {!isEmpty && (
        <div
          className="
            mx-auto
            w-full
            max-w-[900px]
          "
        >
          {messages.map((message) => (
            <AIMessage
              key={message.id}
              message={message}
            />
          ))}

          {/* Loading */}

          {isLoading && (
            <TypingIndicator />
          )}

          {/* Error */}

          {error && (
            <div
              className="
                mb-4
                max-w-[700px]
                rounded-[var(--ai-radius-sm)]
                border
                px-3.5
                py-3
                text-[12px]
              "
              style={{
                background: "var(--ai-accent-soft)",
                borderColor: "var(--ai-border)",
                color: "var(--ai-danger)",
              }}
            >
              {error}
            </div>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}