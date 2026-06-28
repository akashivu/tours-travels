const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

let loaded = false;

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (loaded) return;

  if (!CLARITY_PROJECT_ID) {
    console.warn("Missing Clarity Project ID");
    return;
  }

  loaded = true;

  
  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      ((window.clarity as any).q = (window.clarity as any).q || []).push(args);
    };

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;

  document.head.appendChild(script);

  console.info("Microsoft Clarity initialized.");
}

export function disableAnalytics() {
  console.info("Analytics disabled.");
}