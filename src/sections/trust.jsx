// The conditions printed on the back of a ticket: numbered, between two
// perforations, no icons.
const TRUST = [
  'Licensed broker inventory only',
  'Payments secured by Stripe',
  'Your max includes fees',
  'We only get paid when we get you tickets',
];

export function TrustRow() {
  return (
    <section className="trust">
      {TRUST.map((text, i) => (
        <div key={text} className="trust-cell">
          <span className="trust-index t-mono">0{i + 1}</span>
          <span className="trust-text">{text}</span>
        </div>
      ))}
    </section>
  );
}
