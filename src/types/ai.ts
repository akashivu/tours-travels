export interface PhotoAttribution {
  display_name?: string | null;
  uri?: string | null;
}

export interface PlaceVisual {
  name: string;
  place_id?: string | null;
  address?: string | null;
  google_maps_url?: string | null;
  image_url?: string | null;
  attributions?: PhotoAttribution[];
}

export interface VisualDay {
  day: number;
  title: string;
  places: PlaceVisual[];
}

export interface ChatVisuals {
  destination?: PlaceVisual | null;
  days?: VisualDay[];
}

export interface ChatMetadata {
  visuals?: ChatVisuals;
  [key: string]: unknown;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: ChatMetadata;
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
  intent?: string | null;
  completed?: boolean;
  metadata?: ChatMetadata | null;
}

export interface SuggestedQuestion {
  id: string;
  question: string;
}