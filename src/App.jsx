import { useState, useEffect } from 'react';
import { Icon, Button, Badge, Pulse } from './lib/ui.jsx';
import { IOSDevice } from './lib/ios-frame.jsx';
import { BidSetupScreen, BidStatusScreen, BidActivatedScreen } from './lib/phone-screens.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSlider } from './lib/tweaks-panel.jsx';
import logoGlyph from './assets/logo-glyph.svg';
import mauriceImg from './assets/maurice.png';
import benjaminImg from './assets/benjamin.jpg';
import madelineImg from './assets/madeline.png';

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setMatch(m.matches);
    m.addEventListener('change', fn);
    return () => m.removeEventListener('change', fn);
  }, [query]);
  return match;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.setAttribute('data-shown', ''); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const GREENS = {
  Evergreen: { '--primary': '#1F7A5E', '--primary-fg': '#105A45', '--primary-soft': '#ECF5F1', '--on-primary': '#FFFFFF' },
  Forest:    { '--primary': '#3B6D11', '--primary-fg': '#27500A', '--primary-soft': '#EAF3DE', '--on-primary': '#FFFFFF' },
};

const WORDMARK = ({ size = 22 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
    <img src={logoGlyph} alt="" width={size + 6} height={size + 6} style={{ display: 'block' }}/>
    <span style={{ fontFamily: 'var(--font-display)', fontSize: size, letterSpacing: '-0.02em', color: 'var(--primary-fg)', lineHeight: 1 }}>
      <span style={{ fontWeight: 400 }}>Seat</span><span style={{ fontWeight: 500 }}>Snags</span>
    </span>
  </span>
);

const eyebrow = { fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-fg)' };
const mono = { fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' };

function Phone({ scale, children, style }) {
  return (
    <div style={{ width: 390 * scale, height: 844 * scale, position: 'relative', flexShrink: 0, ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <IOSDevice width={390} height={844}>{children}</IOSDevice>
      </div>
    </div>
  );
}

function PhoneStack({ layout }) {
  const mobile = useMedia('(max-width: 860px)');
  if (mobile) {
    return (
      <div className="phone-scroll" style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '8px 24px 20px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        {[BidSetupScreen, BidStatusScreen, BidActivatedScreen].map((S, i) => (
          <div key={i} style={{ scrollSnapAlign: 'center', filter: 'drop-shadow(0 24px 40px rgba(11,22,32,0.16))' }}>
            <Phone scale={0.6}><S/></Phone>
          </div>
        ))}
      </div>
    );
  }
  const s = 0.52;
  const screens = [BidSetupScreen, BidStatusScreen, BidActivatedScreen];
  const stagger = layout === 'Staggered';
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {screens.map((S, i) => (
        <div key={i} style={{
          marginTop: stagger ? i * 56 : 0,
          marginLeft: i === 0 ? 0 : (stagger ? -38 : 18),
          zIndex: i,
          filter: `drop-shadow(0 30px 50px rgba(11,22,32,${0.10 + i * 0.04}))`,
          transition: 'margin 360ms var(--ease-ios)',
        }}>
          <Phone scale={s}><S/></Phone>
        </div>
      ))}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: scrolled ? 'rgba(250,248,244,0.82)' : 'rgba(250,248,244,0)',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background 240ms, border-color 240ms',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ textDecoration: 'none' }}><WORDMARK/></a>
        <Button href="#waitlist" kind="primary">Get beta access</Button>
      </div>
    </header>
  );
}

function Hero({ layout }) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        maxWidth: 1180, margin: '0 auto', padding: '40px 24px 64px',
        display: 'grid', gap: 32, alignItems: 'center',
        gridTemplateColumns: 'var(--hero-cols, 1.05fr 1fr)',
      }} className="hero-grid">
        <div data-reveal style={{ maxWidth: 540 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px 6px 9px', borderRadius: 999, background: 'var(--primary-soft)', border: '1px solid rgba(31,122,94,0.22)', marginBottom: 22, whiteSpace: 'nowrap', maxWidth: '100%' }}>
            <Pulse tone="snag" size={7}/>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600, color: 'var(--primary-fg)', letterSpacing: '-0.005em' }}>Automated ticket bidding · Launching in NYC</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6.4vw, 66px)', lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--fg-1)', margin: 0, textWrap: 'balance' }}>
            Stop refreshing.<br/><span style={{ color: 'var(--primary-fg)' }}>Start snagging.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(16px, 1.9vw, 18.5px)', lineHeight: 1.5, color: 'var(--fg-2)', margin: '22px 0 0', maxWidth: 480 }}>
            Set your max price. SeatSnags watches the market 24/7 and buys automatically the moment tickets drop into your range. You&apos;re only charged if we snag them.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, marginTop: 32 }}>
            <Button href="#waitlist" kind="primary" size="lg" trailing={<Icon name="arrowR" size={19}/>}>Get beta access</Button>
            <a href="#how" style={{ fontFamily: 'var(--font-ui)', fontSize: 15.5, fontWeight: 600, color: 'var(--fg-1)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }} className="link-arrow">
              See how it works <Icon name="arrowDown" size={16}/>
            </a>
          </div>
        </div>
        <div data-reveal style={{ '--reveal-delay': '120ms' }}>
          <PhoneStack layout={layout}/>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section style={{ padding: '24px 24px 56px' }}>
      <div data-reveal style={{
        maxWidth: 880, margin: '0 auto', background: 'var(--bg-elev-1)',
        border: '1px solid var(--border)', borderRadius: 24, boxShadow: 'var(--shadow-card)',
        padding: 'clamp(28px, 5vw, 56px)',
      }}>
        <div style={{ ...eyebrow, marginBottom: 20 }}>Why we built this</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.6vw, 27px)', lineHeight: 1.42, letterSpacing: '-0.015em', color: 'var(--fg-1)', textWrap: 'pretty' }}>
          <p style={{ margin: 0 }}>Maurice&apos;s sister told his nephew: &ldquo;If Knicks tickets drop under $500, we&apos;ll go.&rdquo;</p>
          <p style={{ margin: '20px 0 0', fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--fg-2)', fontFamily: 'var(--font-ui)', fontWeight: 400, lineHeight: 1.6 }}>
            They refreshed for days. When the price finally dropped, they were already on the subway to the watch party — heads down, phones out, frantically checking, unable to enjoy a single moment of the buildup to the biggest Knicks game in years.
          </p>
          <p style={{ margin: '16px 0 0', fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--fg-2)', fontFamily: 'var(--font-ui)', fontWeight: 400, lineHeight: 1.6 }}>
            She got one ticket. Last row. A bar stool in the nosebleeds.
          </p>
          <p style={{ margin: '16px 0 0', fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--fg-2)', fontFamily: 'var(--font-ui)', fontWeight: 400, lineHeight: 1.6 }}>
            They had the time of their lives anyway. But they shouldn&apos;t have had to fight that hard to get there.
          </p>
          <p style={{ margin: '24px 0 0', color: 'var(--fg-1)', fontWeight: 500 }}>
            SeatSnags is built so the next family doesn&apos;t miss the moment.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <img src={mauriceImg} alt="Maurice" width={40} height={40} style={{ borderRadius: 999, objectFit: 'cover', display: 'block', border: '1px solid var(--border)' }}/>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 500, color: 'var(--fg-1)' }}>Maurice<span style={{ color: 'var(--fg-3)', fontWeight: 400 }}> · Founder</span></span>
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: 'Maurice', role: 'Business Guy', image: mauriceImg },
  { name: 'Madeline', role: 'Technical Guy', image: madelineImg },
  { name: 'Benjamin', role: 'The Glue', image: benjaminImg },
];

function Team() {
  return (
    <section style={{ padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div data-reveal style={{ maxWidth: 620, marginBottom: 40 }}>
          <div style={{ ...eyebrow, marginBottom: 14 }}>Our team</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--fg-1)', margin: 0 }}>
            Built by fans, for fans.
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {TEAM.map((member, i) => (
            <div key={i} data-reveal style={{
              '--reveal-delay': `${i * 80}ms`,
              background: 'var(--bg-elev-1)', border: '1px solid var(--border)', borderRadius: 18,
              overflow: 'hidden', boxShadow: 'var(--shadow-lift)',
            }}>
              {member.image ? (
                <img src={member.image} alt={member.name} style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}/>
              ) : (
                <div style={{ width: '100%', height: 280, background: 'var(--bg-elev-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-3)', fontFamily: 'var(--font-ui)', fontSize: 13 }}>
                  Image coming soon
                </div>
              )}
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--fg-1)', marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--fg-2)' }}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: 'bolt', t: 'Set your max', d: "Pick your event, choose how many tickets you need, and set the most you're willing to pay. That's your only job." },
  { icon: 'eye', t: 'We watch while you live your life', d: 'SeatSnags monitors listings every 12 seconds across licensed broker networks. No alerts to act on. No refreshing required.' },
  { icon: 'check', t: "Tickets secured. You're in.", d: "The moment tickets hit your price, we buy automatically. Your card is only charged when we succeed — and often you'll pay less than your max." },
];

function HowItWorks() {
  return (
    <section id="how" style={{ padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div data-reveal style={{ maxWidth: 620, marginBottom: 40 }}>
          <div style={{ ...eyebrow, marginBottom: 14 }}>How it works</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--fg-1)', margin: 0 }}>
            Set it once. We do the waiting.
          </h2>
        </div>
        <div className="how-grid" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {STEPS.map((s, i) => (
            <div key={i} data-reveal style={{
              '--reveal-delay': `${i * 90}ms`,
              background: 'var(--bg-elev-1)', border: '1px solid var(--border)', borderRadius: 18,
              padding: 26, display: 'flex', flexDirection: 'column', gap: 16, boxShadow: 'var(--shadow-lift)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={23} color="var(--primary-fg)" stroke={2}/>
                </div>
                <span style={{ ...mono, fontSize: 13, fontWeight: 600, color: 'var(--fg-4)' }}>0{i + 1}</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--fg-1)', marginBottom: 8, lineHeight: 1.2 }}>{s.t}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg-2)', textWrap: 'pretty' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: 'shield', t: 'Licensed broker inventory only' },
  { icon: 'lock', t: 'Payments secured by Stripe' },
  { icon: 'check', t: 'Never charged more than your max' },
  { icon: 'bolt', t: 'We only make money when you save money' },
];

function TrustStrip() {
  return (
    <section style={{ padding: '0 24px 56px' }}>
      <div data-reveal style={{
        maxWidth: 1100, margin: '0 auto', background: 'var(--bg-tinted)', border: '1px solid rgba(31,122,94,0.16)',
        borderRadius: 18, padding: '20px 24px', display: 'grid', gap: 16,
        gridTemplateColumns: 'repeat(4, 1fr)',
      }} className="trust-grid">
        {TRUST.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name={it.icon} size={18} color="var(--primary-fg)" stroke={2}/>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 500, color: 'var(--fg-1)', lineHeight: 1.3 }}>{it.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Waitlist({ count }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section id="waitlist" style={{ padding: '24px 24px 72px' }}>
      <div data-reveal style={{
        maxWidth: 760, margin: '0 auto', textAlign: 'center',
        background: 'var(--bg-elev-1)', border: '1px solid var(--border)', borderRadius: 24,
        boxShadow: 'var(--shadow-card)', padding: 'clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ ...eyebrow, marginBottom: 16 }}>Beta · New York · Summer 2026</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--fg-1)', margin: 0 }}>
          Be first in New York.
        </h2>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(15px, 1.9vw, 17px)', lineHeight: 1.55, color: 'var(--fg-2)', margin: '18px auto 0', maxWidth: 520 }}>
          SeatSnags is launching in New York this summer. We&apos;re inviting a small group of beta testers to use the app before public launch — real events, real tickets, real bids.
        </p>

        {/* TALLY FORM EMBED — replace this block with the Tally script tag once Maurice provides the form URL */}
        <div className="tally-placeholder" style={{ maxWidth: 460, margin: '28px auto 0' }}>
          {sent ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px', borderRadius: 12, background: 'var(--primary-soft)', border: '1px solid rgba(31,122,94,0.25)' }}>
              <Icon name="check" size={18} color="var(--primary-fg)" stroke={2.5}/>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 500, color: 'var(--primary-fg)' }}>You&apos;re on the list. We&apos;ll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSent(true); }} style={{ display: 'flex', gap: 10 }} className="waitlist-form">
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: 'var(--bg-elev-2)', border: '1px solid var(--border-strong)', borderRadius: 12 }}>
                <Icon name="mail" size={18} color="var(--fg-3)"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" required style={{
                  flex: 1, border: 0, outline: 'none', background: 'transparent', padding: '15px 0',
                  fontFamily: 'var(--font-ui)', fontSize: 15.5, color: 'var(--fg-1)', minWidth: 0,
                }}/>
              </div>
              <Button kind="primary" size="lg">Join</Button>
            </form>
          )}
        </div>

        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)', margin: '16px 0 0' }}>
          No spam. Just your beta invite when we&apos;re ready.
        </p>

        {count > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 22 }}>
            <div style={{ display: 'flex' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 24, height: 24, borderRadius: 999, border: '2px solid var(--bg-elev-1)', marginLeft: i ? -8 : 0, background: ['var(--primary)', 'var(--gold)', 'var(--trust)'][i] }}/>
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, fontWeight: 500, color: 'var(--fg-2)' }}>
              Join <span style={{ ...mono, color: 'var(--fg-1)', fontWeight: 600 }}>{count}+</span> fans on the list
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const socials = [['x', '#'], ['instagram', '#'], ['tiktok', '#']];
  const links = [['Privacy Policy', '#'], ['Terms', '#']];
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '32px 24px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <WORDMARK size={18}/>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)' }}>© 2026 SeatSnags LLC. New York.</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22, rowGap: 12 }}>
          <a href="mailto:support@seatsnags.com" style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, color: 'var(--fg-2)', textDecoration: 'none' }} className="foot-link">support@seatsnags.com</a>
          {links.map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, color: 'var(--fg-2)', textDecoration: 'none' }} className="foot-link">{l}</a>
          ))}
          <div style={{ display: 'flex', gap: 6 }}>
            {socials.map(([s, h]) => (
              <a key={s} href={h} aria-label={s} style={{ width: 34, height: 34, borderRadius: 999, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-2)', textDecoration: 'none' }} className="foot-social">
                <Icon name={s} size={16} stroke={1.9}/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const TWEAK_DEFAULTS = {
  brandGreen: 'Evergreen',
  heroLayout: 'Staggered',
  waitlistCount: 200,
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  return (
    <div style={{ ...GREENS[t.brandGreen], background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav/>
      <main>
        <Hero layout={t.heroLayout}/>
        <Story/>
        <Team/>
        <HowItWorks/>
        <TrustStrip/>
        <Waitlist count={t.waitlistCount}/>
      </main>
      <Footer/>

      <TweaksPanel>
        <TweakSection label="Brand"/>
        <TweakColor label="Primary green" value={GREENS[t.brandGreen]['--primary']}
          options={[GREENS.Evergreen['--primary'], GREENS.Forest['--primary']]}
          onChange={(v) => setTweak('brandGreen', v === GREENS.Forest['--primary'] ? 'Forest' : 'Evergreen')}/>
        <TweakSection label="Hero"/>
        <TweakRadio label="Phone layout" value={t.heroLayout} options={['Staggered', 'Grid']}
          onChange={(v) => setTweak('heroLayout', v)}/>
        <TweakSection label="Waitlist"/>
        <TweakSlider label="Signup count" value={t.waitlistCount} min={0} max={2000} step={50}
          onChange={(v) => setTweak('waitlistCount', v)}/>
      </TweaksPanel>
    </div>
  );
}
