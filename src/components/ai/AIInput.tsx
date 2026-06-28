import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function AIInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) textareaRef.current?.focus();
  }, [disabled]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const canSend = value.trim() && !disabled;

  return (
    <div className="flex items-end gap-2 px-3.5 py-2.5 border-t border-neutral-100 bg-white">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Ask anything about your trip…"
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none border-none outline-none text-sm leading-relaxed font-[inherit] bg-transparent text-neutral-900 placeholder:text-neutral-400 overflow-y-auto py-0.5 disabled:opacity-50"
        style={{ maxHeight: 160 }}
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send"
        className={`
          w-8 h-8 rounded-full border-none flex items-center justify-center
          text-white text-sm font-medium flex-shrink-0 transition-colors
          ${canSend
            ? 'bg-orange-500 cursor-pointer hover:bg-orange-600'
            : 'bg-neutral-200 cursor-default'
          }
        `}
      >
        ↑
      </button>
    </div>
  );
}