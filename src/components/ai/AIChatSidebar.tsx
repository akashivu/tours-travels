import {

  History,
  MessageSquare,
  Trash2,
} from "lucide-react";
import type { Session } from "../../types/ai";

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

}: Props) {
  return (
    <aside className="flex flex-col w-[110px] min-w-[110px] h-full bg-slate-50 border-r border-slate-200">

      {/* New Chat */}
     

      {/* Heading */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-200">
        <History
          size={15}
          className="text-slate-500"
        />

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
           History
        </span>
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">

        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 rounded-xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 text-center px-4">

            <MessageSquare
              size={34}
              className="text-slate-300 mb-3"
            />

            <p className="text-sm font-medium text-slate-500">
              No chats yet
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Start a conversation to see your history.
            </p>
          </div>
        )}

        {!isLoading &&
          sessions.map((session) => (
            <div
              key={session.session_id}
              onClick={() => onSelect(session.session_id)}
              className={`
                group
                flex
                items-center
                justify-between
                gap-2
                rounded-xl
                px-3
                py-2.5
                mb-2
                cursor-pointer
                transition-all
                ${
                  session.session_id === currentSessionId
                    ? "bg-orange-100 border border-orange-300"
                    : "hover:bg-white"
                }
              `}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">

                <MessageSquare
                  size={15}
                  className={
                    session.session_id === currentSessionId
                      ? "text-orange-600"
                      : "text-slate-400"
                  }
                />

                <span
                  className={`
                    truncate
                    text-sm
                    ${
                      session.session_id === currentSessionId
                        ? "text-orange-700 font-semibold"
                        : "text-slate-700"
                    }
                  `}
                >
                  {session.session_id.slice(0, 12)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(session.session_id);
                }}
                className="
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  text-slate-400
                  hover:text-red-500
                "
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
      </div>
    </aside>
  );
}