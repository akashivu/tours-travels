import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import type {
  ChatState,
  Message,
  SessionsState,
} from "../types/ai";

import { aiService } from "../services/aiService";

export function useAIChat() {
  /* =========================================================
     CHAT STATE
  ========================================================= */

  const [state, setState] = useState<ChatState>(() => ({
    sessionId:
      aiService.getOrCreateSessionId(),
    messages: [],
    isLoading: false,
    error: null,
  }));

  /* =========================================================
     SESSIONS STATE
  ========================================================= */

  const [sessionsState, setSessionsState] =
    useState<SessionsState>({
      sessions: [],
      isLoadingSessions: false,
    });

  /* =========================================================
     ACTIVE SESSION REF

     Keeps the latest session ID available to
     async callbacks without relying on stale
     React state closures.
  ========================================================= */

  const sessionIdRef = useRef(
    state.sessionId
  );

  /* =========================================================
     ABORT CONTROLLER
  ========================================================= */

  const abortRef =
    useRef<AbortController | null>(null);

  /* =========================================================
     KEEP REF IN SYNC
  ========================================================= */

  useEffect(() => {
    sessionIdRef.current =
      state.sessionId;
  }, [state.sessionId]);

  /* =========================================================
     LOAD SESSIONS
  ========================================================= */

  const loadSessions =
    useCallback(async () => {
      setSessionsState((prev) => ({
        ...prev,
        isLoadingSessions: true,
      }));

      try {
        const sessions =
          await aiService.getSessions();

        setSessionsState({
          sessions,
          isLoadingSessions: false,
        });

        return sessions;
      } catch {
        setSessionsState((prev) => ({
          ...prev,
          isLoadingSessions: false,
        }));

        return [];
      }
    }, []);

  /* =========================================================
     LOAD CONVERSATION
  ========================================================= */

  const loadConversation =
    useCallback(
      async (sessionId: string) => {
        /*
         * Cancel an existing request.
         */
        abortRef.current?.abort();

        try {
          const messages =
            await aiService.getConversation(
              sessionId
            );

          /*
           * Make the selected conversation
           * the active session.
           */
          sessionIdRef.current =
            sessionId;

          aiService.setSessionId(
            sessionId
          );

          setState({
            sessionId,
            messages,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          if (axios.isCancel(error)) {
            return;
          }

          setState((prev) => ({
            ...prev,
            sessionId,
            isLoading: false,
            error:
              "Couldn't load conversation. Please try again.",
          }));
        }
      },
      []
    );

  /* =========================================================
     INITIALIZATION
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const sessions =
        await loadSessions();

      if (!mounted) {
        return;
      }

      const currentSessionId =
        sessionIdRef.current;

      const currentExists =
        sessions.some(
          (session) =>
            session.session_id ===
            currentSessionId
        );

      /*
       * If the current local session already
       * exists on the backend, restore it.
       */
      if (currentExists) {
        await loadConversation(
          currentSessionId
        );
      }
    };

    void initialize();

    return () => {
      mounted = false;
      abortRef.current?.abort();
    };

    // Intentionally initialize once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const sendMessage =
    useCallback(
      async (question: string) => {
        const trimmedQuestion =
          question.trim();

        const currentSessionId =
          sessionIdRef.current;

        if (
          !trimmedQuestion ||
          state.isLoading
        ) {
          return;
        }

        /*
         * Cancel previous request.
         */
        abortRef.current?.abort();

        const controller =
          new AbortController();

        abortRef.current =
          controller;

        /* -----------------------------------------------------
           USER MESSAGE
        ------------------------------------------------------ */

        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: "user",
          content: trimmedQuestion,
          timestamp: new Date(),
        };

        setState((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            userMessage,
          ],
          isLoading: true,
          error: null,
        }));

        try {
          /* ---------------------------------------------------
             API REQUEST
          ---------------------------------------------------- */

          const response =
            await aiService.sendMessage(
              {
                session_id:
                  currentSessionId,

                question:
                  trimmedQuestion,
              },
              controller.signal
            );

          /*
           * Backend is the source of truth.
           */
          const resolvedSessionId =
            response.session_id ||
            currentSessionId;

          /*
           * Keep React + localStorage +
           * ref synchronized.
           */
          sessionIdRef.current =
            resolvedSessionId;

          aiService.setSessionId(
            resolvedSessionId
          );

          /* ---------------------------------------------------
             ASSISTANT MESSAGE
          ---------------------------------------------------- */

          const assistantMessage: Message = {
  id: crypto.randomUUID(),
  role: "assistant",
  content: response.answer,
  timestamp: new Date(),
  metadata: response.metadata ?? undefined,
};

          /* ---------------------------------------------------
             UPDATE CHAT
          ---------------------------------------------------- */

          setState((prev) => ({
            ...prev,
            sessionId:
              resolvedSessionId,
            messages: [
              ...prev.messages,
              assistantMessage,
            ],
            isLoading: false,
            error: null,
          }));

          /* ---------------------------------------------------
             REFRESH HISTORY
          ---------------------------------------------------- */

          await loadSessions();
        } catch (error) {
          if (axios.isCancel(error)) {
            return;
          }

          setState((prev) => ({
            ...prev,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to get a response.",
          }));
        }
      },
      [
        state.isLoading,
        loadSessions,
      ]
    );

  /* =========================================================
     START NEW CHAT
  ========================================================= */

  const startNewChat =
    useCallback(() => {
      /*
       * Cancel active request.
       */
      abortRef.current?.abort();

      /*
       * Create completely independent
       * session.
       */
      const newSessionId =
        aiService.newSession();

      sessionIdRef.current =
        newSessionId;

      setState({
        sessionId: newSessionId,
        messages: [],
        isLoading: false,
        error: null,
      });
    }, []);

  /* =========================================================
     DELETE CONVERSATION
  ========================================================= */

  const deleteConversation =
    useCallback(
      async (sessionId: string) => {
        /*
         * Cancel current request if deleting
         * the active conversation.
         */
        if (
          sessionId ===
          sessionIdRef.current
        ) {
          abortRef.current?.abort();
        }

        try {
          await aiService.deleteConversation(
            sessionId
          );
        } catch {
          /*
           * Best effort.
           */
        }

        /*
         * If deleting the active conversation,
         * immediately move the UI to a fresh chat.
         */
        if (
          sessionId ===
          sessionIdRef.current
        ) {
          const newSessionId =
            aiService.newSession();

          sessionIdRef.current =
            newSessionId;

          setState({
            sessionId: newSessionId,
            messages: [],
            isLoading: false,
            error: null,
          });
        }

        /*
         * Refresh sidebar.
         */
        await loadSessions();
      },
      [loadSessions]
    );

  /* =========================================================
     CLEAR ERROR
  ========================================================= */

  const clearError =
    useCallback(() => {
      setState((prev) => ({
        ...prev,
        error: null,
      }));
    }, []);

  /* =========================================================
     RETURN
  ========================================================= */

  return {
    state,

    sessionsState,

    sendMessage,

    startNewChat,

    loadConversation,

    deleteConversation,

    clearError,
  };
}