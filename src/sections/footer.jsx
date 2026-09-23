import { Icon } from '../lib/ui.jsx';
import { Logo } from '../lib/logo.jsx';
import { PRIVACY_URL, TERMS_URL } from '../lib/links.js';

// Single feedback intake (INT-022) — the same Notion form the app links to.
const FEEDBACK_URL = 'https://dot-second-a10.notion.site/39f7ba04f36f80bf808be73a0550ef25?pvs=105';

const SOCIALS = [
  ['instagram', 'Instagram', 'https://www.instagram.com/seatsnags/'],
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/company/seatsnags/'],
  ['facebook', 'Facebook', 'https://www.facebook.com/profile.php?id=61590691582009'],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-logo"><Logo/></span>
        {/* The design reads "SeatSnags"; the legal entity has been SeatSnags
            Inc., a Delaware corporation, since the C-corp conversion. */}
        <span className="footer-legal">© <span className="t-mono">2026</span> SeatSnags Inc. · New York</span>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <a href="mailto:support@seatsnags.com" className="footer-link">support@seatsnags.com</a>
          <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Send feedback</a>
          {/* The versioned originals live in the app, which checks their
              version at signup; a copy here would be the one that goes stale. */}
          <a href={PRIVACY_URL} className="footer-link">Privacy</a>
          <a href={TERMS_URL} className="footer-link">Terms</a>
        </div>
        <div className="footer-socials">
          {SOCIALS.map(([name, label, href]) => (
            <a key={name} href={href} aria-label={label} className="footer-social"
              target="_blank" rel="noopener noreferrer">
              <Icon name={name} size={16}/>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
