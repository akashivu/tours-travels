import { useMemo, useState } from 'react';
import { History, MessageSquare, Trash2, Plus, Search } from 'lucide-react';
import type { Session } from '../../types/ai';

interface Props {
  sessions: Session[];
  currentSessionId: string;
  isLoading: boolean;
  onSelect: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
  onNewChat: () => void;
}

export function AIChatSidebar({
  sessions,
  currentSessionId,
  isLoading,
  onSelect,
  onDelete,
  onNewChat,
}: Props) {
  // UI-only local filter — never mutates the sessions array or touches the hook.
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return sessions;
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => s.session_id.toLowerCase().includes(q));
  }, [sessions, query]);

  return (
    <div className="flex flex-col w-full h-full min-h-0" style={{ background: 'var(--paper)' }}>
      {/* New chat — lives only here, never stretched across the page */}
      <div className="px-3.5 pt-4 pb-3 shrink-0">
        <button
          onClick={onNewChat}
          className="ai-no-native-focus w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12.5px] font-semibold transition-colors"
          style={{ background: 'var(--ink)', color: '#fff' }}
        >
          <Plus size={14} strokeWidth={2.2} />
          New chat
        </button>
      </div>

      {/* Search (optional) */}
      <div className="px-3.5 pb-3 shrink-0">
        <div
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
          style={{ background: 'var(--mist)', border: '1px solid var(--line)' }}
        >
          <Search size={12.5} strokeWidth={2} style={{ color: 'var(--muted)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            className="ai-no-native-focus flex-1 bg-transparent border-none text-[12px] leading-none min-w-0"
            style={{ color: 'var(--ink)' }}
          />
        </div>
      </div>

      {/* Heading */}
      <div
        className="px-3.5 pt-1 pb-2 flex items-center gap-1.5 shrink-0"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <History size={11.5} strokeWidth={2} style={{ color: 'var(--muted)' }} />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: 'var(--muted)' }}
        >
          History
        </span>
      </div>

      {/* Session list — this is the only part that scrolls within the panel */}
      <div className="flex-1 min-h-0 overflow-y-auto ai-scroll px-2 pb-3">
        {isLoading && (
          <div className="space-y-1.5 px-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 rounded-lg animate-pulse" style={{ background: 'var(--mist)' }} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-2.5"
              style={{ background: 'var(--mist)', border: '1px solid var(--line)' }}
            >
              <MessageSquare size={16} strokeWidth={1.8} style={{ color: 'var(--muted)' }} />
            </div>
            <p className="text-[12px] font-medium" style={{ color: 'var(--ink)' }}>
              {query ? 'No matches' : 'No chats yet'}
            </p>
            {!query && (
              <p className="text-[10.5px] mt-1 leading-relaxed" style={{ color: 'var(--muted)' }}>
                Start a conversation to see your history here.
              </p>
            )}
          </div>
        )}

        {!isLoading &&
          filtered.map((session) => {
            const isActive = session.session_id === currentSessionId;
            return (
              <div
                key={session.session_id}
                onClick={() => onSelect(session.session_id)}
                className="ai-history-row group flex items-center justify-between gap-1.5 rounded-lg px-2.5 py-2 mb-0.5 cursor-pointer"
                style={{
                  background: isActive ? 'var(--mist)' : 'transparent',
                  border: isActive ? '1px solid var(--line-strong)' : '1px solid transparent',
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageSquare
                    size={13}
                    strokeWidth={2}
                    style={{ color: isActive ? 'var(--ink)' : 'var(--muted)' }}
                  />
                  <span
                    className="truncate text-[12px]"
                    style={{
                      color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {session.session_id.slice(0, 16)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(session.session_id);
                  }}
                  title="Delete"
                  className="ai-no-native-focus opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded shrink-0"
                  style={{ color: 'var(--muted)' }}
                >
                  <Trash2 size={12} strokeWidth={2} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}