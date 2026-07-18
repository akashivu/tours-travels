export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Session {
  session_id: string;
  created_at: string;
  last_active: string;
}

export interface ChatState {
  sessionId: string;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface SessionsState {
  sessions: Session[];
  isLoadingSessions: boolean;
}

export interface SendMessagePayload {
  session_id: string;
  question: string;
  guest_id?: string;
}

export interface ChatResponse {
  session_id: string;
  answer: string;
}
export interface SuggestedQuestion {
    id: string;
    question: string;
}