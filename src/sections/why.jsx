import { Section } from '../lib/ui.jsx';
import mauriceImg from '../assets/maurice.png';

export function WhyWeBuiltThis() {
  return (
    <Section index="01" label="Why we built this">
      <div className="split">
        <h2 className="headline headline-sec">Why we built this</h2>
        <div className="story">
          <p className="story-open">
            Maurice&apos;s sister told his nephew: &apos;If Knicks finals tickets drop under{' '}
            <span className="t-mono story-amount">$500</span>, we&apos;ll go.&apos;
          </p>
          <div className="story-body">
            <p>
              My nephew spent days refreshing ticket prices, hoping they&apos;d finally come down.
              But the game was starting soon and tickets still were above mom&apos;s max price.
              So they headed to the fan zone.
            </p>
            <p>
              Nephew didn&apos;t give up. Even on the subway to the watch party, he was glued to his
              phones, hoping to still make it to the game.
            </p>
            <p>
              And he got one ticket. It ended up being in the last row. A bar stool in the nosebleeds.
            </p>
            <p>
              But it didn&apos;t matter. He was at the Knicks Finals game. A memory he&apos;ll never forget.
            </p>
            <p>
              But buying a ticket shouldn&apos;t take days of refreshing, second-guessing, and
              scrambling at the last minute.
            </p>
            <p>
              <strong>
                That&apos;s why we built SeatSnags: so you can spend less time watching ticket prices
                and more time creating moments you&apos;ll remember.
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
