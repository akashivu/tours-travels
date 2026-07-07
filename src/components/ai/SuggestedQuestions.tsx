import { MapPin, Hotel, Plane, Globe, Wallet } from 'lucide-react';
import { AI_SUGGESTIONS } from '../../constants/aiSuggestions';

interface Suggestion {
  label: string;
  question: string;
}

interface Props {
  onSelect: (question: string) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  'Plan a trip':      <MapPin size={11} strokeWidth={1.8} />,
  'Find hotels':      <Hotel size={11} strokeWidth={1.8} />,
  'Book a flight':    <Plane size={11} strokeWidth={1.8} />,
  'Top destinations': <Globe size={11} strokeWidth={1.8} />,
  'Budget travel':    <Wallet size={11} strokeWidth={1.8} />,
};

export function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="px-4 pb-1 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
      <p className="text-[10px] text-[var(--muted)] uppercase tracking-[0.12em] mb-2.5 mt-2">
        Try asking
      </p>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {AI_SUGGESTIONS.map((s: Suggestion) => (
          <button
            key={s.label}
            onClick={() => onSelect(s.question)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-colors"
            style={{ background: 'var(--mist)', border: '1px solid var(--line)', color: 'var(--ink-soft)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--mist-strong)';
              e.currentTarget.style.borderColor = 'var(--line-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--mist)';
              e.currentTarget.style.borderColor = 'var(--line)';
            }}
          >
            <span style={{ color: 'var(--muted)' }}>{ICONS[s.label]}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}