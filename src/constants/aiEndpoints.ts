export const AI_ENDPOINTS = {
  CHAT:                            '/api/chat',
  SESSIONS:                        '/history/sessions',
  CONVERSATION: (sessionId: string) => `/history/${sessionId}`,
} as const;