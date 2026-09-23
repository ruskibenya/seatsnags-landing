import { Section } from '../lib/ui.jsx';
import mauriceImg from '../assets/maurice.png';

export function WhyWeBuiltThis() {
  return (
    <Section index="01" label="Why we built this">
      <div className="split">
        <h2 className="headline headline-sec">Why we built this</h2>
        <div className="story">
          <p className="story-open">
            Maurice&apos;s sister told his nephew: &apos;If Knicks tickets drop under{' '}
            <span className="t-mono story-amount">$500</span>, we&apos;ll go.&apos;
          </p>
          <p className="story-body">
            They refreshed for days. When the price finally dropped, they were already on the subway to the
            watch party — heads down, phones out, frantically checking, unable to enjoy a single moment of
            the buildup to the biggest Knicks game in years. She got one ticket. Last row. A bar stool in
            the nosebleeds. They had the time of their lives anyway. But they shouldn&apos;t have had to
            fight that hard to get there.{' '}
            <strong>SeatSnags is built so the next family doesn&apos;t miss the moment.</strong>
          </p>
          <div className="story-sign">
            <img src={mauriceImg} alt="Maurice" className="story-photo"/>
            <span className="story-name">Maurice</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
