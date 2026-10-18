import { useSyncExternalStore } from 'react';

// Every destination lives in the app, not here. Privacy and Terms in
// particular are deliberately not copied into this repo: the versioned
// originals live in the app and the backend checks their version at signup,
// so a second copy here would be the one that goes stale.
const APP = 'https://app.seatsnags.com';

export const LOGIN_URL = APP;
export const PRIVACY_URL = `${APP}/privacy`;
export const TERMS_URL = `${APP}/terms`;
export const SIGNUP_URL = `${APP}/auth/sign-up`;
export const DISCOVER_URL = `${APP}/discover`;

// Campaign links land here as seatsnags.com/?utm_source=…, but signup and
// browsing happen on the app's domain. Without carrying the params across
// that hop PostHog attributes every campaign visit to a direct one, so hand
// them on.
const utm = () => {
  const incoming = new URLSearchParams(window.location.search);
  const carried = new URLSearchParams();
  for (const [key, value] of incoming) {
    if (key.startsWith('utm_')) carried.append(key, value);
  }
  const query = carried.toString();
  return query ? `?${query}` : '';
};

/** An app href with the page's UTM params carried across.
 *
 *  The page is pre-rendered at build time, where there is no query string,
 *  so the HTML ships the plain URL (the server snapshot) and React swaps in
 *  the UTM-carrying one right after hydration. Reading the query during the
 *  first render instead would be a server/client mismatch, which React
 *  resolves by keeping the server href. */
const clientHrefs = new Map(); // snapshots must be stable between renders
const subscribe = () => () => {}; // the query string never changes in-page

export function useAppUrl(base) {
  const getSnapshot = () => {
    if (!clientHrefs.has(base)) clientHrefs.set(base, base + utm());
    return clientHrefs.get(base);
  };
  return useSyncExternalStore(subscribe, getSnapshot, () => base);
}

export function useSignupUrl() {
  return useAppUrl(SIGNUP_URL);
}
