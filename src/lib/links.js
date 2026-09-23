// Every destination lives in the app, not here. Privacy and Terms in
// particular are deliberately not copied into this repo: the versioned
// originals live in the app and the backend checks their version at signup,
// so a second copy here would be the one that goes stale.
const APP = 'https://app.seatsnags.com';

export const LOGIN_URL = APP;
export const PRIVACY_URL = `${APP}/privacy`;
export const TERMS_URL = `${APP}/terms`;

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

// Read once, at load: the landing page never changes its own query string.
export const SIGNUP_URL = `${APP}/auth/sign-up${utm()}`;
