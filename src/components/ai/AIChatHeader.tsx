import { X, SquarePen, PanelLeft } from 'lucide-react';

interface Props {
  isLoading: boolean;
  onNewChat: () => void;
  onClose?: () => void; // optional — omitted when inline
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
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-neutral-100 bg-white shrink-0">

      {/* Left: sidebar toggle + title */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? "Close history" : "Open history"}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <PanelLeft size={15} strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-2 ml-1">
          <span className="text-[13px] font-semibold text-neutral-900 tracking-tight">
            Adiyogi AI
          </span>
          <span className="flex items-center gap-1 text-[10px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
            Online
          </span>
        </div>
      </div>

      {/* Right: new chat + close (close hidden when inline) */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onNewChat}
          disabled={isLoading}
          title="New chat"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors disabled:opacity-30"
        >
          <SquarePen size={14} strokeWidth={1.75} />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <X size={15} strokeWidth={1.75} />
          </button>
        )}
      </div>
    </div>
  );
}