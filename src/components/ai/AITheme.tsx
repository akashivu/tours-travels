export function AIThemeStyles() {
  return (
    <style>{`
      .ai-root {
        --paper: #FFFFFF;
        --surface: #F7F7F8;
        --surface-strong: #EFEFF2;
        --ink: #16171B;
        --ink-soft: #4B4E58;
        --muted: #8A8C96;
        --border: #E5E5E9;
        --border-strong: #D7D7DD;
        --accent: #2563EB;
        --accent-soft: #EEF3FE;
        --accent-ink: #1D4ED8;
        --success: #16A34A;
        --shadow-sm: 0 1px 2px rgba(16,17,22,0.04), 0 4px 12px -8px rgba(16,17,22,0.18);
        --shadow-md: 0 2px 6px rgba(16,17,22,0.05), 0 14px 32px -18px rgba(16,17,22,0.28);
        -webkit-font-smoothing: antialiased;
        font-family: 'Inter', sans-serif;
      }
      .ai-root button, .ai-root textarea, .ai-root input {
        font-family: 'Inter', sans-serif;
      }

      .ai-root button, .ai-root textarea, .ai-root input, .ai-root [tabindex] {
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }
      .ai-root button:focus, .ai-root textarea:focus, .ai-root input:focus {
        outline: none;
        box-shadow: none;
      }
      .ai-root button:focus-visible, .ai-root textarea:focus-visible,
      .ai-root input:focus-visible, .ai-root [tabindex]:focus-visible {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-soft);
      }

      @keyframes ai-fade-up {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ai-fade-up { opacity: 0; animation: ai-fade-up 320ms cubic-bezier(0.16,1,0.3,1) forwards; }

      @keyframes ai-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .ai-fade-in { animation: ai-fade-in 220ms ease forwards; }

      @keyframes ai-pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
        70% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
      }
      .ai-pulse { animation: ai-pulse-ring 2.4s ease-out infinite; }

      @keyframes ai-typing-dot {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
        30% { transform: translateY(-3px); opacity: 1; }
      }
      .ai-typing-dot { animation: ai-typing-dot 1.3s ease-in-out infinite; }

      .ai-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
      .ai-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 999px; }
      .ai-scroll::-webkit-scrollbar-track { background: transparent; }

      @media (prefers-reduced-motion: reduce) {
        .ai-root * { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}