import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, isLoading]);

  return (
    <div className="ai-scroll flex-1 overflow-y-auto px-4 pt-5 pb-1 flex flex-col">
      {messages.length === 0 && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <span
            className="flex items-center justify-center rounded-full mb-3.5"
            style={{ width: 36, height: 36, background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <Sparkles size={16} strokeWidth={1.8} style={{ color: 'var(--ink-soft)' }} />
          </span>
          <p className="text-[13px] font-medium text-[var(--ink-soft)]">How can I help?</p>
          <p className="text-[11.5px] text-[var(--muted)] mt-1 max-w-[220px] leading-relaxed">
            Ask a question to get started.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <AIMessage key={msg.id} message={msg} />
      ))}

      {isLoading && <TypingIndicator />}

      {error && (
        <div
          className="text-[11.5px] rounded-xl px-3 py-2 mb-3"
          style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', color: '#B42318' }}
        >
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}