import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { AIChatWindow } from './AIChatWindow';
import { useAIChat } from '../../hooks/useAIChat';
import { aiService } from '../../services/aiService';

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(() => aiService.getWidgetOpen());

  const {
    state,
    sessionsState,
    sendMessage,
    startNewChat,
    loadConversation,
    deleteConversation,
  } = useAIChat();

  const handleToggle = () => {
    setIsOpen(prev => {
      aiService.setWidgetOpen(!prev);
      return !prev;
    });
  };

  return (
    <>
      {isOpen && (
        <AIChatWindow
          state={state}
          sessions={sessionsState.sessions}
          isLoadingSessions={sessionsState.isLoadingSessions}
          onSend={sendMessage}
          onNewChat={startNewChat}
          onSelectSession={loadConversation}
          onDeleteSession={deleteConversation}
          onClose={handleToggle}
        />
      )}

      {/* Floating launcher — hidden while chat is open (header X handles close) */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          aria-label="Open AI assistant"
          className="
            group fixed bottom-5 right-5 z-[9998]
            h-14 pl-4 pr-5 rounded-full
            flex items-center gap-2
            bg-gradient-to-br from-orange-500 to-orange-600
            text-white font-medium text-sm
            shadow-[0_10px_30px_-8px_rgba(249,115,22,0.55),0_4px_12px_rgba(0,0,0,0.12)]
            ring-1 ring-white/20
            transition-all duration-200 ease-out
            hover:scale-[1.03] hover:shadow-[0_14px_36px_-8px_rgba(249,115,22,0.7),0_6px_16px_rgba(0,0,0,0.15)]
            active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400
          "
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            <MessageSquare size={16} strokeWidth={2.25} />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-orange-500" />
          </span>
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}
    </>
  );
}
