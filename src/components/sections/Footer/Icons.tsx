type IconProps = { className?: string };

export const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.6 10.6 20 3h-2l-5.55 6.6L7.6 3H3l6.75 9.62L3 21h2l5.9-7 5.1 7H21l-7.4-10.4Zm-2.1 2.5-.68-.95L5.5 4.5h2l4.4 6.15.68.96 5.9 8.24h-2l-4.98-6.75Z" />
  </svg>
);

export const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
    <path d="M5.25 7.02a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92Z" />
    <path d="M9.75 8.5h3.24v1.64h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.06 2.25 4.06 5.18v6.93h-3.38v-6.15c0-1.46-.03-3.35-2.04-3.35-2.04 0-2.35 1.6-2.35 3.24v6.26H9.75V8.5Z" />
  </svg>
);