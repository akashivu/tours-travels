import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

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
    <div className="px-3.5 pb-3.5 pt-1.5 bg-[var(--paper)]">
      <div
        className="flex items-end gap-2 rounded-[16px] px-3.5 py-2.5"
        style={{ background: 'var(--surface)' }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Message the assistant"
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none border-none outline-none text-[13.5px] leading-relaxed font-[inherit] bg-transparent text-[var(--ink)] placeholder:text-[var(--muted)] overflow-y-auto py-1 disabled:opacity-50 ai-scroll"
          style={{ maxHeight: 160 }}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="w-8 h-8 rounded-full border-none flex items-center justify-center shrink-0"
          style={{
            background: 'var(--ink)',
            color: '#fff',
            opacity: canSend ? 1 : 0.35,
            cursor: canSend ? 'pointer' : 'default',
          }}
        >
          <ArrowUp size={15} strokeWidth={2.3} />
        </button>
      </div>
      <p className="text-center text-[10px] text-[var(--muted)] mt-2 tracking-wide">
        The assistant can make mistakes. Verify important info.
      </p>
    </div>
  );
}