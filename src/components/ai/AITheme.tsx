export function AIThemeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

      .ai-root {
        /*
         * ============================================
         * ELIXWAY AI THEME — "Ask AI" clean edition
         * ============================================
         */

        --ai-canvas: #ffffff;
        --ai-card: #ffffff;
        --ai-card-soft: #f7f7f8;

        --ai-ink: #14161a;
        --ai-ink-soft: #52565f;
        --ai-muted: #9a9ea6;

        --ai-border: #ececee;
        --ai-border-strong: #e0e1e4;

        /*
         * Single accent, used sparingly:
         * the brand dot, active tab, focus ring,
         * send button, unread indicator.
         */

        --ai-accent: #ff5a1f;
        --ai-accent-soft: #fff1e9;
        --ai-accent-ink: #ff5a1f;

        --ai-success: #16803c;
        --ai-danger: #b42318;

        /* Radius scale — soft, consistent rounding */
        --ai-radius-xs: 8px;
        --ai-radius-sm: 12px;
        --ai-radius-md: 16px;
        --ai-radius-lg: 22px;
        --ai-radius-pill: 999px;

        --ai-shadow-sm:
          0 1px 2px rgba(20, 22, 26, 0.04);

        --ai-shadow-md:
          0 12px 32px rgba(20, 22, 26, 0.10);

        /*
         * ============================================
         * BACKWARD COMPATIBILITY
         * ============================================
         *
         * Existing components can continue using
         * --paper, --surface, --ink, etc.
         */

        --paper: var(--ai-card);
        --surface: var(--ai-card-soft);
        --surface-strong: #eef0f3;

        --ink: var(--ai-ink);
        --ink-soft: var(--ai-ink-soft);
        --muted: var(--ai-muted);

        --border: var(--ai-border);
        --border-strong: var(--ai-border-strong);

        --accent: var(--ai-accent);
        --accent-soft: var(--ai-accent-soft);
        --accent-ink: var(--ai-accent-ink);

        --success: var(--ai-success);

        --shadow-sm: var(--ai-shadow-sm);
        --shadow-md: var(--ai-shadow-md);

        --ai-font: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;

        -webkit-font-smoothing: antialiased;
        font-family: var(--ai-font);
        letter-spacing: -0.01em;
      }

      .ai-root button,
      .ai-root textarea,
      .ai-root input {
        font-family: var(--ai-font);
      }

      .ai-root button,
      .ai-root textarea,
      .ai-root input,
      .ai-root [tabindex] {
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .ai-root button:focus,
      .ai-root textarea:focus,
      .ai-root input:focus {
        outline: none;
        box-shadow: none;
      }

      .ai-root button:focus-visible,
      .ai-root textarea:focus-visible,
      .ai-root input:focus-visible,
      .ai-root [tabindex]:focus-visible {
        outline: none;
        border-color: var(--ai-accent);
        box-shadow:
          0 0 0 3px var(--ai-accent-soft);
      }

      /* Generic hover affordance for list rows / nav items */
      .ai-hover-row {
        transition: background-color 150ms ease, color 150ms ease;
      }

      .ai-hover-row:hover {
        background: var(--ai-card-soft);
      }

      .ai-hover-row[data-active="true"] {
        background: var(--ai-card-soft);
        font-weight: 500;
      }

      /*
       * ============================================
       * ANIMATIONS
       * ============================================
       */

      @keyframes ai-fade-up {
        from {
          opacity: 0;
          transform: translateY(8px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .ai-fade-up {
        animation:
          ai-fade-up
          320ms
          cubic-bezier(0.16, 1, 0.3, 1)
          forwards;
      }

      @keyframes ai-fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      .ai-fade-in {
        animation:
          ai-fade-in
          220ms
          ease
          forwards;
      }

      @keyframes ai-slide-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .ai-slide-in {
        animation:
          ai-slide-in
          300ms
          cubic-bezier(0.16, 1, 0.3, 1)
          forwards;
      }

      @keyframes ai-typing-dot {
        0%,
        60%,
        100% {
          transform: translateY(0);
          opacity: 0.35;
        }

        30% {
          transform: translateY(-3px);
          opacity: 1;
        }
      }

      .ai-typing-dot {
        animation:
          ai-typing-dot
          1.3s
          ease-in-out
          infinite;
      }

      @keyframes ai-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }

      .ai-pulse {
        animation: ai-pulse 1.8s ease-in-out infinite;
      }

      /*
       * ============================================
       * SCROLLBAR
       * ============================================
       */

      .ai-scroll::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      .ai-scroll::-webkit-scrollbar-thumb {
        background: var(--ai-border-strong);
        border-radius: 999px;
      }

      .ai-scroll::-webkit-scrollbar-track {
        background: transparent;
      }

      @keyframes travelCanvasIn {
        from {
          opacity: 0;
          transform: translateX(18px);
        }

        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /*
       * ============================================
       * REDUCED MOTION
       * ============================================
       */

      @media (prefers-reduced-motion: reduce) {
        .ai-root * {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}