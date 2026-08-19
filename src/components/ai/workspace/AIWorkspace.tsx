import { AIWorkspaceHeader } from "./AIWorkspaceHeader";
import { ConversationHistory } from "./history/ConversationHistory";

import type { Session } from "../../../types/ai";

interface AIWorkspaceProps {
  children: React.ReactNode;

  activeConversationId?: string;

  sessions: Session[];

  isLoadingSessions?: boolean;

  onNewChat?: () => void;

  onClose?: () => void;

  onThemeClick?: () => void;

  onSelectConversation?: (
    conversation: Session
  ) => void;

  onDeleteConversation?: (
  conversation: Session
) => void;

  /*
   * Passed straight through to the sidebar's
   * empty-state quick-start prompts.
   */

  onSelectPrompt?: (prompt: string) => void;
}

export function AIWorkspace({
  children,
  activeConversationId,
  sessions,
  isLoadingSessions = false,
  onNewChat,
  onClose,
  onThemeClick,
 onSelectConversation,
onSelectPrompt,
}: AIWorkspaceProps) {
  return (
    <div
      className="
        ai-root
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
      "
      style={{
        background: "var(--ai-canvas)",
      }}
    >
      {/* =====================================================
          AI HEADER
      ====================================================== */}

      <div className="shrink-0">
        <AIWorkspaceHeader
          onNewChat={onNewChat}
          onClose={onClose}
          onThemeClick={onThemeClick}
        />
      </div>

      {/* =====================================================
          MAIN AI APPLICATION
      ====================================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        {/* ===================================================
            CONVERSATION HISTORY
        ==================================================== */}

        <ConversationHistory
          sessions={sessions}
          isLoading={isLoadingSessions}
          activeConversationId={
            activeConversationId
          }
          onNewChat={onNewChat}
          onSelectConversation={
            onSelectConversation
          }
          onSelectPrompt={onSelectPrompt}
        />

        {/* ===================================================
            AI CONVERSATION
        ==================================================== */}

        <main
          className="
            relative
            flex
            min-h-0
            min-w-0
            flex-1
            flex-col
            overflow-hidden
          "
          style={{
            background:
              "var(--ai-canvas)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}