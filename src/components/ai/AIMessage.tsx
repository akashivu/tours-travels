import ReactMarkdown from 'react-markdown';
import type { Message } from '../../types/ai';

interface Props {
  message: Message;
}

export function AIMessage({ message }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
  return (
    <div className="flex justify-end mb-5 w-full ai-fade-in">
      <div
        className="
          max-w-[72%]
          px-4
          py-3
          rounded-2xl
          rounded-br-md
          break-words
          text-[14px]
          leading-7
          font-medium
          shadow-sm
        "
        style={{
          background: "#17181D",
          color: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.10)",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
  // AI responses: unbubbled, editorial layout with a thin signal-colored
  // rule — reads as a considered note rather than a generic chat bubble.
  return (
    <div className="flex justify-start mb-5 ai-fade-in">
      <div
        className="max-w-[86%] pl-3.5 text-[13.5px] leading-relaxed text-[var(--ink-soft)]"
        style={{ borderLeft: '2px solid var(--signal-soft)' }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-[var(--ink)]">{children}</strong>,
            code: ({ children }) => (
              <code
                className="px-1 py-0.5 rounded text-[12px] font-mono"
                style={{ background: 'var(--mist-strong)', color: 'var(--ink)' }}
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