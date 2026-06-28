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
    <div className="flex-1 overflow-y-auto px-3.5 pt-4 pb-1 flex flex-col">
      {messages.length === 0 && !isLoading && (
        <div className="text-center py-5 text-neutral-400 text-sm">
          <div className="text-3xl mb-2">👋</div>
          Hello! I can help with bookings, pricing, vehicles, and trip planning.
        </div>
      )}

      {messages.map(msg => (
        <AIMessage key={msg.id} message={msg} />
      ))}

      {isLoading && <TypingIndicator />}

      {error && (
        <div className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-2">
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}