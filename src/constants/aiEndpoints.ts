export const AI_ENDPOINTS = {
  CHAT: '/chat',
  SESSIONS: '/history/sessions',
  CONVERSATION: (sessionId: string) => `/history/${sessionId}`,
} as const;