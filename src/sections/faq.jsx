import { useState } from 'react';
import { Section } from '../lib/ui.jsx';

const FAQ_ITEMS = [
  { q: 'What is SeatSnags?', a: 'SeatSnags is an automated ticket purchasing agent. You set a maximum price, and we monitor the secondary market around the clock — automatically buying the moment matching tickets appear at or below your budget. No browsing, no refreshing, no missing out because you saw the alert too late.' },
  { q: 'How is SeatSnags different from StubHub or SeatGeek?', a: 'Those platforms send you an alert when tickets drop to your price. You still have to act — and by the time you open the app, the tickets are usually gone. SeatSnags skips the alert entirely. We purchase automatically the instant a match appears, then notify you when it\'s done.' },
  { q: 'How does it work?', a: 'Choose your event, select the sections you\'re open to, and enter your maximum price per ticket. Our system monitors live listings continuously. The moment a match appears at or below your price, we purchase automatically on your behalf.' },
  { q: 'Am I charged when I set a bid?', a: 'No. When your bid goes live we place a hold on your card for your max, and you\'re only actually charged if we snag. If your bid expires or you cancel, the hold is released.' },
  { q: 'Why do I need a credit card to set a bid?', a: 'When a match appears, we have seconds to act. Having your payment method ready means we can purchase immediately — without waiting for you to confirm and losing the listing.' },
  { q: 'Will I always pay my maximum price?', a: 'No — that\'s your ceiling, not your price. If we find matching tickets for less, you pay a lower amount.' },
  { q: 'What happens when a match is found?', a: 'We secure the tickets, process your payment, and arrange delivery. You\'ll get a notification as soon as it\'s done.' },
  { q: 'What if no matching tickets are found?', a: 'Your bid expires and you\'re charged nothing.' },
  { q: 'Can I use SeatSnags for sold-out events?', a: 'Yes — and sold-out events are often where SeatSnags works best. We monitor resale listings continuously, so if tickets surface at your price at any point, we\'ll catch them.' },
  { q: 'Can I cancel a bid?', a: 'Yes. You can cancel any active bid before tickets are secured, and you won\'t be charged.' },
  { q: 'Is there a SeatSnags app?', a: 'Yes. SeatSnags installs straight from your browser, no App Store needed. Open app.seatsnags.com/install on your phone and it walks you through the two taps.' },
  { q: 'Do ticket prices really drop before an event?', a: 'Often, yes. Resale prices tend to slide as the event gets closer and sellers get nervous. Not always, though, and that\'s why you set a max: if prices never reach it, you pay nothing.' },
  { q: 'Are there any hidden fees?', a: 'No. Your max is all-in, fees included. The number you set is the most you\'ll ever pay, and nothing gets added at checkout.' },
  { q: 'Can I pick my exact seats?', a: 'You pick the sections you\'re open to and how many seats you need together. We grab the best match at or under your max: your full quantity, seated together, in your chosen sections.' },
  { q: 'Are the tickets legitimate?', a: 'Yes. Every ticket comes from licensed professional brokers, the same inventory network that supplies major marketplaces like StubHub, Vivid Seats, and SeatGeek. And every order is backed by our Buyer Guarantee.' },
  { q: 'What happens if my event is canceled or postponed?', a: 'If it\'s postponed, your tickets stay valid for the new date. If it\'s canceled, we pass along the refund or replacement our ticketing partner provides.' },
  { q: 'How will I receive my tickets?', a: 'Electronically, through whatever transfer platform the seller uses — typically Ticketmaster, AXS, or a similar system.' },
  { q: 'When will my tickets arrive?', a: 'It depends on the event and seller. Some tickets arrive immediately; others closer to the event date. We\'ll keep you updated either way.' },
];

// FAQPage structured data for search rich results, generated from FAQ_ITEMS so
// the markup can never drift from the visible answers.
function FaqSchema() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}/>;
}

export function Faq() {
  // The first question is open on arrival; clicking it closes it again.
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Section index="05" label="Questions?">
      <FaqSchema/>
      <div className="split">
        <h2 className="headline headline-sec faq-title">Frequently asked questions.</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-glyph" aria-hidden="true">{open ? '\u2212' : '+'}</span>
                </button>
                {open && <p className="faq-a">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
