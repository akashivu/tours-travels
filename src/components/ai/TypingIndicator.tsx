import { Sparkles } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-4 ai-fade-in">
      <span
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 26, height: 26, background: 'var(--surface)', marginTop: 2 }}
      >
        <Sparkles size={12} strokeWidth={1.9} style={{ color: 'var(--ink-soft)' }} />
      </span>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-md px-4 py-3"
        style={{ background: 'var(--surface)' }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="ai-typing-dot block w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--muted)', animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}