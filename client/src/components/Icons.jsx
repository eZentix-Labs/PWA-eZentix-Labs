// Generic action icons (Lucide-style outline/solid) keyed by the `icon` field in config.
const actionIcons = {
  "bar-chart": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#2E9E6B">
      <rect x="4" y="13" width="4" height="7" rx="1.5" />
      <rect x="10" y="9" width="4" height="11" rx="1.5" />
      <rect x="16" y="5" width="4" height="15" rx="1.5" />
    </svg>
  ),
  "rupee-tag": (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M11.6 2.9 3.5 11a2 2 0 0 0 0 2.8l6.7 6.7a2 2 0 0 0 2.8 0l8.1-8.1V3.9a1 1 0 0 0-1-1h-8.5z"
        fill="#2F7FE0"
      />
      <circle cx="17.3" cy="6.7" r="1.5" fill="#fff" />
      <text
        x="10.3"
        y="15.6"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#fff"
      >
        ₹
      </text>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#E2873B" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="16" rx="3" fill="#F7A85C" stroke="none" />
      <path d="M3 10h18" stroke="#fff" />
      <path d="M8 3v3M16 3v3" stroke="#E2873B" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path
        d="M12 4c4.97 0 9 3.13 9 7s-4.03 7-9 7c-.9 0-1.78-.1-2.6-.3L5 19.5l.9-3A6.9 6.9 0 0 1 3 11c0-3.87 4.03-7 9-7z"
        fill="#7C3AED"
      />
      <g fill="#fff">
        <circle cx="8.5" cy="11" r="1.2" />
        <circle cx="12" cy="11" r="1.2" />
        <circle cx="15.5" cy="11" r="1.2" />
      </g>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M6 2h8l4 4v16H6z" fill="#D9A400" />
      <path d="M14 2l4 4h-4z" fill="#F3D06B" />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M9 11h6M9 14h6M9 17h4" />
      </g>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <rect x="2.5" y="7" width="19" height="13" rx="3" fill="#E05A5A" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" fill="none" stroke="#E05A5A" strokeWidth="2" />
      <path d="M2.5 12h19" stroke="#fff" strokeWidth="1.6" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#D6467F" strokeWidth="2" strokeLinecap="round">
      <circle cx="18" cy="5" r="2.6" fill="#D6467F" stroke="none" />
      <circle cx="6" cy="12" r="2.6" fill="#D6467F" stroke="none" />
      <circle cx="18" cy="19" r="2.6" fill="#D6467F" stroke="none" />
      <path d="M8.4 10.8 15.6 6.4M8.4 13.2l7.2 4.4" />
    </svg>
  ),
  // Official Google "G" mark — not recolored.
  google: (
    <svg viewBox="0 0 48 48" width="24" height="24">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.77 24c0-1.6.27-3.15.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
};

// Official social brand marks.
const socialIcons = {
  youtube: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"
      />
      <path fill="#fff" d="M9.6 15.6V8.4l6.2 3.6z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        fill="#fff"
        d="M15.4 12.8l.4-2.8h-2.7V8.2c0-.8.4-1.5 1.6-1.5h1.2V4.3s-1.1-.2-2.2-.2c-2.2 0-3.7 1.3-3.7 3.8V10H7.6v2.8H10v6.9h2.9v-6.9z"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <defs>
        <radialGradient id="ig" cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#FDD35C" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)" />
      <rect x="6" y="6" width="12" height="12" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="#fff" />
    </svg>
  ),
  reddit: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="11" fill="#FF4500" />
      <path
        fill="#fff"
        d="M18.9 11.5a1.7 1.7 0 0 0-2.9-1.2 8.4 8.4 0 0 0-4.2-1.3l.8-3.4 2.4.5a1.3 1.3 0 1 0 .2-1l-3-.6a.5.5 0 0 0-.6.4l-.9 4.1a8.4 8.4 0 0 0-4.2 1.3 1.7 1.7 0 1 0-1.9 2.8v.5c0 2.6 3 4.7 6.7 4.7s6.7-2.1 6.7-4.7v-.5a1.7 1.7 0 0 0 .9-1.6z"
      />
      <g fill="#FF4500">
        <circle cx="9.3" cy="13.2" r="1.2" />
        <circle cx="14.7" cy="13.2" r="1.2" />
      </g>
      <path d="M9.4 15.8a4 4 0 0 0 5.2 0" stroke="#FF4500" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
      <g fill="#fff">
        <rect x="5.6" y="9.5" width="2.8" height="9" />
        <circle cx="7" cy="6.7" r="1.7" />
        <path d="M10.4 9.5h2.7v1.2a3 3 0 0 1 2.7-1.4c2.1 0 3.2 1.3 3.2 3.8v5.4h-2.8v-4.8c0-1.2-.4-2-1.5-2-1 0-1.5.7-1.5 2v4.8h-2.8z" />
      </g>
    </svg>
  ),
  gbp: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="#4285F4" d="M3 4h18l1.4 5.1A3.1 3.1 0 0 1 19.4 13H4.6A3.1 3.1 0 0 1 1.6 9.1z" />
      <path fill="#34A853" d="M3 12h18v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path fill="#FBBC05" d="M8.6 4h6.8l.6 5.1A3.1 3.1 0 0 1 12 13a3.1 3.1 0 0 1-3-3.9z" />
      <circle cx="16.3" cy="16.3" r="3.6" fill="#fff" />
      <text x="16.3" y="18.1" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5" fontWeight="700" fill="#4285F4">
        G
      </text>
    </svg>
  )
};

export function ActionIcon({ name }) {
  return actionIcons[name] || actionIcons["document"];
}

export function SocialIcon({ name }) {
  return socialIcons[name] || null;
}
