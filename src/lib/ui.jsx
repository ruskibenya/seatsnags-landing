// Box Office primitives. These repeat across every section of the page, so
// they live here rather than being hand-copied per section — that is how the
// spacing drifts. Sizing that differs between the two artboards is carried by
// the classes in index.css, not by props.

// Lucide geometry, at the one stroke weight the design system uses.
export function Icon({ name, size = 24, stroke = 1.75 }) {
  const paths = {
    mail:     <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></>,
    linkedin: <><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/></>,
    facebook: <><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

export function Button({ href, size = 'md', full, className = '', children }) {
  const classes = ['btn', `btn-${size}`, full && 'btn-full', className].filter(Boolean).join(' ');
  return <a href={href} className={classes}>{children}</a>;
}

/** A rubber stamp coming down onto a ticket — once, rotated, 360ms.
 *  The angle rides on a custom property because `animation-fill-mode: both`
 *  would otherwise hold the keyframe's transform over an inline rotation. */
export function Stamp({ rotate = -4, size = 'hero', children }) {
  return (
    <span className={`stamp stamp-${size}`} style={{ '--stamp-rot': `${rotate}deg` }}>
      {children}
    </span>
  );
}

/** The price object: an ink block with the figures knocked out to stock.
 *  Padding, radius and the raised currency are in em, so it is the same object
 *  at every size and only `font-size` changes. Leave `size` off to let CSS set
 *  it — the receipt is 36px on desktop and 30px on mobile. Green is only ever
 *  a charged amount. */
export function Price({ value, tone = 'ink', size }) {
  return (
    <span className={`t-price${tone === 'brand' ? ' t-price-brand' : ''}`}
      style={size ? { fontSize: size } : undefined}>
      <span className="cur">$</span>{typeof value === 'number' ? value.toLocaleString() : value}
    </span>
  );
}

/** The tear that makes a card edge read as torn. On its own (`axis="x"`) it
 *  draws the dashed rule and both notches — a receipt body torn from its stub.
 *  Between two stubs of one ticket (`axis="y"`) the shared edge draws the rule
 *  and this places the notches on it, so the rule takes its 2px out of the
 *  layout the way a real tear does; CSS turns that edge from vertical to
 *  horizontal as the columns stack. */
export function Perforation({ axis = 'x' }) {
  return (
    <span className={`perf perf-${axis}`} aria-hidden="true">
      <span className="notch notch-start"/>
      <span className="notch notch-end"/>
    </span>
  );
}

/** Mono index and label. The ink rule above it belongs to the section. */
export function SectionHeader({ index, label }) {
  return (
    <div className="sec-head">
      <span className="t-mono">{index}</span>
      <span>{label}</span>
    </div>
  );
}

/** Every section opens the same way — a full-width ink rule, then the header
 *  row — so the page reads as one printed programme. */
export function Section({ id, index, label, tone, children }) {
  return (
    <section id={id} className={`sec${tone === 'green' ? ' sec-green' : ''}`}>
      <SectionHeader index={index} label={label}/>
      {children}
    </section>
  );
}
