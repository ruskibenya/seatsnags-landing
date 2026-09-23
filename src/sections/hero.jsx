import { Button, Stamp, Price, Perforation, Icon } from '../lib/ui.jsx';
import { SIGNUP_URL } from '../lib/links.js';

function LockScreen() {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-island"/>
        <div className="phone-clock">
          <div className="phone-date">Saturday, November 14</div>
          <div className="phone-time">9:41</div>
        </div>
        <div className="phone-notif">
          <div className="phone-notif-icon"><Icon name="mail" size={20}/></div>
          <div className="phone-notif-text">
            <div className="phone-notif-head">
              <span className="phone-notif-app">SeatSnags</span>
              <span className="phone-notif-when">now</span>
            </div>
            <div className="phone-notif-body">
              Snagged: <span className="t-mono">2</span> tickets to Rangers vs. Devils.
            </div>
          </div>
        </div>
        <div className="phone-dot phone-dot-l"/>
        <div className="phone-dot phone-dot-r"/>
        <div className="phone-home"/>
      </div>
    </div>
  );
}

// The numbers here are illustrative.
function WinReceipt() {
  return (
    <div className="receipt">
      <div className="receipt-body">
        <span className="eyebrow">Win receipt</span>
        <div className="receipt-lines">
          <div className="receipt-event">Rangers vs. Devils</div>
          <div className="receipt-when">Sat · Nov 14 · 7:00 PM</div>
          <div className="receipt-where">
            Madison Square Garden · 2 tickets<span className="sec-no">Sec 226</span>
          </div>
        </div>
      </div>
      <Perforation/>
      <div className="receipt-stub">
        <div className="receipt-prices">
          <div className="receipt-price">
            <span className="eyebrow">Your max</span>
            <Price value={60}/>
          </div>
          <div className="receipt-price">
            <span className="eyebrow">Charged</span>
            <Price value={47} tone="brand"/>
          </div>
        </div>
        <Stamp rotate={-8} size="receipt">Snagged</Stamp>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <Stamp rotate={-3} size="hero">Now live in New York</Stamp>
        <h1 className="headline headline-hero">
          Stop refreshing.<br/><span className="line-2">Start snagging.</span>
        </h1>
        <p className="hero-lead">You set the price. We&apos;ll find the tickets.</p>
        <p className="hero-body">
          Pick an event, choose where you&apos;d sit and set the most you&apos;d pay, fees included.
          SeatSnags watches the resale market around the clock and buys the moment tickets fit your max.
        </p>
        <div className="hero-actions">
          <Button href={SIGNUP_URL} size="lg" className="hero-cta">Set your price</Button>
          <a href="#how" className="hero-how">See how it works</a>
          <span className="hero-note">No snag, no charge.</span>
        </div>
      </div>
      <div className="hero-visual">
        <LockScreen/>
        <WinReceipt/>
      </div>
    </section>
  );
}
