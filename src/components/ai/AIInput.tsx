import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function AIInput({
  onSend,
  disabled,
}: Props) {
  const [value, setValue] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (!value.trim() || disabled) {
      return;
    }

    onSend(value.trim());

    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const element =
      textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";

    element.style.height =
      Math.min(
        element.scrollHeight,
        140
      ) + "px";
  };

  const canSend =
    Boolean(value.trim()) &&
    !disabled;

  return (
    <div
      className="
        shrink-0
        px-4
        pb-2
        pt-2
      "
      style={{
        background:
          "var(--ai-canvas)",
      }}
    >
      {/* =====================================================
          COMPOSER
      ====================================================== */}

      <div
        className="
          flex
          min-h-[68px]
          w-full
          items-center
          gap-2
          rounded-[var(--ai-radius-lg)]
          border
          px-3
          py-3
          transition-all
          duration-200
        "
        style={{
          background:
            "var(--ai-card-soft)",

          borderColor:
            canSend
              ? "var(--ai-border-strong)"
              : "transparent",
        }}
      >
        {/* =================================================
            TEXTAREA
        ================================================== */}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          onInput={
            handleInput
          }
          placeholder="Ask follow up..."
          disabled={disabled}
          rows={1}
          className="
            ai-scroll
            min-h-[32px]
            min-w-0
            flex-1
            resize-none
            self-center
            overflow-y-auto
            border-0
            bg-transparent
            px-0
            py-1.5
            text-[13.5px]
            leading-5
            outline-none
            ring-0
            focus:border-0
            focus:outline-none
            focus:ring-0
          "
          style={{
            color:
              "var(--ai-ink)",

            border:
              "none",

            outline:
              "none",

            boxShadow:
              "none",

            appearance:
              "none",

            WebkitAppearance:
              "none",

            maxHeight: 140,
          }}
        />

        {/* =================================================
            SEND BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            self-center
            rounded-full
            transition-all
            duration-200
            active:scale-95
          "
          style={{
            background: canSend
              ? "var(--ai-ink)"
              : "var(--ai-border-strong)",
            color: "#ffffff",
            cursor: canSend
              ? "pointer"
              : "default",
            border: "none",
            padding: 0,
          }}
        >
          <ArrowUp
            size={17}
            strokeWidth={2.2}
            color="currentColor"
          />
        </button>
      </div>

      {/* =====================================================
          DISCLAIMER
      ====================================================== */}

      <p
        className="
          mt-2.5
          text-center
          text-[10.5px]
          leading-4
        "
        style={{
          color:
            "var(--ai-muted)",
        }}
      >
        AI-powered; AI can make mistakes. Verify important
        travel details.
      </p>
    </div>
  );
}