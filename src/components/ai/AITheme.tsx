export function AIThemeStyles() {
  return (
    <style>{`
      .ai-root {
        --paper: #FFFFFF;
        --mist: #F5F5F7;
        --mist-strong: #EEEFF2;
        --ink: #101116;
        --ink-soft: #4A4C56;
        --muted: #8A8C96;
        --line: #E6E6EA;
        --line-strong: #D9D9E0;
        --signal: #4451C4;
        --signal-soft: #EEF0FC;
        --signal-ink: #2F3A9E;
        --charcoal: #1B1C22;
        --shadow-sm: 0 1px 2px rgba(16,17,22,0.04), 0 8px 20px -14px rgba(16,17,22,0.22);
        --shadow-md: 0 2px 6px rgba(16,17,22,0.05), 0 18px 40px -20px rgba(16,17,22,0.30);
        -webkit-font-smoothing: antialiased;
        font-family: 'Inter', sans-serif;
      }
      .ai-root button, .ai-root textarea, .ai-root input {
        font-family: 'Inter', sans-serif;
      }
      .ai-serif {
        font-family: 'Fraunces', serif;
      }

      /* Neutral keyboard focus state — no blue anywhere.
         Native outline is removed and replaced with a quiet ring drawn
         from the design system's own line/shadow tokens. */
      .ai-root button,
      .ai-root textarea,
      .ai-root input,
      .ai-root [tabindex] {
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .ai-root button:focus,
      .ai-root textarea:focus,
      .ai-root input:focus,
      .ai-root [tabindex]:focus {
        outline: none;
        box-shadow: none;
      }
      .ai-root button:focus-visible,
      .ai-root textarea:focus-visible,
      .ai-root input:focus-visible,
      .ai-root [tabindex]:focus-visible {
        outline: none;
        border-color: var(--line-strong);
        box-shadow: var(--shadow-sm);
      }

      @keyframes ai-fade-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ai-fade-up { opacity: 0; animation: ai-fade-up 420ms cubic-bezier(0.16,1,0.3,1) forwards; }

      @keyframes ai-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .ai-fade-in { animation: ai-fade-in 300ms ease forwards; }

      @keyframes ai-expand {
        from { opacity: 0; transform: scale(0.985); }
        to { opacity: 1; transform: scale(1); }
      }
      .ai-expand { animation: ai-expand 380ms cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: bottom right; }

      @keyframes ai-pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(68,81,196,0.35); }
        70% { box-shadow: 0 0 0 6px rgba(68,81,196,0); }
        100% { box-shadow: 0 0 0 0 rgba(68,81,196,0); }
      }
      .ai-pulse { animation: ai-pulse-ring 2.4s ease-out infinite; }

      @keyframes ai-typing-dot {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
        30% { transform: translateY(-3.5px); opacity: 1; }
      }
      .ai-typing-dot { animation: ai-typing-dot 1.3s ease-in-out infinite; }

      .ai-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
      .ai-scroll::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: 999px; }
      .ai-scroll::-webkit-scrollbar-track { background: transparent; }

      @media (prefers-reduced-motion: reduce) {
        .ai-root * { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}