import axios from 'axios';
import type { ChatResponse, SendMessagePayload, Session, Message } from '../types/ai';
import { AI_ENDPOINTS } from '../constants/aiEndpoints';

const SESSION_KEY = 'AI_SESSION_ID';
const GUEST_KEY = 'AI_GUEST_ID';
const WIDGET_OPEN_KEY = 'AI_WIDGET_OPEN';


const aiClient = axios.create({
  baseURL: import.meta.env.VITE_AI_BASE_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

aiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) return 'Session expired. Please log in again.';
    if (status === 429) return 'Too many requests. Please wait a moment.';
    if (status === 503) return 'Our AI is temporarily unavailable. Please try again shortly.';
    if (status && status >= 500) return 'Something went wrong on our end. Please try again.';
    if (!error.response) return 'No connection. Please check your internet.';
  }
  return 'Failed to get a response. Please try again.';
}

export const aiService = {
  // --- session id management ---

  getOrCreateSessionId(): string {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  },

  getOrCreateGuestId(): string {
  const existing = localStorage.getItem(GUEST_KEY);

  if (existing) {
    return existing;
  }

  const guestId = crypto.randomUUID();
  localStorage.setItem(GUEST_KEY, guestId);

  return guestId;
},
  newSession(): string {
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  },
  setSessionId(sessionId: string): void {
  localStorage.setItem(
    SESSION_KEY,
    sessionId
  );
},
  // --- widget open state ---

  getWidgetOpen(): boolean {
    return localStorage.getItem(WIDGET_OPEN_KEY) === 'true';
  },

  setWidgetOpen(open: boolean): void {
    localStorage.setItem(WIDGET_OPEN_KEY, String(open));
  },

  // --- api methods ---

  async sendMessage(
    payload: SendMessagePayload,
    signal?: AbortSignal,
  ): Promise<ChatResponse> {
    try {
      const { data } = await aiClient.post(
  AI_ENDPOINTS.CHAT,
  {
    ...payload,
    guest_id: this.getOrCreateGuestId(),
  },
  { signal },
);
      return data;
    } catch (error) {
      if (axios.isCancel(error)) throw error;
      throw new Error(getErrorMessage(error));
    }
  },

  async getSessions(): Promise<Session[]> {
    const { data } = await aiClient.get(AI_ENDPOINTS.SESSIONS);
    return data.sessions || [];
  },

  async getConversation(sessionId: string): Promise<Message[]> {
    const { data } = await aiClient.get(AI_ENDPOINTS.CONVERSATION(sessionId));
    const messages: Message[] = (data.messages || []).map(
      (m: { role: string; content: string }, _i: number) => ({
        id: crypto.randomUUID(),
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: new Date(),
      }),
    );
    return messages;
  },

  async deleteConversation(sessionId: string): Promise<void> {
    await aiClient.delete(AI_ENDPOINTS.CONVERSATION(sessionId));
  },
};