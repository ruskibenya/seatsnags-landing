import { Button } from '../lib/ui.jsx';
import { Logo } from '../lib/logo.jsx';
import { SIGNUP_URL, LOGIN_URL } from '../lib/links.js';

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-logo" aria-label="SeatSnags home"><Logo/></a>
      <div className="nav-right">
        <a href={LOGIN_URL} className="nav-login">Log in</a>
        {/* "Set your price" with nothing above it reads as a pricing page; the
            hero and closing block keep the verb because their copy sets it up.
            Same signup URL either way. */}
        <Button href={SIGNUP_URL}>Sign up</Button>
      </div>
    </header>
  );
}
