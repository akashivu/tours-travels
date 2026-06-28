import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import type { Message, ChatState, SessionsState } from '../types/ai';
import { aiService } from '../services/aiService';

export function useAIChat() {
  const [state, setState] = useState<ChatState>({
    sessionId: aiService.getOrCreateSessionId(),
    messages: [],
    isLoading: false,
    error: null,
  });

  const [sessionsState, setSessionsState] = useState<SessionsState>({
    sessions: [],
    isLoadingSessions: false,
  });

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    initialize();
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // --- initialization ---

  const initialize = useCallback(async () => {
    const sessions = await loadSessions();
    const currentExists = sessions.some(s => s.session_id === state.sessionId);

    if (currentExists) {
      await loadConversation(state.sessionId);
    }
    // if session doesn't exist on backend, keep empty chat — no error shown
  }, []);

  // --- sessions ---

  const loadSessions = useCallback(async () => {
    setSessionsState(prev => ({ ...prev, isLoadingSessions: true }));
    try {
      const sessions = await aiService.getSessions();
      setSessionsState({ sessions, isLoadingSessions: false });
      return sessions;
    } catch {
      setSessionsState(prev => ({ ...prev, isLoadingSessions: false }));
      return [];
    }
  }, []);

  // --- conversation ---

  const loadConversation = useCallback(async (sessionId: string) => {
    abortRef.current?.abort();
    try {
      const messages = await aiService.getConversation(sessionId);
      setState({
        sessionId,
        messages,
        isLoading: false,
        error: null,
      });
    } catch {
      setState(prev => ({
        ...prev,
        sessionId,
        error: "Couldn't load conversation. Please try again.",
      }));
    }
  }, []);

  // --- send message ---

  const sendMessage = useCallback(async (question: string) => {
    if (!question.trim() || state.isLoading) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question.trim(),
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await aiService.sendMessage(
        { session_id: state.sessionId, question: question.trim() },
        abortRef.current.signal,
      );

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));

      loadSessions();
    } catch (err) {
      if (axios.isCancel(err)) return;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to get a response.',
      }));
    }
  }, [state.sessionId, state.isLoading]);

  // --- new chat ---

  const startNewChat = useCallback(async () => {
    abortRef.current?.abort();
    const newSessionId = aiService.newSession();
    setState({
      sessionId: newSessionId,
      messages: [],
      isLoading: false,
      error: null,
    });
    await loadSessions();
  }, []);

  // --- delete ---

  const deleteConversation = useCallback(async (sessionId: string) => {
    try {
      await aiService.deleteConversation(sessionId);
    } catch {
      // best effort
    }

    if (sessionId === state.sessionId) {
      const newSessionId = aiService.newSession();
      setState({
        sessionId: newSessionId,
        messages: [],
        isLoading: false,
        error: null,
      });
    }

    await loadSessions();
  }, [state.sessionId]);

  // --- clear error ---

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

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