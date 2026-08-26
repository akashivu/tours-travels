import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AIWorkspaceHeader } from "./AIWorkspaceHeader";
import { ConversationHistory } from "./history/ConversationHistory";
import AuthModal from "../../AuthModal";

import type { Session } from "../../../types/ai";

interface AIWorkspaceProps {
  children: React.ReactNode;

  activeConversationId?: string;

  sessions: Session[];

  isLoadingSessions?: boolean;

  onNewChat?: () => void;

  /*
   * Optional callback for when AI is minimized.
   * The parent can use this if additional state needs updating.
   */
  onMinimize?: () => void;

  /*
   * Existing close callback.
   */
  onClose?: () => void;

  /*
   * Theme callback.
   * Kept for compatibility with AIChatWindow.
   */
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
  onMinimize,
  onClose,
  onSelectConversation,
  onDeleteConversation,
  onSelectPrompt,
}: AIWorkspaceProps) {
  const navigate = useNavigate();

  /* =========================================================
     AUTH MODAL
  ========================================================= */

  const [authOpen, setAuthOpen] = useState(false);

  const handleSignIn = () => {
    setAuthOpen(true);
  };

  /*
   * MINIMIZE
   * Return to homepage but keep AI available
   * through the floating "Ask Elixway AI" button.
   */
  const handleMinimize = () => {
    sessionStorage.setItem(
      "elixway-ai-minimized",
      "true"
    );

    // Allow optional parent logic
    onMinimize?.();

    navigate("/");
  };

  /*
   * CLOSE
   * Return to homepage and remove minimized state.
   */
  const handleClose = () => {
    sessionStorage.removeItem(
      "elixway-ai-minimized"
    );

    // Run any existing close functionality
    onClose?.();

    navigate("/");
  };

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
          onMinimize={handleMinimize}
          onClose={handleClose}
          
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
          onDeleteConversation={
            onDeleteConversation
          }
          onSelectPrompt={onSelectPrompt}
          onSignIn={handleSignIn}
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
            background: "var(--ai-canvas)",
          }}
        >
          {children}
        </main>
      </div>

      {/* =====================================================
          AUTHENTICATION MODAL
      ====================================================== */}

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}