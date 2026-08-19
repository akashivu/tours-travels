import { AIThemeStyles } from "../components/ai/AITheme";
import { AIChatWindow } from "../components/ai/AIChatWindow";
import { useAIChat } from "../hooks/useAIChat";

export default function AIAssistant() {
  const {
    state,
    sessionsState,
    sendMessage,
    startNewChat,
    loadConversation,
    deleteConversation,
  } = useAIChat();

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
        background:
          "var(--ai-canvas)",
      }}
    >
      <AIThemeStyles />

      <AIChatWindow
        state={state}
        sessions={
          sessionsState.sessions
        }
        isLoadingSessions={
          sessionsState.isLoadingSessions
        }
        onSend={sendMessage}
        onNewChat={startNewChat}
        onSelectSession={
          loadConversation
        }
        onDeleteSession={
          deleteConversation
        }
        onClose={() => {}}
        inline
      />
    </div>
  );
}