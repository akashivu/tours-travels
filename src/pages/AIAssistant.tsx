import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AIThemeStyles } from "../components/ai/AITheme";
import { AIChatWindow } from "../components/ai/AIChatWindow";
import { useAIChat } from "../hooks/useAIChat";

interface NavigationState {
  message?: string;
  source?: string;
}

export default function AIAssistant() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    state,
    sessionsState,
    sendMessage,
    startNewChat,
    loadConversation,
    deleteConversation,
  } = useAIChat();

  /*
   * Prevent the same navigation prompt
   * from being sent more than once.
   */
  const handledLocationKey = useRef<string | null>(null);

  useEffect(() => {
    const navigationState =
      location.state as NavigationState | null;

    const message = navigationState?.message?.trim();

    if (
      !message ||
      handledLocationKey.current === location.key
    ) {
      return;
    }

    handledLocationKey.current = location.key;

    /*
     * Send the prompt directly to Elixway AI.
     */
    sendMessage(message);

    /*
     * Clear navigation state after handling the prompt.
     * This prevents the prompt from being sent again
     * if the page re-renders.
     */
    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [
    location.key,
    location.pathname,
    location.state,
    navigate,
    sendMessage,
  ]);

  return (
    <div
      className="
        ai-root
        flex
        h-[100dvh]
        min-h-0
        w-full
        max-w-full
        overflow-hidden
      "
      style={{
        background: "var(--ai-canvas)",
      }}
    >
      <AIThemeStyles />

      <AIChatWindow
        state={state}
        sessions={sessionsState.sessions}
        isLoadingSessions={
          sessionsState.isLoadingSessions
        }
        onSend={sendMessage}
        onNewChat={startNewChat}
        onSelectSession={loadConversation}
        onDeleteSession={deleteConversation}
        onClose={() => {}}
        inline
      />
    </div>
  );
}