import { useState } from "react";
import { Maximize2, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAIChat } from "../../hooks/useAIChat";
import { AIConversationPane } from "./workspace/AIConversationPane";
import { AIThemeStyles } from "./AITheme";

export default function WebsiteAIChat() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);

  const { state, sendMessage } = useAIChat();

  return (
    <>
      <AIThemeStyles />

      {/* =====================================================
          CLOSED AI PROMPT
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
            left-5
            z-[9999]
            flex
            h-[58px]
            w-[min(430px,calc(100vw-40px))]
            items-center
            gap-3.5
            overflow-hidden
            rounded-full
            border
            border-black/[0.10]
            bg-white
            px-5
            text-left
            shadow-[0_8px_30px_rgba(0,0,0,0.10)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-black/[0.18]
            hover:shadow-[0_12px_38px_rgba(0,0,0,0.15)]
            active:scale-[0.99]
          "
        >
          {/* =================================================
              AI SPARKLE
          ================================================= */}
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-neutral-950
              text-white
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <Sparkles
              size={17}
              strokeWidth={1.8}
            />
          </span>

          {/* =================================================
              TYPING TEXT
          ================================================= */}
          <span
            className="
              min-w-0
              flex-1
              overflow-hidden
              whitespace-nowrap
              text-[15px]
              font-medium
              tracking-[-0.01em]
              text-neutral-700
            "
          >
            <span className="ai-typing-text">
              Ask Elixway AI
            </span>
          </span>

          {/* =================================================
              ARROW
          ================================================= */}
          <span
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[18px]
              text-neutral-400
              transition-all
              duration-300
              group-hover:translate-x-0.5
              group-hover:text-neutral-700
            "
          >
            →
          </span>
        </button>
      )}

      {/* =====================================================
          OPEN AI CHAT
      ===================================================== */}
      {visible && (
        <div
          className="
            ai-root
            website-ai-chat
            fixed
            bottom-5
            right-5
            z-[9999]
            w-[min(460px,calc(100vw-24px))]
            overflow-hidden
            rounded-[22px]
            border
            border-black/[0.08]
            bg-white
            shadow-[0_20px_70px_rgba(0,0,0,0.16)]
          "
        >
          {/* =================================================
              WEBSITE AI HEADER
          ================================================= */}
          <div
            className="
              relative
              z-20
              flex
              h-[64px]
              shrink-0
              items-center
              justify-between
              border-b
              border-black/[0.07]
              bg-white
              px-5
            "
          >
            {/* Logo + Name */}
            <div className="flex items-center gap-2.5">
              <img
                src="/image/elixicon.png"
                alt="Elixway AI"
                className="
                  h-7
                  w-7
                  shrink-0
                  object-contain
                "
              />

              <p
                className="
                  text-[18px]
                  font-semibold
                  tracking-[-0.01em]
                  text-neutral-950
                "
              >
                Elixway AI
              </p>
            </div>

            {/* =================================================
                HEADER CONTROLS
            ================================================= */}
            <div className="flex items-center gap-1">
              {/* Expand */}
              <button
                type="button"
                onClick={() => navigate("/ai")}
                aria-label="Expand Elixway AI"
                title="Open full AI"
                className="
                  flex
                  h-15
                  w-15
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-neutral-800
                  transition-all
                  duration-200
                  hover:bg-neutral-100
                  active:scale-95
                "
              >
                <Maximize2
                  size={17}
                  strokeWidth={2}
                />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Close Elixway AI"
                title="Close"
                className="
                  flex
                  h-15
                  w-15
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-neutral-800
                  transition-all
                  duration-200
                  hover:bg-neutral-100
                  active:scale-95
                "
              >
                <X
                  size={18}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>

          {/* =================================================
              REAL AI CHAT
          ================================================= */}
          <div
            className="
              h-[560px]
              min-h-0
              overflow-hidden
              bg-white
            "
          >
            <AIConversationPane
              state={state}
              onSend={sendMessage}
            />
          </div>
        </div>
      )}

      {/* =====================================================
          TYPING + CURSOR ANIMATION
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

          @media (max-width: 640px) {
            .ai-typing-text {
              animation:
                aiTypingMobile 2.2s steps(15, end) forwards,
                aiCaret 0.75s step-end infinite;
            }
          }

          @keyframes aiTypingMobile {
            from {
              width: 0;
            }

            to {
              width: 15ch;
            }
          }
        `}
      </style>
    </>
  );
}