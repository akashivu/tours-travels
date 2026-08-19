import { SuggestedTrips } from "./SuggestedTrips";

interface AIConversationProps {
  children: React.ReactNode;

  input: React.ReactNode;

  hasMessages?: boolean;

  onPromptSelect?: (
    prompt: string
  ) => void;
}

export function AIConversation({
  children,
  input,
  hasMessages = false,
  onPromptSelect,
}: AIConversationProps) {
  return (
    <div
      className="
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
      "
      style={{
        background:
          "var(--ai-canvas)",
      }}
    >
      {/* =====================================================
          MESSAGES / STARTER EXPERIENCE
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
            className="
              flex
              min-h-full
              w-full
              items-center
              justify-center
              px-5
              py-10
              sm:px-8
              lg:px-10
            "
          >
            <div
              className="
                w-full
                max-w-[900px]
              "
            >
              <SuggestedTrips
                onSelect={onPromptSelect}
              />
            </div>
          </div>
        ) : (
          <div
            className="
              mx-auto
              w-full
              max-w-[820px]
              px-5
              py-8
              sm:px-8
              lg:px-10
            "
          >
            {children}
          </div>
        )}
      </div>

      {/* =====================================================
          EXISTING AI INPUT
      ====================================================== */}

      <div
        className="
          shrink-0
          px-4
          pb-4
          pt-2
          sm:px-6
          sm:pb-5
        "
        style={{
          background:
            "var(--ai-canvas)",
        }}
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[820px]
          "
        >
          {input}
        </div>

        {/* AI disclaimer */}

        <p
          className="
            mt-2
            text-center
            text-[9px]
          "
          style={{
            color:
              "var(--ai-muted)",
          }}
        >
          Elixway AI can make mistakes.
          Verify important travel details.
        </p>
      </div>
    </div>
  );
}