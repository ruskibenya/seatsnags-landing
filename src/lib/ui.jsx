import React from 'react';

export function Icon({ name, size = 24, color = 'currentColor', stroke = 1.75 }) {
  const paths = {
    search:  <><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></>,
    ticket:  <><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4Z"/><path d="M13 6v12"/></>,
    bell:    <><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    back:    <><path d="M15 18l-6-6 6-6"/></>,
    close:   <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    check:   <><path d="M20 6 9 17l-5-5"/></>,
    clock:   <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    info:    <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/></>,
    shield:  <><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    pin:     <><path d="M12 22s-7-7-7-13a7 7 0 0 1 14 0c0 6-7 13-7 13Z"/><circle cx="12" cy="9" r="2.5"/></>,
    calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    chevR:   <><path d="m9 6 6 6-6 6"/></>,
    plus:    <><path d="M12 5v14M5 12h14"/></>,
    minus:   <><path d="M5 12h14"/></>,
    card:    <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>,
    bolt:    <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></>,
    arrowR:  <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    arrowDown:<><path d="M12 5v14"/><path d="m6 13 6 6 6-6"/></>,
    mail:    <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    lock:    <><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
    eye:     <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    activity:<><path d="M3 12h4l3 8 4-16 3 8h4"/></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
    x:       <><path d="M4 4l16 16M20 4 4 20"/></>,
    instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
    tiktok:  <><path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 4.5"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

export function Button({ kind = 'primary', size = 'md', full, children, onClick, disabled, leading, trailing, href }) {
  const base = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 600,
    border: 0,
    borderRadius: size === 'lg' ? 14 : 12,
    padding: size === 'lg' ? '16px 24px' : '11px 18px',
    fontSize: size === 'lg' ? 17 : 15,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    cursor: 'pointer',
    transition: 'transform 80ms ease-out, filter 120ms',
    width: full ? '100%' : 'auto',
    letterSpacing: '-0.005em',
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    textDecoration: 'none',
    boxSizing: 'border-box',
  };
  const kinds = {
    primary:   { background: 'var(--primary)', color: 'var(--on-primary)' },
    secondary: { background: 'var(--bg-elev-2)', color: 'var(--fg-1)', border: '1px solid var(--border-strong)' },
    ghost:     { background: 'transparent', color: 'var(--fg-1)' },
  };
  const props = { className: 'ss-btn', style: { ...base, ...kinds[kind] }, onClick };
  const inner = <>{leading}{children}{trailing}</>;
  if (href) return <a href={href} {...props}>{inner}</a>;
  return <button {...props} disabled={disabled}>{inner}</button>;
}

export function Badge({ tone = 'neutral', children, pulse }) {
  const tones = {
    snag:    { background: 'var(--primary)', color: 'var(--on-primary)' },
    amber:   { background: 'var(--gold-50)', color: 'var(--gold-700)', border: '1px solid var(--gold-300)' },
    live:    { background: 'rgba(180,58,63,0.12)', color: 'var(--live)', border: '1px solid rgba(180,58,63,0.35)' },
    trust:   { background: 'rgba(47,83,128,0.12)', color: 'var(--trust)', border: '1px solid rgba(47,83,128,0.35)' },
    neutral: { background: 'var(--bg-elev-3)', color: 'var(--fg-2)' },
    snagSubtle: { background: 'rgba(31,122,94,0.12)', color: 'var(--primary-fg)', border: '1px solid rgba(31,122,94,0.3)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', borderRadius: 999,
      fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
      ...tones[tone],
    }}>
      {pulse && <Pulse tone={tone === 'live' ? 'live' : 'snag'} size={6} />}
      {children}
    </span>
  );
}

export function Pulse({ tone = 'snag', size = 8 }) {
  const c = tone === 'live' ? 'var(--live)' : 'var(--primary)';
  return <span style={{
    width: size, height: size, background: c, borderRadius: 999,
    animation: `${tone}-pulse 2s ease-in-out infinite`,
    display: 'inline-block', flexShrink: 0,
  }}/>;
}

export function Stepper({ value, onChange, min = 1, max = 8 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={{ background: 'transparent', border: 0, color: 'var(--fg-1)', width: 44, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="minus" size={18}/>
      </button>
      <div style={{ width: 48, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--fg-1)' }}>{value}</div>
      <button onClick={() => onChange(Math.min(max, value + 1))} style={{ background: 'transparent', border: 0, color: 'var(--fg-1)', width: 44, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="plus" size={18}/>
      </button>
    </div>
  );
}
