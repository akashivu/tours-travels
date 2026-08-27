import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { AIThemeStyles } from "../components/ai/AITheme";
import { AIChatWindow } from "../components/ai/AIChatWindow";
import { AITravelMap } from "../components/ai/AITravelMap";
import { useAIChat } from "../hooks/useAIChat";
import {
  extractTravelLocations,
} from "../utils/extractTravelLocations";

interface NavigationState {
  message?: string;
  source?: string;
}

export default function AIAssistant() {
  const location = useLocation();
  const navigate = useNavigate();

  /*
   * Stores the latest user prompt so the map
   * can detect origin and destination.
   */
  const [mapPrompt, setMapPrompt] =
    useState<string>("");

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
  const handledLocationKey = useRef<string | null>(
    null
  );

  /*
   * Handles messages sent directly from the AI chat.
   *
   * The original sendMessage functionality remains
   * unchanged; we additionally pass the prompt to
   * the map.
   */
  const handleSendMessage = (
    message: string
  ) => {
    setMapPrompt(message);
    sendMessage(message);
  };

  /*
   * Handle prompts passed through navigation state.
   *
   * For example:
   * A user clicks a card on the homepage →
   * navigates to /ai with a prompt.
   */
  useEffect(() => {
    const navigationState =
      location.state as NavigationState | null;

    const message =
      navigationState?.message?.trim();

    if (
      !message ||
      handledLocationKey.current === location.key
    ) {
      return;
    }

    handledLocationKey.current =
      location.key;

    /*
     * Store the prompt for the travel map.
     */
    setMapPrompt(message);

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
  const {
  origin,
  destination,
} = extractTravelLocations(mapPrompt);
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

      {/* ===============================================
          AI + TRAVEL MAP WORKSPACE
      ================================================ */}
      <div
        className="
          flex
          h-full
          min-h-0
          w-full
          overflow-hidden
        "
      >
        {/* =============================================
            AI CHAT
        ============================================== */}
        <div
          className="
            min-w-0
            flex-1
          "
        >
          <AIChatWindow
            state={state}
            sessions={sessionsState.sessions}
            isLoadingSessions={
              sessionsState.isLoadingSessions
            }
            onSend={handleSendMessage}
            onNewChat={startNewChat}
            onSelectSession={loadConversation}
            onDeleteSession={deleteConversation}
            onClose={() => {}}
            inline
          />
        </div>

       
        <aside
          className="
            hidden
            min-w-[420px]
            flex-1
            overflow-hidden
            border-l
            border-neutral-200
            bg-neutral-100
            lg:block
          "
        >
          <AITravelMap
  origin={origin}
  destination={destination}
/>
        </aside>
      </div>
    </div>
  );
}