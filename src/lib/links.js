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

// Campaign links land here as seatsnags.com/?utm_source=…, but signup happens
// on the app's domain. Without carrying the params across that hop PostHog
// attributes every campaign signup to a direct visit, so hand them on.
const utm = () => {
  const incoming = new URLSearchParams(window.location.search);
  const carried = new URLSearchParams();
  for (const [key, value] of incoming) {
    if (key.startsWith('utm_')) carried.append(key, value);
  }
  const query = carried.toString();
  return query ? `?${query}` : '';
};

/** The signup href with the page's UTM params carried across.
 *
 *  The page is pre-rendered at build time, where there is no query string,
 *  so the HTML ships the plain URL (the server snapshot) and React swaps in
 *  the UTM-carrying one right after hydration. Reading the query during the
 *  first render instead would be a server/client mismatch, which React
 *  resolves by keeping the server href. */
let clientHref;
const getSnapshot = () => (clientHref ??= SIGNUP_URL + utm());
const getServerSnapshot = () => SIGNUP_URL;
const subscribe = () => () => {}; // the query string never changes in-page

export function useSignupUrl() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
