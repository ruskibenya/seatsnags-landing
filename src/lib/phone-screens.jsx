import React from 'react';
import { Icon, Badge, Pulse, Stepper } from './ui.jsx';
import { IOSDevice } from './ios-frame.jsx';

function ScreenShell({ children, header }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        paddingTop: 54, position: 'sticky', top: 0, zIndex: 5,
        background: 'rgba(250, 248, 244, 0.86)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 14px 12px', height: 38 }}>
          <div style={{ width: 40, display: 'flex' }}>
            <Icon name="back" size={24} color="var(--fg-1)"/>
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 600, color: 'var(--fg-1)' }}>{header}</div>
          <div style={{ width: 40 }}/>
        </div>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

const EVENT = {
  title: 'Knicks vs. Celtics',
  venue: 'Madison Square Garden',
  date: 'Fri · Mar 15 · 7:30 PM',
  img: 'linear-gradient(to top, rgba(11,22,32,0.65), rgba(11,22,32,0.05) 70%), radial-gradient(ellipse at 30% 30%, #C44A2E, transparent 60%), radial-gradient(ellipse at 80% 70%, #2A4A6E, transparent 55%), linear-gradient(135deg, #5B3520, #1F2840)',
};

const eyebrow = { fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)' };
const mono = { fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' };

function EventStrip() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg-elev-1)', border: '1px solid var(--border)', borderRadius: 14 }}>
      <div style={{ width: 52, height: 52, borderRadius: 10, background: EVENT.img, flexShrink: 0 }}/>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--fg-1)' }}>{EVENT.title}</div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{EVENT.venue} · {EVENT.date}</div>
      </div>
    </div>
  );
}

export function BidSetupScreen() {
  return (
    <ScreenShell header="Set your max bid">
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <EventStrip/>
        <div>
          <div style={{ ...eyebrow, marginBottom: 8 }}>Max per ticket</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', ...mono, fontSize: 32, color: 'var(--fg-3)', fontWeight: 600 }}>$</span>
            <div style={{
              padding: '18px 18px 18px 44px', borderRadius: 14,
              background: 'var(--bg-elev-2)', border: '1.5px solid var(--primary)', boxShadow: 'var(--glow-primary)',
              ...mono, fontWeight: 700, fontSize: 32, letterSpacing: '-0.01em', color: 'var(--fg-1)',
            }}>500</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {[480, 500, 600].map((v, i) => (
              <div key={v} style={{
                flex: 1, textAlign: 'center', padding: '9px 10px', borderRadius: 10,
                background: i === 1 ? 'var(--primary-soft)' : 'var(--bg-elev-3)',
                border: i === 1 ? '1px solid var(--primary)' : '1px solid var(--border)',
                ...mono, fontSize: 14, fontWeight: 600, color: i === 1 ? 'var(--primary-fg)' : 'var(--fg-1)',
              }}>${v}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--fg-1)', fontWeight: 500 }}>Quantity</div>
          <Stepper value={2} onChange={() => {}}/>
        </div>
        <div style={{ padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ ...eyebrow }}>Charge cap</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>Only if we snag</div>
          </div>
          <div style={{ ...mono, fontWeight: 700, fontSize: 26, color: 'var(--fg-1)' }}>$1,000</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <Icon name="card" size={18} color="var(--fg-2)"/>
          <div style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--fg-1)' }}>Visa ·· 4827</div>
          <Icon name="chevR" size={16} color="var(--fg-3)"/>
        </div>
        <div>
          <div style={{
            width: '100%', borderRadius: 14, padding: '16px 22px', background: 'var(--primary)', color: 'var(--on-primary)',
            fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 17, textAlign: 'center', letterSpacing: '-0.005em',
          }}>Activate Bid · $1,000 max</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
            <Icon name="shield" size={14} color="var(--trust-fg)"/>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-3)' }}>No charge until seats are secured.</span>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

function TimelineItem({ icon, iconBg, iconColor, title, sub, time, last, pulse }) {
  return (
    <div style={{ display: 'flex', gap: 14, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 30, height: 30, borderRadius: 999, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
          {pulse ? <Pulse tone="live" size={9}/> : <Icon name={icon} size={16} color={iconColor} stroke={2.4}/>}
        </div>
        {!last && <div style={{ width: 2, flex: 1, minHeight: 22, background: 'var(--border)' }}/>}
      </div>
      <div style={{ paddingBottom: last ? 0 : 20, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{title}</div>
          <div style={{ ...mono, fontSize: 12, color: 'var(--fg-3)', flexShrink: 0 }}>{time}</div>
        </div>
        {sub && <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function BidStatusScreen() {
  return (
    <ScreenShell header="Bid status">
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ padding: 16, borderRadius: 16, background: 'linear-gradient(180deg, rgba(180,58,63,0.06), transparent 60%), var(--bg-elev-1)', border: '1px solid var(--border)', boxShadow: 'inset 0 0 0 1px rgba(180,58,63,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <Badge tone="live" pulse>BID LIVE</Badge>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...eyebrow }}>Max bid</div>
              <div style={{ ...mono, fontWeight: 700, fontSize: 20, color: 'var(--fg-1)' }}>$500</div>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--fg-1)' }}>{EVENT.title}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)', marginTop: 2 }}>2 seats · {EVENT.venue}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: 'var(--primary-soft)', border: '1px solid rgba(31,122,94,0.25)' }}>
          <Pulse tone="snag" size={10}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14, color: 'var(--primary-fg)' }}>Searching for tickets…</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>Checked <span style={mono}>38</span> listings · rechecking every 12s</div>
          </div>
          <Icon name="refresh" size={18} color="var(--primary)"/>
        </div>
        <div style={{ padding: '16px 16px 8px', borderRadius: 16, background: 'var(--bg-elev-1)', border: '1px solid var(--border)' }}>
          <div style={{ ...eyebrow, marginBottom: 16 }}>Activity</div>
          <TimelineItem pulse iconBg="rgba(180,58,63,0.12)" title="Checked 38 listings" sub="Best match $540 — above your max" time="12s"/>
          <TimelineItem icon="activity" iconBg="var(--bg-elev-3)" iconColor="var(--fg-2)" title="4 new listings posted" sub="Now watching 4 listings" time="8m"/>
          <TimelineItem icon="check" iconBg="var(--primary-soft)" iconColor="var(--primary)" title="Bid activated · $500 max" sub="We'll watch the market for you" time="2h" last/>
        </div>
      </div>
    </ScreenShell>
  );
}

export function BidActivatedScreen() {
  return (
    <ScreenShell header="">
      <div style={{ padding: '20px 22px 28px', display: 'flex', flexDirection: 'column', minHeight: 660 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 6, paddingTop: 30 }}>
          <div style={{ width: 84, height: 84, borderRadius: 999, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px var(--primary-soft)', marginBottom: 16 }}>
            <Icon name="check" size={42} color="var(--on-primary)" stroke={3}/>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>Bid is live</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, lineHeight: 1.45, color: 'var(--fg-2)', maxWidth: 280, marginTop: 4 }}>
            We're watching the market and we'll snag 2 seats the moment they drop under <span style={{ ...mono, fontWeight: 600, color: 'var(--fg-1)' }}>$500</span>.
          </div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <EventStrip/>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shield" size={15} color="var(--trust-fg)"/>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)' }}>You're only charged if we snag the seats.</span>
          </div>
          <div style={{
            width: '100%', borderRadius: 14, padding: '16px 22px', background: 'var(--primary)', color: 'var(--on-primary)',
            fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 17, textAlign: 'center',
          }}>View bid status</div>
        </div>
      </div>
    </ScreenShell>
  );
}

export { IOSDevice };
