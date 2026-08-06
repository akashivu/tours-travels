import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import type { Message } from '../../types/ai';

interface Props {
  message: Message;
}

export function AIMessage({ message }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 w-full ai-fade-in">
        <div
          className="max-w-[72%] px-4 py-2.5 rounded-2xl rounded-br-md break-words text-[14px] leading-6"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 mb-4 max-w-[86%] ai-fade-in">
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 26, height: 26, background: 'var(--surface)', marginTop: 2 }}
      >
        <Sparkles size={12} strokeWidth={1.9} style={{ color: 'var(--ink-soft)' }} />
      </span>
      <div
        className="text-[13.5px] leading-relaxed text-[var(--ink-soft)] rounded-2xl rounded-tl-md px-4 py-2.5"
        style={{ background: 'var(--surface)' }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => <strong className="font-medium text-[var(--ink)]">{children}</strong>,
            code: ({ children }) => (
              <code
                className="px-1 py-0.5 rounded text-[12px] font-mono"
                style={{ background: 'var(--surface-strong)', color: 'var(--ink)' }}
              >
                {children}
              </code>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}