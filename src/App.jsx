import { Nav } from './sections/nav.jsx';
import { Hero } from './sections/hero.jsx';
import { WhyWeBuiltThis } from './sections/why.jsx';
import { DontBuyNow } from './sections/dont-buy-now.jsx';
import { HowItWorks } from './sections/how-it-works.jsx';
import { TrustRow } from './sections/trust.jsx';
import { Team } from './sections/team.jsx';
import { Faq } from './sections/faq.jsx';
import { ClosingCta } from './sections/closing-cta.jsx';
import { Footer } from './sections/footer.jsx';

export default function App() {
  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <WhyWeBuiltThis/>
        <DontBuyNow/>
        <HowItWorks/>
        <TrustRow/>
        <Team/>
        <Faq/>
        <ClosingCta/>
      </main>
      <Footer/>
    </>
  );
}
