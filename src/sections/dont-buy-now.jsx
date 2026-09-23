import { Section } from '../lib/ui.jsx';

export function DontBuyNow() {
  return (
    <Section index="02" label="Don't buy now" tone="green">
      <h2 className="headline headline-band">
        Sellers can wait. <br className="brk"/>Now you can too.
      </h2>
      <div className="band-grid">
        {/* The body's last sentence, pulled out as a lead line beside it. */}
        <div className="band-lead">Set the most you&apos;d pay. We&apos;ll watch until the price comes to you.</div>
        <p className="band-body">
          Sellers list high early because they can hold out until someone blinks. Most buyers can&apos;t.
          You&apos;ve got a life, and nobody has time to watch a listing for three weeks. SeatSnags does the
          waiting for you. Set the most you&apos;d pay, and we&apos;ll watch until the price comes to you.
        </p>
      </div>
    </Section>
  );
}
