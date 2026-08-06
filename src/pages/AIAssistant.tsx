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
      className="ai-root h-[90vh] w-full max-w-full overflow-hidden"
      style={{ border: "1px solid var(--border)", borderRadius: 12 }}
    >
      <AIThemeStyles />
      <AIChatWindow
        state={state}
        sessions={sessionsState.sessions}
        isLoadingSessions={sessionsState.isLoadingSessions}
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