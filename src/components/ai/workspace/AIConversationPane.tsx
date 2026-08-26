import type { ChatState } from "../../../types/ai";

import { AIMessageList } from "../AIMessageList";
import { AIInput } from "../AIInput";
import { SuggestedTrips } from "./history/SuggestedTrips";

interface AIConversationPaneProps {
  state: ChatState;
  onSend: (message: string) => void;

  /*
   * Compact mode is used by the floating
   * website AI chat without affecting /ai.
   */
  compact?: boolean;
}

export function AIConversationPane({
  state,
  onSend,
  compact = false,
}: AIConversationPaneProps) {
  const hasMessages = state.messages.length > 0;

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-1
        flex-col
        overflow-hidden
      "
      style={{
        background: "var(--ai-canvas)",
      }}
    >
      {/* =====================================================
          CONVERSATION
      ====================================================== */}

      <div
        className="
          ai-scroll
          min-h-0
          flex-1
          overflow-y-auto
        "
      >
        {!hasMessages ? (
          <div
            className={
              compact
                ? `
                  flex
                  min-h-full
                  w-full
                  items-center
                  justify-center
                  px-4
                  py-5
                `
                : `
                  flex
                  min-h-full
                  w-full
                  items-center
                  justify-center
                  px-5
                  py-8
                  sm:px-8
                  lg:px-10
                `
            }
          >
            <div
              className={
                compact
                  ? "w-full"
                  : "w-full max-w-[900px]"
              }
            >
              <SuggestedTrips
  onSelect={onSend}
  compact={compact}
/>
            </div>
          </div>
        ) : (
          <div
            className={
              compact
                ? `
                  mx-auto
                  w-full
                  px-3
                  py-3
                `
                : `
                  mx-auto
                  w-full
                  px-4
                  py-4
                `
            }
          >
            <AIMessageList
              messages={state.messages}
              isLoading={state.isLoading}
              error={state.error}
              onSend={onSend}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          COMPOSER
      ====================================================== */}

      <div
        className={
          compact
            ? `
              shrink-0
              px-3
              pb-3
              pt-2
            `
            : `
              shrink-0
              px-4
              pb-3
              pt-2
              sm:px-6
              sm:pb-4
            `
        }
        style={{
          background: "var(--ai-canvas)",
        }}
      >
        <div
          className={
            compact
              ? "mx-auto w-full"
              : "mx-auto w-full max-w-[900px]"
          }
        >
          <AIInput
            onSend={onSend}
            disabled={state.isLoading}
          />
        </div>
      </div>
    </div>
  );
}