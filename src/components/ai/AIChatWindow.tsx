import type {
  ChatState,
  Session,
} from "../../types/ai";

import { AIConversationPane } from "./workspace/AIConversationPane";
import { AIWorkspace } from "./workspace/AIWorkspace";

interface Props {
  state: ChatState;

  sessions: Session[];

  isLoadingSessions: boolean;

  onSend: (message: string) => void;

  onNewChat: () => void;

  onSelectSession: (
    sessionId: string
  ) => void;

  onDeleteSession: (
    sessionId: string
  ) => void;

  onClose: () => void;

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
  const handleThemeClick = () => {
    /*
     * Theme switching can be implemented
     * separately.
     */
  };

  return (
    <div
      className={
        inline
          ? `
              ai-root
              relative
              flex
              h-full
              min-h-0
              w-full
              flex-col
              overflow-hidden
            `
          : `
              ai-root
              fixed
              inset-0
              z-[9999]
              flex
              h-[100dvh]
              min-h-0
              w-screen
              flex-col
              overflow-hidden
            `
      }
      style={{
        background:
          "var(--ai-canvas)",
      }}
    >
      <AIWorkspace
        activeConversationId={
          state.sessionId
        }
        sessions={sessions}
        isLoadingSessions={
          isLoadingSessions
        }
        onNewChat={onNewChat}
        onClose={onClose}
        onThemeClick={
          handleThemeClick
        }
        onSelectConversation={(
          session
        ) => {
          onSelectSession(
            session.session_id
          );
        }}
        onDeleteConversation={(conversation) => {
  onDeleteSession(conversation.session_id);
}}
        onSelectPrompt={onSend}
      >
        <AIConversationPane
          state={state}
          onSend={onSend}
        />
      </AIWorkspace>
    </div>
  );
}