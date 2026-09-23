import { Section } from '../lib/ui.jsx';
import mauriceImg from '../assets/maurice.png';

export function WhyWeBuiltThis() {
  return (
    <Section index="01" label="Why we built this">
      <div className="split">
        <h2 className="headline headline-sec">Why we built this</h2>
        <div className="story">
          <p className="story-open">
            My sister told my nephew: &apos;If Knicks finals tickets drop under{' '}
            <span className="t-mono story-amount">$500</span>, we&apos;ll go.&apos;
          </p>
          <div className="story-body">
            <p>
              My nephew spent days refreshing ticket prices, hoping they&apos;d finally come down.
              But the game was starting soon and tickets were still above his mom&apos;s max price.
              So they headed to the fan zone.
            </p>
            <p>
              My nephew didn&apos;t give up. Even on the subway to the watch party, he was glued to his
              phone, hoping for a miracle.
            </p>
            <p>
              And then it happened! They got tickets. They ended up being in the last row.
              Bar stools in the nosebleeds.
            </p>
            <p>
              But it didn&apos;t matter. They were at the Knicks Finals game. A memory they&apos;ll never forget.
            </p>
            <p>
              Buying a ticket shouldn&apos;t take days of refreshing, second-guessing, and
              scrambling at the last minute.
            </p>
            <p>
              <strong>
                That&apos;s why we built SeatSnags: so you can spend less time watching ticket prices
                and more time creating unforgettable moments.
              </strong>
            </p>
          </div>
          <div className="story-sign">
            <img src={mauriceImg} alt="Maurice" className="story-photo"/>
            <span className="story-name">Maurice</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
