// GA4 needs Blast's Google account (cgaye6527@gmail.com) to create a property
// and issue a measurement ID — this is a no-op until VITE_GA_MEASUREMENT_ID is set.
export function initAnalytics(): void {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!id) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", id);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
