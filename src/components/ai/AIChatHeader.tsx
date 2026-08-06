import { X, SquarePen, PanelLeft, Sparkles } from 'lucide-react';

interface Props {
  isLoading: boolean;
  onNewChat: () => void;
  onClose?: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function AIChatHeader({
  isLoading,
  onNewChat,
  onClose,
  onToggleSidebar,
  sidebarOpen,
}: Props) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 shrink-0 bg-[var(--paper)]"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-1">
        {onClose && (
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close"
            className="sm:hidden p-1.5 -ml-1 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors mr-1"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        )}

        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close history' : 'Open history'}
          aria-label={sidebarOpen ? 'Close history' : 'Open history'}
          className={`p-1.5 rounded-lg transition-colors ${
            sidebarOpen
              ? 'bg-[var(--surface-strong)] text-[var(--ink)]'
              : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
          }`}
        >
          <PanelLeft size={15} strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-2.5 ml-2">
          <span
            className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 26, height: 26, background: 'var(--accent-soft)' }}
          >
            <Sparkles size={13} strokeWidth={1.9} style={{ color: 'var(--accent-ink)' }} />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-medium text-[var(--ink)] tracking-tight">
              Assistant
            </span>
            <span className="flex items-center gap-1.5 text-[10.5px] text-[var(--muted)] mt-0.5">
              {isLoading ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full ai-pulse" style={{ background: 'var(--accent)' }} />
                  Thinking
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
                  Online
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={onNewChat}
          disabled={isLoading}
          title="New chat"
          aria-label="New chat"
          className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <SquarePen size={15} strokeWidth={1.8} />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close"
            className="hidden sm:flex p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}