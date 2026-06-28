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
  'Plan a trip':      <MapPin size={11} strokeWidth={1.75} />,
  'Find hotels':      <Hotel size={11} strokeWidth={1.75} />,
  'Book a flight':    <Plane size={11} strokeWidth={1.75} />,
  'Top destinations': <Globe size={11} strokeWidth={1.75} />,
  'Budget travel':    <Wallet size={11} strokeWidth={1.75} />,
};

export function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="px-3 pb-3 pt-3 border-t border-neutral-100">
      <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">
        Suggestions
      </p>
      <div className="flex flex-wrap gap-1.5">
        {AI_SUGGESTIONS.map((s: Suggestion) => (
          <button
            key={s.label}
            onClick={() => onSelect(s.question)}
            className="
              inline-flex items-center gap-1.5
              px-2.5 py-1.5 rounded-lg
              bg-neutral-50 border border-neutral-200
              text-[11.5px] font-medium text-neutral-600
              hover:bg-neutral-100 hover:border-neutral-300 hover:text-neutral-900
              transition-colors duration-100
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400
            "
          >
            <span className="text-neutral-400">{ICONS[s.label]}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}