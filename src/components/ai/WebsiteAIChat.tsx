import { useState } from "react";
import { Maximize2, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAIChat } from "../../hooks/useAIChat";
import { AIConversationPane } from "./workspace/AIConversationPane";
import { AIThemeStyles } from "./AITheme";

export default function WebsiteAIChat() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);

  const { state } = useAIChat();

  /*
   * Handles messages sent from the desktop
   * compact AI chat.
   *
   * Instead of responding inside the floating
   * chat, navigate to the full AI workspace and
   * pass the user's prompt through navigation state.
   */
  const handleDesktopSend = (
    message: string
  ) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    navigate("/ai", {
      state: {
        message: trimmedMessage,
        source: "website-chat",
      },
    });
  };

  return (
    <>
      <AIThemeStyles />

      {/* =====================================================
          MOBILE AI BUTTON

          Mobile:
          - Never show floating chat box
          - Navigate directly to /ai
      ===================================================== */}
      <button
        type="button"
        onClick={() => navigate("/ai")}
        aria-label="Open Elixway AI"
        className="
          group
          fixed
          bottom-5
          left-3
          right-3
          z-[60]
          flex
          h-[58px]
          items-center
          gap-3.5
          overflow-hidden
          rounded-xl
          border
          border-violet-200/70
          bg-white
          px-5
          text-left
          shadow-[0_10px_35px_rgba(76,29,149,0.12)]
          transition-all
          duration-300
          active:scale-[0.99]
          sm:hidden
        "
      >
        {/* Subtle background */}
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-r
            from-violet-500/[0.04]
            via-fuchsia-500/[0.03]
            to-indigo-500/[0.04]
          "
        />

        {/* AI Icon */}
        <span
          className="
            relative
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-violet-600
            via-purple-600
            to-indigo-600
            text-white
            shadow-[0_6px_18px_rgba(124,58,237,0.30)]
          "
        >
          <Sparkles size={17} strokeWidth={1.9} />
        </span>

        {/* Text */}
        <span
          className="
            relative
            min-w-0
            flex-1
            overflow-hidden
            whitespace-nowrap
            text-[15px]
            font-medium
            tracking-[-0.01em]
            text-neutral-800
          "
        >
          Ask Elixway AI
        </span>

        {/* Arrow */}
        <span
          className="
            relative
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-neutral-100
            text-[17px]
            font-medium
            text-violet-600
          "
        >
          →
        </span>
      </button>

      {/* =====================================================
          DESKTOP CLOSED AI PROMPT
      ===================================================== */}
      {!visible && (
        <button
          type="button"
          onClick={() => setVisible(true)}
          aria-label="Open Elixway AI"
          className="
            group
            fixed
            bottom-5
            left-2
            z-[60]
            hidden
            h-[58px]
            w-[min(380px,calc(100vw-24px))]
            items-center
            gap-3.5
            overflow-hidden
            rounded-xl
            border
            border-violet-200/70
            bg-white
            px-5
            text-left
            shadow-[0_10px_35px_rgba(76,29,149,0.12)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-violet-300
            hover:shadow-[0_14px_42px_rgba(76,29,149,0.20)]
            active:scale-[0.99]
            sm:flex
          "
        >
          <span
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-violet-500/[0.04]
              via-fuchsia-500/[0.03]
              to-indigo-500/[0.04]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />

          {/* AI Icon */}
          <span
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-violet-600
              via-purple-600
              to-indigo-600
              text-white
              shadow-[0_6px_18px_rgba(124,58,237,0.30)]
              transition-all
              duration-300
              group-hover:scale-105
            "
          >
            <Sparkles size={17} strokeWidth={1.9} />
          </span>

          {/* Text */}
          <span
            className="
              relative
              min-w-0
              flex-1
              overflow-hidden
              whitespace-nowrap
              text-[15px]
              font-medium
              tracking-[-0.01em]
              text-neutral-800
            "
          >
            <span className="ai-typing-text">
              Ask Elixway AI
            </span>
          </span>

          {/* Arrow */}
          <span
            className="
              relative
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-neutral-100
              text-[17px]
              font-medium
              text-neutral-400
              transition-all
              duration-300
              group-hover:translate-x-0.5
              group-hover:bg-violet-50
              group-hover:text-violet-600
            "
          >
            →
          </span>
        </button>
      )}

      {/* =====================================================
          DESKTOP OPEN AI CHAT ONLY
      ===================================================== */}
      {visible && (
        <div
          className="
            ai-root
            website-ai-chat
            fixed
            bottom-5
            right-5
            z-[60]
            hidden
            h-[600px]
            w-[420px]
            max-h-[calc(100dvh-40px)]
            min-h-0
            flex-col
            overflow-hidden
            rounded-[12px]
            border
            border-black/[0.08]
            bg-white
            shadow-[0_20px_70px_rgba(0,0,0,0.16)]
            sm:flex
          "
        >
          {/* HEADER */}
          <div
            className="
              relative
              z-20
              flex
              h-[56px]
              shrink-0
              items-center
              justify-between
              border-b
              border-black/[0.07]
              bg-white
              px-4
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <img
                src="/image/elixicon.png"
                alt="Elixway AI"
                className="h-6 w-6 shrink-0 object-contain"
              />

              <p className="truncate text-[16px] font-semibold tracking-[-0.01em] text-neutral-950">
                Elixway AI
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {/* Expand to full AI page */}
              <button
                type="button"
                onClick={() => navigate("/ai")}
                aria-label="Expand Elixway AI"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-neutral-700
                  transition-all
                  hover:bg-neutral-100
                "
              >
                <Maximize2 size={16} strokeWidth={2} />
              </button>

              {/* Close desktop chat */}
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Close Elixway AI"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-neutral-700
                  transition-all
                  hover:bg-neutral-100
                "
              >
                <X size={17} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* CHAT */}
          <div
            className="
              min-h-0
              min-w-0
              flex-1
              overflow-hidden
            "
          >
            <AIConversationPane
              state={state}
              onSend={handleDesktopSend}
              compact
            />
          </div>
        </div>
      )}

      {/* =====================================================
          DESKTOP TYPING ANIMATION
      ===================================================== */}
      <style>
        {`
          .ai-typing-text {
            display: inline-block;
            overflow: hidden;
            vertical-align: bottom;
            white-space: nowrap;
            width: 0;
            border-right: 1.5px solid #171717;

            animation:
              aiTyping 2.2s steps(15, end) forwards,
              aiCaret 0.75s step-end infinite;
          }

          @keyframes aiTyping {
            from {
              width: 0;
            }

            to {
              width: 15ch;
            }
          }

          @keyframes aiCaret {
            0%,
            100% {
              border-color: #171717;
            }

            50% {
              border-color: transparent;
            }
          }
        `}
      </style>
    </>
  );
}