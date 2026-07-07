export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 pl-3.5 mb-5" style={{ borderLeft: '2px solid var(--signal-soft)' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="ai-typing-dot block w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--muted)', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}