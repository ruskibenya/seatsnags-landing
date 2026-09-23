import { Section, Perforation } from '../lib/ui.jsx';

const STEPS = [
  {
    t: 'Set your max.',
    d: "Pick your event, how many tickets you need and the sections you're open to, then set the most you'd pay. Your max includes fees. That's your only job.",
  },
  {
    t: 'Stop refreshing.',
    d: "We watch listings around the clock and buy the moment one fits your max. You don't have to check anything.",
  },
  {
    t: "Tickets secured. You're in.",
    d: "The moment tickets fit your max, we buy them and let you know. You're only charged if we snag, and often for less than your max.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" index="03" label="How it works">
      <h2 className="headline headline-lg" style={{ maxWidth: 900 }}>Set it once. We do the waiting.</h2>
      {/* One long ticket torn into three stubs. */}
      <div className="how-card">
        {STEPS.map((step, i) => (
          <div key={step.t} className="how-step">
            {i > 0 && <Perforation axis="y"/>}
            <span className="how-index">0{i + 1}</span>
            <div className="how-title">{step.t}</div>
            <p className="how-body">{step.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
