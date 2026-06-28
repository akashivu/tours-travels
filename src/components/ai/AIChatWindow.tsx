import { useRef, useEffect, useState } from 'react';
import type { ChatState, Session } from '../../types/ai';
import { AIChatHeader } from './AIChatHeader';
import { AIChatSidebar } from './AIChatSidebar';
import { AIMessageList } from './AIMessageList';
import { AIInput } from './AIInput';
import { SuggestedQuestions } from './SuggestedQuestions';

interface Props {
  state: ChatState;
  sessions: Session[];
  isLoadingSessions: boolean;
  onSend: (message: string) => void;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onClose: () => void;
  /** Render as a block that fills its parent — no fixed overlay, no shadow, no rounded corners */
  inline?: boolean;
}

export function AIChatWindow({
  state,
  sessions,
  isLoadingSessions,
  onSend,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onClose,
  inline = false,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showSuggestions = state.messages.length === 0 && !state.isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isLoading]);

  /* ── Inline: plain block filling parent flex container ── */
  if (inline) {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden bg-white border-l border-neutral-100">
        <AIChatHeader
          isLoading={state.isLoading}
          onNewChat={onNewChat}
          onClose={undefined}        // no close button in inline mode
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex flex-1 overflow-hidden relative">
          {sidebarOpen && (
            <div className="absolute inset-y-0 left-0 z-10 w-[200px] border-r border-neutral-100 bg-white">
              <AIChatSidebar
                sessions={sessions}
                currentSessionId={state.sessionId}
                isLoading={isLoadingSessions}
                onSelect={(id) => { onSelectSession(id); setSidebarOpen(false); }}
                onDelete={onDeleteSession}
                onNewChat={() => { onNewChat(); setSidebarOpen(false); }}
              />
            </div>
          )}

          <div className="flex flex-col flex-1 overflow-hidden min-w-0">
            <AIMessageList
              messages={state.messages}
              isLoading={state.isLoading}
              error={state.error}
            />
            {showSuggestions && <SuggestedQuestions onSelect={onSend} />}
            <AIInput onSend={onSend} disabled={state.isLoading} />
          </div>
        </div>
      </div>
    );
  }

  /* ── Default: fixed floating overlay (used by AIWidget everywhere else) ── */
  return (
    <div
      className="
        fixed z-[9999] flex flex-col overflow-hidden bg-white
        inset-0
        sm:inset-auto sm:bottom-[76px] sm:right-4
        sm:w-[400px] sm:h-[580px]
        sm:rounded-2xl
      "
      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.12)' }}
    >
      <AIChatHeader
        isLoading={state.isLoading}
        onNewChat={onNewChat}
        onClose={onClose}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div className="absolute inset-y-0 left-0 z-10 w-[200px] border-r border-neutral-100 bg-white">
            <AIChatSidebar
              sessions={sessions}
              currentSessionId={state.sessionId}
              isLoading={isLoadingSessions}
              onSelect={(id) => { onSelectSession(id); setSidebarOpen(false); }}
              onDelete={onDeleteSession}
              onNewChat={() => { onNewChat(); setSidebarOpen(false); }}
            />
          </div>
        )}

        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <AIMessageList
            messages={state.messages}
            isLoading={state.isLoading}
            error={state.error}
          />
          {showSuggestions && <SuggestedQuestions onSelect={onSend} />}
          <AIInput onSend={onSend} disabled={state.isLoading} />
        </div>
      </div>
    </div>
  );
}