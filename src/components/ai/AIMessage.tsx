import ReactMarkdown from 'react-markdown';
import type { Message } from '../../types/ai';

interface Props {
  message: Message;
}

export function AIMessage({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex mb-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed break-words
          ${isUser
            ? 'bg-orange-500 text-white rounded-2xl rounded-br-sm'
            : 'bg-neutral-100 text-neutral-900 rounded-2xl rounded-bl-sm'
          }
        `}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-1">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-neutral-200 text-neutral-800 px-1 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}