// Build-time entry: scripts/prerender.js renders the page to a string with
// this and writes it into dist/index.html, so the HTML crawlers and preview
// bots receive carries the whole page rather than an empty #root. The client
// then hydrates it from main.jsx.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
