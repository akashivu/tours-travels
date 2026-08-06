import { useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showSuggestions = state.messages.length === 0 && !state.isLoading;

  // Inline (full-page) mode: sidebar is a permanent column, exactly like the wireframe.
  if (inline) {
    return (
      <div className="ai-root flex h-full w-full overflow-hidden" style={{ background: 'var(--paper)' }}>
        <div className="w-[220px] shrink-0" style={{ borderRight: '1px solid var(--border)' }}>
          <AIChatSidebar
            sessions={sessions}
            currentSessionId={state.sessionId}
            isLoading={isLoadingSessions}
            onSelect={onSelectSession}
            onDelete={onDeleteSession}
            onNewChat={onNewChat}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden min-w-0" style={{ background: 'var(--paper)' }}>
          <div className="px-4 py-3 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>
              {state.messages.length === 0 ? 'New chat' : 'Conversation'}
            </span>
          </div>

          <AIMessageList messages={state.messages} isLoading={state.isLoading} error={state.error} />
          {showSuggestions && <SuggestedQuestions onSelect={onSend} />}
          <AIInput onSend={onSend} disabled={state.isLoading} />
        </div>
      </div>
    );
  }

  // Floating overlay mode (launcher widget): sidebar toggles as a drawer.
  const body = (
    <>
      <AIChatHeader
        isLoading={state.isLoading}
        onNewChat={onNewChat}
        onClose={onClose}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative min-h-0">
        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 z-10"
              style={{ background: 'rgba(15,23,42,0.08)' }}
            />
            <div
              className="absolute inset-y-0 left-0 z-20 w-[220px]"
              style={{ borderRight: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
            >
              <AIChatSidebar
                sessions={sessions}
                currentSessionId={state.sessionId}
                isLoading={isLoadingSessions}
                onSelect={(id) => {
                  onSelectSession(id);
                  setSidebarOpen(false);
                }}
                onDelete={onDeleteSession}
                onNewChat={() => {
                  onNewChat();
                  setSidebarOpen(false);
                }}
              />
            </div>
          </>
        )}

        <div className="flex flex-col flex-1 overflow-hidden min-w-0 min-h-0" style={{ background: 'var(--paper)' }}>
          <AIMessageList
            messages={state.messages}
            isLoading={state.isLoading}
            error={state.error}
          />
          {showSuggestions && <SuggestedQuestions onSelect={onSend} />}
          <AIInput onSend={onSend} disabled={state.isLoading} />
        </div>
      </div>
    </>
  );

  return (
    <div
      className="ai-root fixed z-[9999] flex flex-col overflow-hidden inset-0 sm:inset-auto sm:bottom-[76px] sm:right-4 sm:w-[400px] sm:h-[580px] sm:rounded-2xl"
      style={{ background: 'var(--paper)', boxShadow: '0 0 0 1px var(--border), 0 20px 60px rgba(15,23,42,0.16)' }}
    >
      {body}
    </div>
  );
}