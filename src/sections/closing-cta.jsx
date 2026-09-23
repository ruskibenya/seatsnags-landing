import { Button } from '../lib/ui.jsx';
import { SIGNUP_URL } from '../lib/links.js';

export function ClosingCta() {
  return (
    <section className="cta">
      <h2 className="headline headline-close">Set your price.</h2>
      <p className="cta-body">
        Pick an event, set your max and get on with your week. We&apos;ll let you know when you&apos;re in.
      </p>
      <div className="cta-actions">
        <Button href={SIGNUP_URL} size="lg" className="cta-btn">Set your price</Button>
        <div className="cta-note">Works in your browser. Add it to your home screen in two taps.</div>
      </div>
    </section>
  );
}
