import { useEffect, useRef } from 'react';
import { AIMessage } from './AIMessage';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '../../types/ai';

interface Props {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function AIMessageList({ messages, isLoading, error }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="ai-scroll flex-1 overflow-y-auto px-4 pt-5 pb-1 flex flex-col">
      {messages.length === 0 && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <span
            className="flex items-center justify-center rounded-full mb-3.5"
            style={{ width: 36, height: 36, background: 'var(--mist)', border: '1px solid var(--line)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 18C6 12 18 12 18 6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="6" r="1.6" fill="var(--signal)" />
            </svg>
          </span>
          <p className="text-[13px] font-medium text-[var(--ink-soft)]">How can I help?</p>
          <p className="text-[11.5px] text-[var(--muted)] mt-1 max-w-[220px] leading-relaxed">
            Ask about bookings, pricing, vehicles, and trip planning.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <AIMessage key={msg.id} message={msg} />
      ))}

      {isLoading && <TypingIndicator />}

      {error && (
        <div
          className="text-[11.5px] text-red-600 rounded-xl px-3 py-2 mb-3"
          style={{ background: '#FEF2F2', border: '1px solid #FEE2E2' }}
        >
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}