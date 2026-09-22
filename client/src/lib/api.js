const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function fetchLinks() {
  const res = await fetch(`${API_BASE}/links`);
  if (!res.ok) throw new Error("Failed to load links");
  return res.json();
}

export function trackClick(key, type) {
  // fire-and-forget; never blocks navigation
  try {
    const body = JSON.stringify({ key, type });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API_BASE}/clicks`, new Blob([body], { type: "application/json" }));
    } else {
      fetch(`${API_BASE}/clicks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true
      }).catch(() => {});
    }
  } catch {
    /* ignore */
  }
}
