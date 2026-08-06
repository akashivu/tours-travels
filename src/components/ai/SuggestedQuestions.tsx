import { AI_SUGGESTIONS } from '../../constants/aiSuggestions';

interface Suggestion {
  label: string;
  question: string;
}

interface Props {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="px-4 pb-1 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
      <p className="text-[10px] text-[var(--muted)] uppercase tracking-[0.1em] mb-2.5 mt-2">
        Try asking
      </p>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {AI_SUGGESTIONS.map((s: Suggestion) => (
          <button
            key={s.label}
            onClick={() => onSelect(s.question)}
            className="ai-no-native-focus inline-flex items-center px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--ink-soft)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surface-strong)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}