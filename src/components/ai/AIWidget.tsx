import { useEffect, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { AIChatWindow } from './AIChatWindow';
import { AIThemeStyles } from './AITheme';
import { useAIChat } from '../../hooks/useAIChat';
import { aiService } from '../../services/aiService';
import { useAIWidget } from '../../context/AIWidgetContext';

const BUBBLE_DISMISSED_KEY = 'ai-bubble-dismissed-at';
const BUBBLE_DELAY_MS = 4000;
const TYPING_DURATION_MS = 1400;
const BUBBLE_HIDE_FOR_DAYS = 1;
const BUBBLE_MESSAGE =
  "Tell me where you're headed and I'll book the right vehicle for you.";

export function AIWidget() {
  const { isOpen, openWidget, closeWidget, toggleWidget } = useAIWidget();

  const {
    state,
    sessionsState,
    sendMessage,
    startNewChat,
    loadConversation,
    deleteConversation,
  } = useAIChat();

  // Proactive "typing" preview bubble state
  const [bubbleMounted, setBubbleMounted] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [typing, setTyping] = useState(true);

  // Restore persisted open state on mount (once), same behavior as before
  useEffect(() => {
    if (aiService.getWidgetOpen()) {
      openWidget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep aiService in sync whenever context state changes,
  // so persistence still works exactly as before
  useEffect(() => {
    aiService.setWidgetOpen(isOpen);
  }, [isOpen]);

  // Schedule the proactive bubble — only if the widget hasn't already
  // been opened this visit and it wasn't recently dismissed.
  useEffect(() => {
    if (isOpen) return; // never show the bubble while the chat is open

    const dismissedAt = localStorage.getItem(BUBBLE_DISMISSED_KEY);
    if (dismissedAt) {
      const hoursSince = (Date.now() - Number(dismissedAt)) / 36e5;
      if (hoursSince < BUBBLE_HIDE_FOR_DAYS * 24) return;
    }

    const showTimer = setTimeout(() => {
      setBubbleMounted(true);
      requestAnimationFrame(() => setBubbleVisible(true));
    }, BUBBLE_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, [isOpen]);

  // Once the bubble mounts, run the typing → message transition
  useEffect(() => {
    if (!bubbleMounted) return;
    const typingTimer = setTimeout(() => setTyping(false), TYPING_DURATION_MS);
    return () => clearTimeout(typingTimer);
  }, [bubbleMounted]);

  const dismissBubble = () => {
    setBubbleVisible(false);
    localStorage.setItem(BUBBLE_DISMISSED_KEY, String(Date.now()));
    setTimeout(() => setBubbleMounted(false), 250);
  };

  const handleClose = () => {
    closeWidget();
  };

  const handleLauncherClick = () => {
    if (bubbleMounted) dismissBubble();
    toggleWidget();
  };

  const handleBubbleClick = () => {
    dismissBubble();
    openWidget();
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
          onClose={handleClose}
        />
      )}

      {/* Floating launcher — now shown on all breakpoints, including mobile.
          TopBar's "Ask AI" button and the full-screen menu's "Ask AI" row
          still call openWidget() directly and work independently of this. */}
      {!isOpen && (
        <div className="ai-root">
          <AIThemeStyles />
          <style>{`
            @keyframes ai-dot-bounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
              30% { transform: translateY(-3px); opacity: 1; }
            }
            .ai-typing-dot { animation: ai-dot-bounce 1.1s ease-in-out infinite; }
            .ai-typing-dot:nth-child(2) { animation-delay: 0.15s; }
            .ai-typing-dot:nth-child(3) { animation-delay: 0.3s; }

            @keyframes ai-bubble-in {
              from { opacity: 0; transform: translateY(8px) scale(0.96); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {bubbleMounted && (
            <div
              className={`fixed right-4 sm:right-5 z-[9997] w-[290px] max-w-[85vw] transition-all duration-250 ease-out ${
                bubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                bottom: 'calc(86px + env(safe-area-inset-bottom, 0px))',
                animation: bubbleVisible ? 'ai-bubble-in 0.28s ease-out' : undefined,
              }}
            >
              <button
                onClick={handleBubbleClick}
                className="relative block w-full rounded-2xl rounded-br-sm border border-black/[0.06] bg-white p-3.5 pr-8 text-left shadow-[0_12px_32px_-8px_rgba(16,17,22,0.18)] transition-transform hover:scale-[1.015]"
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissBubble();
                  }}
                  role="button"
                  aria-label="Dismiss"
                  className="absolute right-2 top-2 rounded-full p-1 text-black/30 hover:bg-black/[0.04] hover:text-black/60"
                >
                  <X size={13} strokeWidth={2} />
                </span>

                {typing ? (
                  <div className="flex items-center gap-1 py-1">
                    <span className="ai-typing-dot h-1.5 w-1.5 rounded-full" style={{ background: 'var(--ink)' }} />
                    <span className="ai-typing-dot h-1.5 w-1.5 rounded-full" style={{ background: 'var(--ink)' }} />
                    <span className="ai-typing-dot h-1.5 w-1.5 rounded-full" style={{ background: 'var(--ink)' }} />
                  </div>
                ) : (
                  <p className="text-[13px] leading-relaxed text-[color:var(--ink)]">{BUBBLE_MESSAGE}</p>
                )}
              </button>
            </div>
          )}

          <button
            onClick={handleLauncherClick}
            aria-label="Open AI assistant"
            className="
              group fixed right-4 sm:right-5 z-[9998]
              pl-4 pr-5 rounded-full
              flex items-center gap-2.5
              text-white font-medium text-[13px]
              transition-all duration-200 ease-out
              hover:scale-[1.03] active:scale-95
            "
            style={{
              height: 52,
              bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
              background: 'var(--ink)',
              boxShadow: '0 10px 26px -10px rgba(16,17,22,0.45), 0 4px 12px rgba(16,17,22,0.12)',
            }}
          >
            <span
              className="relative flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: 'rgba(255,255,255,0.14)' }}
            >
              <MessageSquare size={15} strokeWidth={2.1} />
              <span
                className="ai-pulse absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full"
                style={{ background: 'var(--signal)', boxShadow: '0 0 0 2px var(--ink)' }}
              />
            </span>
            <span>Ask AI</span>
          </button>
        </div>
      )}
    </>
  );
}