import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { inject } from '@vercel/analytics';

inject();

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships #root already filled by scripts/prerender.js,
// so attach to that markup. The dev server serves the raw index.html, where
// #root is empty, so render from scratch there.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
