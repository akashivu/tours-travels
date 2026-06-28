interface Suggestion {
  label: string;
  question: string;
}

export const AI_SUGGESTIONS: Suggestion[] = [
  { label: 'Plan a trip',      question: 'Can you help me plan a trip?' },
  { label: 'Find hotels',      question: 'What hotels do you recommend?' },
  { label: 'Book a flight',    question: 'How do I book a flight?' },
  { label: 'Top destinations', question: 'What are the top travel destinations?' },
  { label: 'Budget travel',    question: 'What are some budget travel tips?' },
];